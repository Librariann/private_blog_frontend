import { GetStaticProps } from "next";
import {
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
  Post,
  UserProfileByNickNameQuery,
  UserProfileByNickNameQueryVariables,
} from "@/gql/graphql";
import { MemoizedMain } from "@/components/main/main";
import { getPopularHashTagDatas, getPostDatas, getUserInfo } from "@/lib/posts";
import { useQuery } from "@apollo/client";
import {
  GET_POPULAR_HASHTAG_QUERY,
  GET_POST_LIST_QUERY,
  GET_USER_BY_NICKNAME_QUERY,
} from "@/lib/queries";
import { startTransition, useEffect, useState } from "react";
import { useUserInfoStore } from "@/stores/useUserInfoStore";

export type popularHashTagsProps = {
  hashtag: string;
  count: number;
};

export type UserInfoType = NonNullable<
  UserProfileByNickNameQuery["userProfileByNickName"]
>;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const postDatas = await getPostDatas();
    const popularHashTagDatas = await getPopularHashTagDatas();
    const userInfo = await getUserInfo("librarian");

    return {
      props: {
        posts: postDatas?.posts || [],
        featuredPost: postDatas?.featuredPost || {},
        popularHashTags: popularHashTagDatas,
        userInfo: userInfo,
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    console.error("ISR Error:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
};

const Home = ({
  posts,
  popularHashTags,
  featuredPost,
  userInfo,
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
  userInfo: UserInfoType;
  featuredPost: Post;
}) => {
  const [isClientReady, setIsClientReady] = useState(false);
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    startTransition(() => setIsClientReady(true));
  }, []);

  // Apollo로 클라이언트에서 데이터 가져오기
  const { data: postData } = useQuery<
    GetPostListQuery,
    GetPostListQueryVariables
  >(GET_POST_LIST_QUERY, {
    skip: !isClientReady,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false,
  });
  const { data: hashtagData } = useQuery<
    GetAllPopularHashTagsQuery,
    GetAllPopularHashTagsQueryVariables
  >(GET_POPULAR_HASHTAG_QUERY, {
    skip: !isClientReady,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false,
  });
  const { data: profileData } = useQuery<
    UserProfileByNickNameQuery,
    UserProfileByNickNameQueryVariables
  >(GET_USER_BY_NICKNAME_QUERY, {
    skip: !isClientReady,
    variables: { userNickName: "librarian" },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false,
  });

  useEffect(() => {
    setUserInfo(profileData?.userProfileByNickName || userInfo);
  }, [profileData?.userProfileByNickName, setUserInfo, userInfo]);

  const latestPosts = (postData?.getPostList?.posts || posts) as Post[];
  const latestFeaturedPost =
    postData?.getPostList?.featuredPost || featuredPost;
  const latestPopularHashTags =
    hashtagData?.getAllPopularHashTags?.hashtags || popularHashTags;

  return (
    <MemoizedMain
      posts={latestPosts}
      popularHashTags={latestPopularHashTags}
      featuredPost={latestFeaturedPost as Post}
    />
  );
};

export default Home;
