import { GetStaticProps } from "next";
import { Post, User, UserProfileByNickNameQuery } from "@/gql/graphql";
import Main from "@/components/main/main";
import { getPopularHashTagDatas, getPostDatas, getUserInfo } from "@/lib/posts";

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
    // const userInfo = await getUserInfo("librarian");

    return {
      props: {
        posts: postDatas,
        popularHashTags: popularHashTagDatas,
        // userInfo: userInfo as UserInfoType,
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
}) => {
  return <Main posts={posts} popularHashTags={popularHashTags} />;
};

export default Home;
