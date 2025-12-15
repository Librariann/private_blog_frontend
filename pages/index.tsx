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
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
  userInfo: UserInfoType;
  featuredPost: Post;
}) => {
  // Apollo로 클라이언트에서 데이터 가져오기
  const { data } = useQuery(GET_POST_LIST_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const postsDatas: Post[] = data?.getPostList?.post || posts;

  return (
    <MemoizedMain
      posts={postsDatas}
      popularHashTags={popularHashTags}
      featuredPost={featuredPost}
    />
  );
};

export default Home;
