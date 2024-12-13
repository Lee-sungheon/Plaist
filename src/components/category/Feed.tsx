import { useChannelStore } from "../../stores/channelStore";
import { useState } from "react";
import { getChannelPostList } from "../../api/postApi";
import { useEffect } from "react";
import AllCourseCardItem from "../main/allCourse/AllCourseCardItem";

export default function Feed() {
  const location = useChannelStore((state) => state.location);
  const spot = useChannelStore((state) => state.spot);
  const channelList = useChannelStore((state) => state.channelList);
  const [postList, setPostList] = useState<Post[]>([]);

  const getPostList = async () => {
    let allPostList: Post[] = [];
    let uniquePostList: Post[] = [];

    // location filtering
    if (location.name === "전국" && spot.name === "전체") {
      try {
        const locationData = await Promise.all(
          channelList.location.map(
            async (ch) => await getChannelPostList(ch._id)
          )
        );
        allPostList.push(...locationData.flat());
        const spotData = await Promise.all(
          channelList.spot.map(async (ch) => await getChannelPostList(ch._id))
        );
        allPostList.push(...spotData.flat());
        uniquePostList = uniquePostById(allPostList);
      } catch (error) {
        console.error(error);
      }
    } else if (location.name === "전국") {
      try {
        const spotData = await Promise.all(
          channelList.spot.map(async (ch) => await getChannelPostList(ch._id))
        );
        allPostList.push(...spotData.flat());
        uniquePostList = uniquePostById(allPostList);
      } catch (error) {
        console.log(error);
      }
    } else if (spot.name === "전체") {
      try {
        const locationData = await Promise.all(
          channelList.location.map(
            async (ch) => await getChannelPostList(ch._id)
          )
        );
        allPostList.push(...locationData.flat());
        uniquePostList = uniquePostById(allPostList);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const locationData = await Promise.all(
          channelList.location.map(
            async (ch) => await getChannelPostList(ch._id)
          )
        );
        const spotData = await Promise.all(
          channelList.spot.map(async (ch) => await getChannelPostList(ch._id))
        );

        const locationPostSet = new Set(locationData);
        allPostList = spotData.filter((post) => locationPostSet.has(post));
        uniquePostList = uniquePostById(allPostList);
      } catch (error) {
        console.log(error);
      }
    }

    uniquePostList.sort(
      (postA, postB) => postB.likes.length - postA.likes.length
    );
    setPostList(uniquePostList);
    console.log("Location:", location);
    console.log("Spot:", spot);
    console.log("All Posts Before Unique Filter:", allPostList);
    console.log("Unique Posts:", uniquePostList);
  };

  // 중복 id 제거
  const uniquePostById = (arr: Post[]) => {
    const idMap = new Map();
    arr.forEach((item) => {
      const title: TitleType = JSON.parse(item.title);
      idMap.set(title.id, item);
    });
    return Array.from(idMap.values());
  };

  // 시작시 무조건 한번 실행
  useEffect(() => {
    getPostList();
  }, []);

  // location 또는 spot이 변경될 때 게시물 리스트 업데이트
  useEffect(() => {
    getPostList();
  }, [location, spot]); // location과 spot이 변경될 때 실행

  return (
    <section className="grid grid-cols-2 gap-5 w-full h-full auto-rows-[258px]">
      {postList.map((post) => {
        const title: TitleType = JSON.parse(post.title);
        const locationAddressSet = new Set(
          title.locationObjs.map((location) => {
            return location.locationAddress.split(" ")[0] === "서울특별시"
              ? `서울 ${location.locationAddress.split(" ")[1]}`
              : `${location.locationAddress.split(" ")[0]}`;
          })
        );

        const locationAddress = Array.from(locationAddressSet).join(" ");

        return (
          <AllCourseCardItem
            key={title.id}
            title={title.courseTitle}
            rating={
              post.likes.length / 1000 > 1
                ? post.likes.length
                : (post.likes.length / 1000).toFixed(1)
            }
            location={locationAddress}
            imageUrl={post.image}
          />
        );
      })}
    </section>
  );
}
