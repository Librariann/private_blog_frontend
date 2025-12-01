import { GetStaticProps } from "next";
import { Post, UserProfileByNickNameQuery } from "@/gql/graphql";
import { MemoizedMain } from "@/components/main/main";
import { getPopularHashTagDatas, getPostDatas, getUserInfo } from "@/lib/posts";
import { useQuery } from "@apollo/client";
import { GET_POST_LIST_QUERY } from "@/lib/queries";

export type popularHashTagsProps = {
  hashtag: string;
  count: number;
};

export type UserInfoType = NonNullable<
  UserProfileByNickNameQuery["userProfileByNickName"]["user"]
>;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const postDatas = await getPostDatas();
    const popularHashTagDatas = await getPopularHashTagDatas();
    const userInfo = await getUserInfo("librarian");

    return {
      props: {
        posts: postDatas,
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
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
  userInfo: UserInfoType;
}) => {
  // Apollo로 클라이언트에서 데이터 가져오기
  const { data } = useQuery(GET_POST_LIST_QUERY, {});

  const postsDatas = data?.getPostList?.posts || posts;

  return <MemoizedMain posts={postsDatas} popularHashTags={popularHashTags} />;
};

export default Home;
