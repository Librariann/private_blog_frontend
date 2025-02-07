import Button from "./button";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
} from "@/gql/graphql";

type CreateCategoryForm = {
  categoryTitle: string;
};

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($categoryTitle: String!) {
    createCategory(categoryTitle: $categoryTitle) {
      ok
      error
    }
  }
`;
export const CategoryAddForm = () => {
  const { register, getValues, handleSubmit } = useForm<CreateCategoryForm>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateCategoryMutation) => {
    const {
      createCategory: { ok, error },
    } = data;

    if (ok) {
      alert("추가완료!");
    } else {
      alert(error);
    }
  };

  const [
    createCategoryMutation,
    { loading, data: updatePasswordMutationResult },
  ] = useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CREATE_CATEGORY_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitCategory = () => {
    const categoryTitle = getValues("categoryTitle");
    createCategoryMutation({
      variables: {
        categoryTitle: categoryTitle,
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitCategory)}
      className="flex gap-3 items-end"
    >
      <div className="flex-1">
        <input
          {...register("categoryTitle", {
            required: "카테고리명을 입력해주세요",
          })}
          type="text"
          id="categoryTitle"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="추가할 카테고리명을 입력하세요"
        />
      </div>
      <div className="flex-shrink-0">
        <Button canClick={true} loading={loading} actionText="추가" />
      </div>
    </form>
  );
};
