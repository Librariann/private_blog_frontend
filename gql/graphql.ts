/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  categoryTitle: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  parentCategoryId?: Maybe<Scalars['Float']['output']>;
  parentCategoryTitle?: Maybe<Scalars['String']['output']>;
  sortOrder?: Maybe<Scalars['Float']['output']>;
  subCategories?: Maybe<Array<Category>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  categoryTitle: Scalars['String']['output'];
  children?: Maybe<Array<CategoryCount>>;
  count: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  parentCategoryId?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String']['output'];
  commentId: Scalars['String']['output'];
  commentPassword: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  categoryId?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
  commentPassword: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  commentId: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateHashTagInput = {
  hashtags: Array<Scalars['String']['input']>;
  postId: Scalars['Int']['input'];
};

export type CreateHashTagOutput = {
  __typename?: 'CreateHashTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  hashtagId: Scalars['Int']['output'];
  ok: Scalars['Boolean']['output'];
};

export type CreatePostInput = {
  categoryId: Scalars['Int']['input'];
  contents: Scalars['String']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  postStatus?: PostStatus;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  postId: Scalars['Int']['output'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteCommentInput = {
  commentPassword: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type DeleteCommentOutput = {
  __typename?: 'DeleteCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeletePostOutput = {
  __typename?: 'DeletePostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditCategoryInput = {
  categoryTitle: Scalars['String']['input'];
  depth?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Float']['input'];
  parentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type EditCategoryOutput = {
  __typename?: 'EditCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditCommentInput = {
  comment: Scalars['String']['input'];
  commentPassword: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type EditCommentOutput = {
  __typename?: 'EditCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditPostInput = {
  contents: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type EditPostOutput = {
  __typename?: 'EditPostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetAllPopularHashTagsOutput = {
  __typename?: 'GetAllPopularHashTagsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hashtags: Array<HashtagCount>;
  ok: Scalars['Boolean']['output'];
};

export type GetCategoriesCountOutput = {
  __typename?: 'GetCategoriesCountOutput';
  categoryCounts?: Maybe<Array<CategoryCount>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCategoriesOutput = {
  __typename?: 'GetCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCommentOutput = {
  __typename?: 'GetCommentOutput';
  comments?: Maybe<Array<Comment>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetHashTagOutput = {
  __typename?: 'GetHashTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  hashtags?: Maybe<Array<Hashtag>>;
  ok: Scalars['Boolean']['output'];
};

export type GetPostByIdOutput = {
  __typename?: 'GetPostByIdOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  post?: Maybe<Post>;
};

export type GetPostListOutput = {
  __typename?: 'GetPostListOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  hashtag: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  postId?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type HashtagCount = {
  __typename?: 'HashtagCount';
  count: Scalars['Int']['output'];
  hashtag: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createComment: CreateCommentOutput;
  createHashTag: CreateHashTagOutput;
  createPost: CreatePostOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteComment: DeleteCommentOutput;
  deletePost: DeletePostOutput;
  editCategory: EditCategoryOutput;
  editComment: EditCommentOutput;
  editPost: EditPostOutput;
  login: LoginOutput;
  togglePostStatus: TogglePostStatus;
  updateHashTag: UpdateHashTagOutput;
  updatePassword: UpdatePasswordOutput;
  updatePostHits: UpdatePostHitsOutput;
  updateUserProfile: UpdateUserProfileOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateCategoryArgs = {
  categoryParentId?: InputMaybe<Scalars['Int']['input']>;
  categoryTitle: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateHashTagArgs = {
  input: CreateHashTagInput;
};


export type MutationCreatePostArgs = {
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  input: CreatePostInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationEditCategoryArgs = {
  input: EditCategoryInput;
};


export type MutationEditCommentArgs = {
  input: EditCommentInput;
};


export type MutationEditPostArgs = {
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  input: EditPostInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationTogglePostStatusArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUpdateHashTagArgs = {
  input: UpdateHashTagInput;
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationUpdatePostHitsArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};

export type Post = {
  __typename?: 'Post';
  category: Category;
  comments?: Maybe<Array<Comment>>;
  contents: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  hashtags?: Maybe<Array<Hashtag>>;
  hits: Scalars['Int']['output'];
  id: Scalars['Float']['output'];
  postStatus: PostStatus;
  readTime: Scalars['Int']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export enum PostStatus {
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Private = 'PRIVATE',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  getAllPopularHashTags: GetAllPopularHashTagsOutput;
  getAllPostList: GetPostListOutput;
  getCategories: GetCategoriesOutput;
  getCategoriesCounts: GetCategoriesCountOutput;
  getCommentList: GetCommentOutput;
  getHashTagList: GetHashTagOutput;
  getPostById?: Maybe<GetPostByIdOutput>;
  getPostList: GetPostListOutput;
  getPostListByCategoryId?: Maybe<GetPostListByCategoryIdOutput>;
  getPostListByParentCategoryId?: Maybe<GetPostListByCategoryIdOutput>;
  me: User;
  userProfile: UserProfileOutput;
  userProfileByNickName: UserProfileOutput;
};


export type QueryGetCommentListArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetPostListByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetPostListByParentCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryUserProfileArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserProfileByNickNameArgs = {
  userNickName: Scalars['String']['input'];
};

export type TogglePostStatus = {
  __typename?: 'TogglePostStatus';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateHashTagInput = {
  hashtags: Array<Scalars['String']['input']>;
  postId: Scalars['Int']['input'];
};

export type UpdateHashTagOutput = {
  __typename?: 'UpdateHashTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdatePasswordOutput = {
  __typename?: 'UpdatePasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdatePostHitsOutput = {
  __typename?: 'UpdatePostHitsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateUserProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  introduce?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileOutput = {
  __typename?: 'UpdateUserProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  introduce?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  posts: Array<Post>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type GetPostListByCategoryIdOutput = {
  __typename?: 'getPostListByCategoryIdOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
};

export type CreateCategoryMutationVariables = Exact<{
  categoryTitle: Scalars['String']['input'];
  categoryParentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CreateCategoryOutput', ok: boolean, error?: string | null } };

export type PostFieldsFragment = { __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, postStatus: PostStatus, category: { __typename?: 'Category', id: number, categoryTitle: string, parentCategoryTitle?: string | null }, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null };

export type GetPostListByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetPostListByCategoryIdQuery = { __typename?: 'Query', getPostListByCategoryId?: { __typename?: 'getPostListByCategoryIdOutput', ok: boolean, error?: string | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, category: { __typename?: 'Category', id: number, categoryTitle: string, parentCategoryId?: number | null, parentCategoryTitle?: string | null }, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } | null };

export type GetPostListByParentCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetPostListByParentCategoryIdQuery = { __typename?: 'Query', getPostListByParentCategoryId?: { __typename?: 'getPostListByCategoryIdOutput', ok: boolean, error?: string | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, category: { __typename?: 'Category', id: number, categoryTitle: string, parentCategoryId?: number | null, parentCategoryTitle?: string | null }, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } | null };

export type GetCategoriesCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesCountsQuery = { __typename?: 'Query', getCategoriesCounts: { __typename?: 'GetCategoriesCountOutput', ok: boolean, categoryCounts?: Array<{ __typename?: 'CategoryCount', id: number, categoryTitle: string, parentCategoryId?: number | null, count: number, children?: Array<{ __typename?: 'CategoryCount', id: number, categoryTitle: string, count: number }> | null }> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: { __typename?: 'GetCategoriesOutput', ok: boolean, categories?: Array<{ __typename?: 'Category', id: number, categoryTitle: string, depth?: number | null, parentCategoryId?: number | null, parentCategoryTitle?: string | null, sortOrder?: number | null, subCategories?: Array<{ __typename?: 'Category', id: number, categoryTitle: string, sortOrder?: number | null }> | null }> | null } };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: { __typename?: 'GetPostByIdOutput', ok: boolean, post?: { __typename?: 'Post', id: number, title: string, contents: string, hits: number, createdAt?: any | null, readTime: number, thumbnailUrl?: string | null, postStatus: PostStatus, user?: { __typename?: 'User', id: number } | null, category: { __typename?: 'Category', id: number, categoryTitle: string }, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, comment: string, createdAt?: any | null }> | null } | null } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentOutput', ok: boolean, error?: string | null, commentId: number } };

export type GetPostListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostListQuery = { __typename?: 'Query', getPostList: { __typename?: 'GetPostListOutput', posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, postStatus: PostStatus, category: { __typename?: 'Category', id: number, categoryTitle: string, parentCategoryTitle?: string | null }, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } };

export type GetAllPostListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostListQuery = { __typename?: 'Query', getAllPostList: { __typename?: 'GetPostListOutput', posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, postStatus: PostStatus, category: { __typename?: 'Category', id: number, categoryTitle: string, parentCategoryTitle?: string | null }, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } };

export type GetAllPopularHashTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPopularHashTagsQuery = { __typename?: 'Query', getAllPopularHashTags: { __typename?: 'GetAllPopularHashTagsOutput', hashtags: Array<{ __typename?: 'HashtagCount', hashtag: string, count: number }> } };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfileOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, nickname?: string | null, email: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type UserProfileByNickNameQueryVariables = Exact<{
  userNickName: Scalars['String']['input'];
}>;


export type UserProfileByNickNameQuery = { __typename?: 'Query', userProfileByNickName: { __typename?: 'UserProfileOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, email: string, nickname?: string | null, profileImage?: string | null, introduce?: string | null, location?: string | null, website?: string | null, role?: string | null, createdAt?: any | null, updatedAt?: any | null, posts: Array<{ __typename?: 'Post', title: string, createdAt?: any | null, hits: number, postStatus: PostStatus, comments?: Array<{ __typename?: 'Comment', id: number }> | null }> } | null } };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UpdateUserProfileOutput', ok: boolean, error?: string | null } };

export type TogglePostStatusMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type TogglePostStatusMutation = { __typename?: 'Mutation', togglePostStatus: { __typename?: 'TogglePostStatus', ok: boolean, error?: string | null } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostOutput', ok: boolean, error?: string | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
  hashtags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostOutput', ok: boolean, error?: string | null, postId: number } };

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export type EditPostMutationVariables = Exact<{
  input: EditPostInput;
  hashtags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'EditPostOutput', ok: boolean, error?: string | null } };

export const PostFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<PostFieldsFragment, unknown>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryParentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryParentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryParentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const GetPostListByCategoryIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostListByCategoryId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostListByCategoryId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostListByCategoryIdQuery, GetPostListByCategoryIdQueryVariables>;
export const GetPostListByParentCategoryIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostListByParentCategoryId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostListByParentCategoryId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostListByParentCategoryIdQuery, GetPostListByParentCategoryIdQueryVariables>;
export const GetCategoriesCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategoriesCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoriesCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"categoryCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesCountsQuery, GetCategoriesCountsQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const GetPostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<GetPostListQuery, GetPostListQueryVariables>;
export const GetAllPostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<GetAllPostListQuery, GetAllPostListQueryVariables>;
export const GetAllPopularHashTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPopularHashTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPopularHashTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPopularHashTagsQuery, GetAllPopularHashTagsQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UserProfileByNickNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfileByNickName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userNickName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfileByNickName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNickName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userNickName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"introduce"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileByNickNameQuery, UserProfileByNickNameQueryVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const TogglePostStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"togglePostStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"togglePostStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<TogglePostStatusMutation, TogglePostStatusMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashtags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const EditPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashtags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditPostMutation, EditPostMutationVariables>;