/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createCategory($categoryTitle: String!) {\n    createCategory(categoryTitle: $categoryTitle) {\n      ok\n      error\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n": types.CreateCommentDocument,
    "\n  query getCommentList($postId: Int!) {\n    getCommentList(postId: $postId) {\n      ok\n      comments {\n        id\n        comment\n      }\n    }\n  }\n": types.GetCommentListDocument,
    "\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        count\n      }\n    }\n  }\n": types.GetCategoriesCountsDocument,
    "\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n    }\n  }\n": types.UpdatePostHitsDocument,
    "\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n": types.GetPostListByCategoryIdDocument,
    "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  query getPostList {\n    getPostList {\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n": types.GetPostListDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation updatePassword($password: String!) {\n    updatePassword(password: $password) {\n      ok\n      error\n      message\n    }\n  }\n": types.UpdatePasswordDocument,
    "\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]!) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n": types.CreatePostDocument,
    "\n  query getCategories {\n    getCategories {\n      ok\n      categories {\n        id\n        categoryTitle\n      }\n    }\n  }\n": types.GetCategoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategory($categoryTitle: String!) {\n    createCategory(categoryTitle: $categoryTitle) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($categoryTitle: String!) {\n    createCategory(categoryTitle: $categoryTitle) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCommentList($postId: Int!) {\n    getCommentList(postId: $postId) {\n      ok\n      comments {\n        id\n        comment\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCommentList($postId: Int!) {\n    getCommentList(postId: $postId) {\n      ok\n      comments {\n        id\n        comment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostList {\n    getPostList {\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostList {\n    getPostList {\n      posts {\n        id\n        title\n        contents\n        hits\n        category {\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePassword($password: String!) {\n    updatePassword(password: $password) {\n      ok\n      error\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation updatePassword($password: String!) {\n    updatePassword(password: $password) {\n      ok\n      error\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]!) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]!) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategories {\n    getCategories {\n      ok\n      categories {\n        id\n        categoryTitle\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategories {\n    getCategories {\n      ok\n      categories {\n        id\n        categoryTitle\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;