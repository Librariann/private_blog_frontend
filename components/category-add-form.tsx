import Button from "./button";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
} from "@/pages/gql/graphql";

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
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCategoryForm>({
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
    <form onSubmit={handleSubmit(onSubmitCategory)}>
      <input
        {...register("categoryTitle")}
        type="text"
        className="input-new"
        placeholder="추가할 카테고리 명"
      />
      <Button canClick={true} loading={false} actionText="추가" />
    </form>
  );
};
