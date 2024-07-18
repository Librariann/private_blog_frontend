import { client } from "@/apollo";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { GetPostListQuery, GetPostListQueryVariables } from "./gql/graphql";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export const GET_POST_LIST_QUERY = gql`
  query getPostList {
    getPostList {
      posts {
        id
        title
        contents
        hits
        category {
          categoryTitle
        }
        comments {
          comment
        }
        hashtags {
          hashtag
        }
      }
    }
  }
`;

type postsProps = {
  id: number;
  title: string;
  contents: string;
  hits: number;
  category: {
    categoryTitle: string;
  };
  comments: {
    comment: string;
  };
  hashtags: {
    hashtag: string;
  };
};

const PostTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PostContents = styled.div`
  margin-top: 2px;
`;

const PostBottom = styled.div``;

const Home = ({ posts }: { posts: postsProps[] }) => {
  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-start">
        {posts.map((post) => {
          const commentsArray = Array.isArray(post.comments)
            ? post.comments
            : [post.comments];
          return (
            <li
              key={post.id}
              className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 p-2"
            >
              <Link href={`/${post.category.categoryTitle}/${post.id}`}>
                <div className="relative w-full h-72">
                  <Image
                    src="/images/noimage.webp"
                    width={100}
                    height={100}
                    alt="No image available"
                    className="w-full h-auto"
                  />
                  <div className="p-2">
                    <PostTitle>{post.title}</PostTitle>
                    <PostContents className="line-clamp-3">
                      {post.contents}
                    </PostContents>
                    <PostBottom>
                      <span className="mr-3">
                        댓글 수:{commentsArray.length}
                      </span>
                      <span>좋아요 수:{post.hits}</span>
                    </PostBottom>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query<
      GetPostListQuery,
      GetPostListQueryVariables
    >({
      query: GET_POST_LIST_QUERY,
    });
    return {
      props: {
        posts: data.getPostList.posts,
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default Home;
