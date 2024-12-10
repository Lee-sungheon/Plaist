import axios from "axios";
import { axiosInstance } from "./axios";

// 전체 채널 목록을 불러옵니다.
export const getChannelList = async () => {
  try {
    const response = await axiosInstance.get(`/channels`);
    console.log(response.data);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// 특정 이름의 채널을 불러옵니다.
export const getChannel = async (channelName: string) => {
  try {
    const response = await axiosInstance.get(`/channels/${channelName}`, {
      headers: {
        Authorization: "Bearer your-token-here",
        name: "custom-value",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// admin only
// 새로운 채널을 생성합니다.
export const postChannel = async () => {
  try {
    const response = await axiosInstance.post(`/channels/create`);
    console.log(response.data);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// search
// 사용자 혹은 게시물을 검색합니다.
export const getSearchByUserAndPost = async (searchQuery: string) => {
  try {
    const response = await axios.get(`/search/all/${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error; // 오류를 호출자에게 전달
  }
};

// 사용자를 검색합니다.
export const getSearchByUser = async (searchQuery: string) => {
  try {
    const response = await axios.get(`/search/users/${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error; // 오류를 호출자에게 전달
  }
};

// follow
// 특정 사용자를 팔로우합니다.
export const postCreateFollow = async (userId: string) => {
  try {
    const response = await axios.post(`/follow/create`, { userId: userId });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// 특정 사용자를 언팔합니다.
export const deleteFollow = async (userId: string) => {
  try {
    const response = await axios.delete(`follow/delete`, {
      params: { userId }, // 데이터 전달 방식을 params로 변경
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
