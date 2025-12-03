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
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  parentCategory?: Maybe<Category>;
  post?: Maybe<Array<Post>>;
  sortOrder?: Maybe<Scalars['Float']['output']>;
  subCategories?: Maybe<Array<Category>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  categoryTitle: Scalars['String']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  parentCategory?: Maybe<Category>;
  post?: Maybe<Array<Post>>;
  sortOrder?: Maybe<Scalars['Float']['output']>;
  subCategories?: Maybe<Array<Category>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategorySortInput = {
  id: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  annonymousId: Scalars['String']['output'];
  annonymousPassword: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  post?: Maybe<Post>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  categoryTitle: Scalars['String']['input'];
  depth?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  parentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  categoryId?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  annonymousId: Scalars['String']['input'];
  annonymousPassword: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  commentId: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  postId: Scalars['Int']['output'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteCommentInput = {
  commentPassword: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type DeleteCommentOutput = {
  __typename?: 'DeleteCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeletePostOutput = {
  __typename?: 'DeletePostOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditCategoryInput = {
  categoryTitle?: InputMaybe<Scalars['String']['input']>;
  depth?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  isParent?: InputMaybe<Scalars['Boolean']['input']>;
  parentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type EditCategoryOutput = {
  __typename?: 'EditCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditPostInput = {
  categoryId: Scalars['Int']['input'];
  contents: Scalars['String']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  postStatus?: PostStatus;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type EditPostOutput = {
  __typename?: 'EditPostOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditSortCategoryInput = {
  editSortCategories?: InputMaybe<Array<CategorySortInput>>;
};

export type EditSortCategoryOutput = {
  __typename?: 'EditSortCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetAllPopularHashTagsOutput = {
  __typename?: 'GetAllPopularHashTagsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hashtags: Array<HashtagCount>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCategoriesCountOutput = {
  __typename?: 'GetCategoriesCountOutput';
  categoryCounts?: Maybe<Array<CategoryCount>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCategoriesOutput = {
  __typename?: 'GetCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCategoryByIdOutput = {
  __typename?: 'GetCategoryByIdOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCommentOutput = {
  __typename?: 'GetCommentOutput';
  comments?: Maybe<Array<Comment>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetHashTagOutput = {
  __typename?: 'GetHashTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  hashtags?: Maybe<Array<Hashtag>>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetPostByIdOutput = {
  __typename?: 'GetPostByIdOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  nextPost?: Maybe<Post>;
  ok: Scalars['Boolean']['output'];
  post?: Maybe<Post>;
  prevPost?: Maybe<Post>;
};

export type GetPostListOutput = {
  __typename?: 'GetPostListOutput';
  error?: Maybe<Scalars['String']['output']>;
  featuredPost: Post;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
};

export type GetPostListWithLimitOutput = {
  __typename?: 'GetPostListWithLimitOutput';
  error?: Maybe<Scalars['String']['output']>;
  featuredPost: Post;
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
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
  deleteCommentByAdmin: DeleteCommentOutput;
  deletePost: DeletePostOutput;
  editCategory: EditCategoryOutput;
  editComment: EditCommentOutput;
  editPost: EditPostOutput;
  editSortCategory: EditSortCategoryOutput;
  login: LoginOutput;
  togglePostStatus: TogglePostStatus;
  updateFeaturedPost: UpdateFeaturedPostOutput;
  updateHashTag: UpdateHashTagOutput;
  updatePassword: UpdatePasswordOutput;
  updatePostHits: UpdatePostHitsOutput;
  updateUserProfile: UpdateUserProfileOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
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


export type MutationDeleteCommentByAdminArgs = {
  id: Scalars['Int']['input'];
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


export type MutationEditSortCategoryArgs = {
  input: EditSortCategoryInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationTogglePostStatusArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUpdateFeaturedPostArgs = {
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
  category?: Maybe<Category>;
  comments?: Maybe<Array<Comment>>;
  contents: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  featureYn: Scalars['String']['output'];
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
  findOneCategoryById: GetCategoryByIdOutput;
  getAllPopularHashTags: GetAllPopularHashTagsOutput;
  getAllPostList: GetPostListOutput;
  getCategories: GetCategoriesOutput;
  getCategoriesCounts: GetCategoriesCountOutput;
  getComments: GetCommentOutput;
  getHashTagList: GetHashTagOutput;
  getPostById?: Maybe<GetPostByIdOutput>;
  getPostList: GetPostListOutput;
  getPostListByCategoryId?: Maybe<GetPostListByCategoryIdOutput>;
  getPostListWithLimit: GetPostListWithLimitOutput;
  getPostsByParentCategoryId?: Maybe<GetPostListByCategoryIdOutput>;
  me: User;
  userProfile: UserProfileOutput;
  userProfileByNickName: UserProfileOutput;
};


export type QueryFindOneCategoryByIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetPostListByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetPostsByParentCategoryIdArgs = {
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
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateFeaturedPostOutput = {
  __typename?: 'UpdateFeaturedPostOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateHashTagInput = {
  hashtags: Array<Scalars['String']['input']>;
  postId: Scalars['Int']['input'];
};

export type UpdateHashTagOutput = {
  __typename?: 'UpdateHashTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
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
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
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
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type GetPostListByCategoryIdOutput = {
  __typename?: 'getPostListByCategoryIdOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
};

export type PostFieldsFragment = { __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, updatedAt?: any | null, readTime: number, postStatus: PostStatus, featureYn: string, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null };

export type GetPostListByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetPostListByCategoryIdQuery = { __typename?: 'Query', getPostListByCategoryId?: { __typename?: 'getPostListByCategoryIdOutput', ok: boolean, error?: string | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, category?: { __typename?: 'Category', id: number, categoryTitle: string } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } | null };

export type GetPostsByParentCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetPostsByParentCategoryIdQuery = { __typename?: 'Query', getPostsByParentCategoryId?: { __typename?: 'getPostListByCategoryIdOutput', ok: boolean, error?: string | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, readTime: number, category?: { __typename?: 'Category', id: number, categoryTitle: string } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: { __typename?: 'GetCategoriesOutput', ok: boolean, error?: string | null, categories?: Array<{ __typename?: 'Category', id: number, categoryTitle: string, sortOrder?: number | null, icon?: string | null, iconColor?: string | null, description?: string | null, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null, subCategories?: Array<{ __typename?: 'Category', id: number, categoryTitle: string, icon?: string | null, iconColor?: string | null, sortOrder?: number | null, description?: string | null, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string, sortOrder?: number | null, icon?: string | null, iconColor?: string | null, description?: string | null } | null, post?: Array<{ __typename?: 'Post', id: number, title: string, createdAt?: any | null }> | null }> | null }> | null } };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: { __typename?: 'GetPostByIdOutput', ok: boolean, post?: { __typename?: 'Post', id: number, title: string, contents: string, hits: number, createdAt?: any | null, readTime: number, thumbnailUrl?: string | null, postStatus: PostStatus, excerpt?: string | null, user?: { __typename?: 'User', id: number } | null, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', categoryTitle: string } | null } | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null, comments?: Array<{ __typename?: 'Comment', id: number, annonymousId: string, comment: string, createdAt?: any | null }> | null } | null, prevPost?: { __typename?: 'Post', id: number, title: string, createdAt?: any | null, readTime: number } | null, nextPost?: { __typename?: 'Post', id: number, title: string, createdAt?: any | null, readTime: number } | null } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentOutput', ok: boolean, error?: string | null, commentId: number } };

export type GetPostListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostListQuery = { __typename?: 'Query', getPostList: { __typename?: 'GetPostListOutput', posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, updatedAt?: any | null, readTime: number, postStatus: PostStatus, featureYn: string, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null, featuredPost: { __typename?: 'Post', id: number, title: string, excerpt?: string | null, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null } | null } } };

export type GetPostListWithLimitQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostListWithLimitQuery = { __typename?: 'Query', getPostListWithLimit: { __typename?: 'GetPostListWithLimitOutput', posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, updatedAt?: any | null, readTime: number, postStatus: PostStatus, featureYn: string, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null, featuredPost: { __typename?: 'Post', id: number, title: string, excerpt?: string | null } } };

export type GetAllPostListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostListQuery = { __typename?: 'Query', getAllPostList: { __typename?: 'GetPostListOutput', posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, excerpt?: string | null, hits: number, thumbnailUrl?: string | null, createdAt?: any | null, updatedAt?: any | null, readTime: number, postStatus: PostStatus, featureYn: string, category?: { __typename?: 'Category', id: number, categoryTitle: string, parentCategory?: { __typename?: 'Category', id: number, categoryTitle: string } | null } | null, comments?: Array<{ __typename?: 'Comment', comment: string }> | null, hashtags?: Array<{ __typename?: 'Hashtag', hashtag: string }> | null }> | null } };

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

export type EditPostMutationVariables = Exact<{
  input: EditPostInput;
  hashtags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'EditPostOutput', ok: boolean, error?: string | null } };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CreateCategoryOutput', ok: boolean, error?: string | null } };

export type EditCategoryMutationVariables = Exact<{
  input: EditCategoryInput;
}>;


export type EditCategoryMutation = { __typename?: 'Mutation', editCategory: { __typename?: 'EditCategoryOutput', ok: boolean, error?: string | null } };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'DeleteCategoryOutput', ok: boolean, error?: string | null } };

export type FindOneCategoryByIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type FindOneCategoryByIdQuery = { __typename?: 'Query', findOneCategoryById: { __typename?: 'GetCategoryByIdOutput', ok: boolean, error?: string | null, category?: { __typename?: 'Category', id: number, categoryTitle: string, icon?: string | null, iconColor?: string | null, description?: string | null } | null } };

export type GetCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'GetCommentOutput', ok: boolean, error?: string | null, comments?: Array<{ __typename?: 'Comment', id: number, comment: string, annonymousId: string, createdAt?: any | null, post?: { __typename?: 'Post', id: number, title: string } | null }> | null } };

export type DeleteCommentByAdminMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCommentByAdminMutation = { __typename?: 'Mutation', deleteCommentByAdmin: { __typename?: 'DeleteCommentOutput', ok: boolean, error?: string | null } };

export type UpdatePostHitsMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type UpdatePostHitsMutation = { __typename?: 'Mutation', updatePostHits: { __typename?: 'UpdatePostHitsOutput', ok: boolean, error?: string | null } };

export type EditSortCategoryMutationVariables = Exact<{
  input: EditSortCategoryInput;
}>;


export type EditSortCategoryMutation = { __typename?: 'Mutation', editSortCategory: { __typename?: 'EditSortCategoryOutput', ok: boolean } };

export type UpdateFeaturedPostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type UpdateFeaturedPostMutation = { __typename?: 'Mutation', updateFeaturedPost: { __typename?: 'UpdateFeaturedPostOutput', ok: boolean, message?: string | null, error?: string | null } };

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export const PostFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"featureYn"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<PostFieldsFragment, unknown>;
export const GetPostListByCategoryIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostListByCategoryId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostListByCategoryId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostListByCategoryIdQuery, GetPostListByCategoryIdQueryVariables>;
export const GetPostsByParentCategoryIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsByParentCategoryId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostsByParentCategoryId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsByParentCategoryIdQuery, GetPostsByParentCategoryIdQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"iconColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"iconColor"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"iconColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"annonymousId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"prevPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const GetPostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"featureYn"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<GetPostListQuery, GetPostListQueryVariables>;
export const GetPostListWithLimitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostListWithLimit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostListWithLimit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"featureYn"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<GetPostListWithLimitQuery, GetPostListWithLimitQueryVariables>;
export const GetAllPostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPostList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"readTime"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"featureYn"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}}]}}]}}]} as unknown as DocumentNode<GetAllPostListQuery, GetAllPostListQueryVariables>;
export const GetAllPopularHashTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPopularHashTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPopularHashTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtag"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPopularHashTagsQuery, GetAllPopularHashTagsQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UserProfileByNickNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfileByNickName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userNickName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfileByNickName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNickName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userNickName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"introduce"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}},{"kind":"Field","name":{"kind":"Name","value":"postStatus"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileByNickNameQuery, UserProfileByNickNameQueryVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const TogglePostStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"togglePostStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"togglePostStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<TogglePostStatusMutation, TogglePostStatusMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashtags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const EditPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashtags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashtags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditPostMutation, EditPostMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const EditCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditCategoryMutation, EditCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const FindOneCategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneCategoryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneCategoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"iconColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<FindOneCategoryByIdQuery, FindOneCategoryByIdQueryVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"annonymousId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const DeleteCommentByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCommentByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCommentByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentByAdminMutation, DeleteCommentByAdminMutationVariables>;
export const UpdatePostHitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePostHits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePostHits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdatePostHitsMutation, UpdatePostHitsMutationVariables>;
export const EditSortCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editSortCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditSortCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editSortCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<EditSortCategoryMutation, EditSortCategoryMutationVariables>;
export const UpdateFeaturedPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFeaturedPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFeaturedPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateFeaturedPostMutation, UpdateFeaturedPostMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;