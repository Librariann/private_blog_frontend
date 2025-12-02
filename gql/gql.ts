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
    "\n  fragment PostFields on Post {\n    id\n    title\n    contents\n    excerpt\n    hits\n    thumbnailUrl\n    createdAt\n    readTime\n    postStatus\n    category {\n      id\n      categoryTitle\n      parentCategory {\n        id\n        categoryTitle\n      }\n    }\n    comments {\n      comment\n    }\n    hashtags {\n      hashtag\n    }\n  }\n": types.PostFieldsFragmentDoc,
    "\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n": types.GetPostListByCategoryIdDocument,
    "\n  query getPostsByParentCategoryId($categoryId: Int!) {\n    getPostsByParentCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n": types.GetPostsByParentCategoryIdDocument,
    "\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        icon\n        iconColor\n        subCategories {\n          id\n          categoryTitle\n        }\n      }\n    }\n  }\n": types.GetCategoriesCountsDocument,
    "\n  query getCategories {\n    getCategories {\n      ok\n      error\n      categories {\n        id\n        categoryTitle\n        sortOrder\n        icon\n        iconColor\n        description\n        parentCategory {\n          id\n          categoryTitle\n        }\n        subCategories {\n          id\n          categoryTitle\n          icon\n          iconColor\n          sortOrder\n          description\n          parentCategory {\n            id\n            categoryTitle\n            sortOrder\n            icon\n            iconColor\n            description\n          }\n          post {\n            id\n            title\n            createdAt\n          }\n        }\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        readTime\n        thumbnailUrl\n        postStatus\n        user {\n          id\n        }\n        category {\n          id\n          categoryTitle\n          parentCategory {\n            categoryTitle\n          }\n        }\n        hashtags {\n          hashtag\n        }\n        comments {\n          id\n          annonymousId\n          comment\n          createdAt\n        }\n      }\n      prevPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n      nextPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n": types.CreateCommentDocument,
    "\n  \n  query getPostList {\n    getPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n": types.GetPostListDocument,
    "\n  \n  query getAllPostList {\n    getAllPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n": types.GetAllPostListDocument,
    "\n  query getAllPopularHashTags {\n    getAllPopularHashTags {\n      hashtags {\n        hashtag\n        count\n      }\n    }\n  }\n": types.GetAllPopularHashTagsDocument,
    "\n  query userProfile($userId: Int!) {\n    userProfile(userId: $userId) {\n      ok\n      error\n      user {\n        id\n        nickname\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.UserProfileDocument,
    "\n  query userProfileByNickName($userNickName: String!) {\n    userProfileByNickName(userNickName: $userNickName) {\n      ok\n      error\n      user {\n        id\n        email\n        nickname\n        profileImage\n        introduce\n        location\n        website\n        role\n        createdAt\n        updatedAt\n        posts {\n          title\n          createdAt\n          hits\n          postStatus\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.UserProfileByNickNameDocument,
    "\n  mutation updateUserProfile($input: UpdateUserProfileInput!) {\n    updateUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  mutation togglePostStatus($postId: Int!) {\n    togglePostStatus(postId: $postId) {\n      ok\n      error\n    }\n  }\n": types.TogglePostStatusDocument,
    "\n  mutation deletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ok\n      error\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation editPost($input: EditPostInput!, $hashtags: [String!]) {\n    editPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n    }\n  }\n": types.EditPostDocument,
    "\n  mutation createCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditCategoryDocument,
    "\n  mutation deleteCategory($categoryId: Int!) {\n    deleteCategory(categoryId: $categoryId) {\n      ok\n      error\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  query findOneCategoryById($categoryId: Int!) {\n    findOneCategoryById(categoryId: $categoryId) {\n      ok\n      error\n      category {\n        id\n        categoryTitle\n        icon\n        iconColor\n        description\n      }\n    }\n  }\n": types.FindOneCategoryByIdDocument,
    "\n  query getComments {\n    getComments {\n      ok\n      error\n      comments {\n        id\n        comment\n        annonymousId\n        createdAt\n        post {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.GetCommentsDocument,
    "\n  mutation deleteCommentByAdmin($id: Int!) {\n    deleteCommentByAdmin(id: $id) {\n      ok\n      error\n    }\n  }\n": types.DeleteCommentByAdminDocument,
    "\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n      error\n    }\n  }\n": types.UpdatePostHitsDocument,
    "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
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
export function graphql(source: "\n  fragment PostFields on Post {\n    id\n    title\n    contents\n    excerpt\n    hits\n    thumbnailUrl\n    createdAt\n    readTime\n    postStatus\n    category {\n      id\n      categoryTitle\n      parentCategory {\n        id\n        categoryTitle\n      }\n    }\n    comments {\n      comment\n    }\n    hashtags {\n      hashtag\n    }\n  }\n"): (typeof documents)["\n  fragment PostFields on Post {\n    id\n    title\n    contents\n    excerpt\n    hits\n    thumbnailUrl\n    createdAt\n    readTime\n    postStatus\n    category {\n      id\n      categoryTitle\n      parentCategory {\n        id\n        categoryTitle\n      }\n    }\n    comments {\n      comment\n    }\n    hashtags {\n      hashtag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostListByCategoryId($categoryId: Int!) {\n    getPostListByCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostsByParentCategoryId($categoryId: Int!) {\n    getPostsByParentCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostsByParentCategoryId($categoryId: Int!) {\n    getPostsByParentCategoryId(categoryId: $categoryId) {\n      ok\n      error\n      posts {\n        id\n        title\n        contents\n        hits\n        thumbnailUrl\n        createdAt\n        readTime\n        category {\n          id\n          categoryTitle\n        }\n        comments {\n          comment\n        }\n        hashtags {\n          hashtag\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        icon\n        iconColor\n        subCategories {\n          id\n          categoryTitle\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategoriesCounts {\n    getCategoriesCounts {\n      ok\n      categoryCounts {\n        id\n        categoryTitle\n        icon\n        iconColor\n        subCategories {\n          id\n          categoryTitle\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategories {\n    getCategories {\n      ok\n      error\n      categories {\n        id\n        categoryTitle\n        sortOrder\n        icon\n        iconColor\n        description\n        parentCategory {\n          id\n          categoryTitle\n        }\n        subCategories {\n          id\n          categoryTitle\n          icon\n          iconColor\n          sortOrder\n          description\n          parentCategory {\n            id\n            categoryTitle\n            sortOrder\n            icon\n            iconColor\n            description\n          }\n          post {\n            id\n            title\n            createdAt\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategories {\n    getCategories {\n      ok\n      error\n      categories {\n        id\n        categoryTitle\n        sortOrder\n        icon\n        iconColor\n        description\n        parentCategory {\n          id\n          categoryTitle\n        }\n        subCategories {\n          id\n          categoryTitle\n          icon\n          iconColor\n          sortOrder\n          description\n          parentCategory {\n            id\n            categoryTitle\n            sortOrder\n            icon\n            iconColor\n            description\n          }\n          post {\n            id\n            title\n            createdAt\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        readTime\n        thumbnailUrl\n        postStatus\n        user {\n          id\n        }\n        category {\n          id\n          categoryTitle\n          parentCategory {\n            categoryTitle\n          }\n        }\n        hashtags {\n          hashtag\n        }\n        comments {\n          id\n          annonymousId\n          comment\n          createdAt\n        }\n      }\n      prevPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n      nextPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostById($postId: Int!) {\n    getPostById(postId: $postId) {\n      ok\n      post {\n        id\n        title\n        contents\n        hits\n        createdAt\n        readTime\n        thumbnailUrl\n        postStatus\n        user {\n          id\n        }\n        category {\n          id\n          categoryTitle\n          parentCategory {\n            categoryTitle\n          }\n        }\n        hashtags {\n          hashtag\n        }\n        comments {\n          id\n          annonymousId\n          comment\n          createdAt\n        }\n      }\n      prevPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n      nextPost {\n        id\n        title\n        createdAt\n        readTime\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      commentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query getPostList {\n    getPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query getPostList {\n    getPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query getAllPostList {\n    getAllPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query getAllPostList {\n    getAllPostList {\n      posts {\n        ...PostFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllPopularHashTags {\n    getAllPopularHashTags {\n      hashtags {\n        hashtag\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllPopularHashTags {\n    getAllPopularHashTags {\n      hashtags {\n        hashtag\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userProfile($userId: Int!) {\n    userProfile(userId: $userId) {\n      ok\n      error\n      user {\n        id\n        nickname\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query userProfile($userId: Int!) {\n    userProfile(userId: $userId) {\n      ok\n      error\n      user {\n        id\n        nickname\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userProfileByNickName($userNickName: String!) {\n    userProfileByNickName(userNickName: $userNickName) {\n      ok\n      error\n      user {\n        id\n        email\n        nickname\n        profileImage\n        introduce\n        location\n        website\n        role\n        createdAt\n        updatedAt\n        posts {\n          title\n          createdAt\n          hits\n          postStatus\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userProfileByNickName($userNickName: String!) {\n    userProfileByNickName(userNickName: $userNickName) {\n      ok\n      error\n      user {\n        id\n        email\n        nickname\n        profileImage\n        introduce\n        location\n        website\n        role\n        createdAt\n        updatedAt\n        posts {\n          title\n          createdAt\n          hits\n          postStatus\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUserProfile($input: UpdateUserProfileInput!) {\n    updateUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserProfile($input: UpdateUserProfileInput!) {\n    updateUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation togglePostStatus($postId: Int!) {\n    togglePostStatus(postId: $postId) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation togglePostStatus($postId: Int!) {\n    togglePostStatus(postId: $postId) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($input: CreatePostInput!, $hashtags: [String!]) {\n    createPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n      postId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editPost($input: EditPostInput!, $hashtags: [String!]) {\n    editPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editPost($input: EditPostInput!, $hashtags: [String!]) {\n    editPost(input: $input, hashtags: $hashtags) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCategory($categoryId: Int!) {\n    deleteCategory(categoryId: $categoryId) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCategory($categoryId: Int!) {\n    deleteCategory(categoryId: $categoryId) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneCategoryById($categoryId: Int!) {\n    findOneCategoryById(categoryId: $categoryId) {\n      ok\n      error\n      category {\n        id\n        categoryTitle\n        icon\n        iconColor\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query findOneCategoryById($categoryId: Int!) {\n    findOneCategoryById(categoryId: $categoryId) {\n      ok\n      error\n      category {\n        id\n        categoryTitle\n        icon\n        iconColor\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getComments {\n    getComments {\n      ok\n      error\n      comments {\n        id\n        comment\n        annonymousId\n        createdAt\n        post {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getComments {\n    getComments {\n      ok\n      error\n      comments {\n        id\n        comment\n        annonymousId\n        createdAt\n        post {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCommentByAdmin($id: Int!) {\n    deleteCommentByAdmin(id: $id) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCommentByAdmin($id: Int!) {\n    deleteCommentByAdmin(id: $id) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation updatePostHits($postId: Int!) {\n    updatePostHits(postId: $postId) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;