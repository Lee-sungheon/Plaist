export const convertTime = (estimetedTime: string) => {
  const num = Number(estimetedTime);
  return Math.floor(num / 60);
};

export const convertDateFormatt = (isoDate: string) => {
  const date = new Date(isoDate);

  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".");
  return formattedDate.slice(0, -1);
};

export const splitBySpaceUntilIndex1 = (input: string): string => {
  const splitResult = input.split(" ");
  return splitResult.slice(0, 2).join(" ");
};

export const formatPrice = (price: number): string => {
  if (isNaN(price)) {
    throw new Error("Invalid number input");
  }
  return price.toLocaleString("ko-KR") + "원";
};

export const sortByCreatedAtDesc = (data: Comment[]): Comment[] => {
  return data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const sortByCreatedAtIncre = (data: Comment[]): Comment[] => {
  return data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export const sortCoursesByLike = (data: Course[]) => {
  const bestCourses = data
    .sort((a, b) => b.likes.length - a.likes.length)
    .map((item) => item)
    .slice(0, 3);
  return bestCourses;
};

export const trimStringWithEllipsis = (input: string, length: number) => {
  return input.length <= length ? input : input.slice(0, length) + "...";
};
