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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  categoryTitle: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type CreateCategoryInput = {
  categoryTitle: Scalars['String']['input'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  categoryId: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  commentId: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateHashTagInput = {
  hashtag: Scalars['String']['input'];
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
  id: Scalars['Float']['input'];
};

export type EditCategoryOutput = {
  __typename?: 'EditCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditCommentInput = {
  comment: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};

export type EditCommentOutput = {
  __typename?: 'EditCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditPostInput = {
  contents: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type EditPostOutput = {
  __typename?: 'EditPostOutput';
  error?: Maybe<Scalars['String']['output']>;
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
  createdAt: Scalars['DateTime']['output'];
  hashtag: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  postId?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
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
  updateHashTag: UpdateHashTagOutput;
  updatePassword: UpdatePasswordOutput;
  updatePostHits: UpdatePostHitsOutput;
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
  input: CreatePostInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']['input'];
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
  input: EditPostInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
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

export type Post = {
  __typename?: 'Post';
  category: Category;
  comments: Array<Comment>;
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hashtags: Array<Hashtag>;
  hits: Scalars['Int']['output'];
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: GetCategoriesOutput;
  getCategoriesCounts: GetCategoriesCountOutput;
  getHashTagList: GetHashTagOutput;
  getPostById?: Maybe<GetPostByIdOutput>;
  getPostList: GetPostListOutput;
  getPostListByCategoryId?: Maybe<GetPostListByCategoryIdOutput>;
  me: User;
  userProfile: UserProfileOutput;
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetPostListByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryUserProfileArgs = {
  userId: Scalars['Int']['input'];
};

export type UpdateHashTagInput = {
  hashtag: Scalars['String']['input'];
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

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  password: Scalars['String']['output'];
  posts: Array<Post>;
  profileImage?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
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

export type GetCategoriesCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesCountsQuery = { __typename?: 'Query', getCategoriesCounts: { __typename?: 'GetCategoriesCountOutput', ok: boolean, categoryCounts?: Array<{ __typename?: 'CategoryCount', id: number, categoryTitle: string, count: number }> | null } };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: { __typename?: 'GetPostByIdOutput', ok: boolean, post?: { __typename?: 'Post', id: number, title: string, contents: string, hits: number } | null } | null };

export type GetPostListByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetPostListByCategoryIdQuery = { __typename?: 'Query', getPostListByCategoryId?: { __typename?: 'getPostListByCategoryIdOutput', ok: boolean, error?: string | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, contents: string, category: { __typename?: 'Category', id: number } }> | null } | null };

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UpdatePasswordOutput', ok: boolean, error?: string | null, message?: string | null } };


export const GetCategoriesCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategoriesCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoriesCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"categoryCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesCountsQuery, GetCategoriesCountsQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostListByCategoryIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostListByCategoryId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostListByCategoryId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostListByCategoryIdQuery, GetPostListByCategoryIdQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAccountInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;