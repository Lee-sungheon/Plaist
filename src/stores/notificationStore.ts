import { create } from "zustand";
import { getNotification, seenNotification } from "../api/notificationApi";
import { useUserStore } from "./useInfoStore";

let polling = false;

interface NotificationState {
  notifications: Notification[];
  clickedNotifications: Set<string>;
  isIconActivated: boolean;
}

interface NotificationAction {
  fetchNotifications: () => void;
  change2Seen: (notificationId: string) => void;
  deleteAll: () => void;
  startLongPolling: () => void;
  stopLongPolling: () => void;
  setIconActivated: (value: boolean) => void;
}

// TODO 새로고침시 userId 없어짐
// 새로고침시 notification 초기화
export const useNotificationStore = create<
  NotificationAction & NotificationState
>((set, get) => ({
  notifications: [],
  clickedNotifications: new Set<string>(),
  isIconActivated: false,

  fetchNotifications: async () => {
    await useUserStore.getState().setUserId();
    const userId = useUserStore.getState().userId || "";

    const { setIconActivated, notifications, clickedNotifications } = get();
    const prevNotificationData = localStorage.getItem(
      `clickedNotifications_${userId}`
    );
    const prevNotificationsSet = prevNotificationData
      ? new Set<string>(JSON.parse(prevNotificationData) as string[])
      : new Set<string>();
    set({ clickedNotifications: prevNotificationsSet });

    const prevNotification = [...notifications];
    try {
      const data = await getNotification();
      const result = data.filter(
        // seen 속성 true && 확인 기록 있는 경우
        (item) => !item.seen && !clickedNotifications.has(item._id)
      );
      if (JSON.stringify(prevNotification) !== JSON.stringify(result)) {
        console.log("prev", prevNotification);
        console.log("curr", result);
        setIconActivated(result.length > 0);
        if (result.length === 0) {
          useNotificationStore.getState().deleteAll();
        }
        set({ notifications: result });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },

  change2Seen: async (notificationId) => {
    const userId = useUserStore.getState().userId || ""; // 동적으로 userId 가져오기
    set((state) => {
      const updatedSet = new Set(state.clickedNotifications);
      updatedSet.add(notificationId);
      localStorage.setItem(
        `clickedNotifications_${userId}`,
        JSON.stringify(Array.from(updatedSet))
      );
      return { clickedNotifications: updatedSet };
    });
  },

  deleteAll: async () => {
    const userId = useUserStore.getState().userId || ""; // 동적으로 userId 가져오기
    try {
      await seenNotification();
      console.log("All notifications marked as seen.");
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
    localStorage.removeItem(`clickedNotifications_${userId}`);
    set({ notifications: [], isIconActivated: false });
  },

  setIconActivated: (value) => {
    set({ isIconActivated: value });
  },

  startLongPolling: async () => {
    polling = true;
    const { fetchNotifications } = get();

    const pollingNotifications = async () => {
      while (polling) {
        try {
          await fetchNotifications();
        } catch (error) {
          console.error("Error during long polling:", error);
        }
        const IDLE_TIME = 5 * 1000; // 5초 대기
        await new Promise((resolve) => setTimeout(resolve, IDLE_TIME));
      }
    };

    pollingNotifications();
  },

  stopLongPolling: () => {
    polling = false;
    set({ isIconActivated: false });
    console.log("Polling stopped.");
  },
}));
