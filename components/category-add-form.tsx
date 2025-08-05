import Button from "./button";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Category,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
} from "@/gql/graphql";
import { toast } from "react-toastify";
import RadioButtons from "./buttons/radio-buttons";
import { useEffect, useState } from "react";
import { useGetCategories } from "@/hooks/hooks";

type CreateCategoryForm = {
  categoryTitle: string;
  categoryParentId: number;
};

type CategoryWithChildren = {
  id: number;
  categoryTitle: string;
  parentCategoryId: number;
};

type categoryList = Category & {
  children: CategoryWithChildren[];
};

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($categoryTitle: String!, $categoryParentId: Int) {
    createCategory(
      categoryTitle: $categoryTitle
      categoryParentId: $categoryParentId
    ) {
      ok
      error
    }
  }
`;
export const CategoryAddForm = async () => {
  const [isCategoryParent, setIsCategoryParent] = useState(false);
  const [categoryList, setCategoryList] = useState<categoryList[]>([]);
  const { register, getValues, handleSubmit } = useForm<CreateCategoryForm>({
    mode: "onChange",
  });

  const getCategoryDatas = await useGetCategories();

  useEffect(() => {
    const categories = getCategoryDatas?.getCategories?.categories || [];
    const tree: categoryList[] = [];
    const map = new Map();
    categories.forEach((category) => {
      map.set(category.id, { ...category, children: [] });
    });

    categories.forEach((category) => {
      const node = map.get(category.id);
      if (category.parentCategoryId) {
        const parent = map.get(category.parentCategoryId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        tree.push(node);
      }
    });
    setCategoryList(tree);
  }, [getCategoryDatas]);

  const onCompleted = (data: CreateCategoryMutation) => {
    const {
      createCategory: { ok, error },
    } = data;

    if (ok) {
      toast.success("카테고리 추가 완료!");
    } else {
      toast.error(error);
    }
  };

  const [createCategoryMutation, { loading }] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY_MUTATION, {
    onCompleted,
    update(cache, { data: mutationResult }) {
      if (mutationResult?.createCategory.ok) {
        cache.modify({
          fields: {
            getCategories(existing = {}) {
              cache.evict({ fieldName: "getCategories" });
              return existing;
            },
          },
        });
        cache.gc();
      }
    },
  });

  const onSubmitCategory = () => {
    const categoryTitle = getValues("categoryTitle");
    const categoryParentId = getValues("categoryParentId");
    createCategoryMutation({
      variables: {
        categoryTitle,
        categoryParentId: +categoryParentId,
      },
    });
  };

  const handleCategoryParent = (value: boolean) => {
    setIsCategoryParent(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitCategory)}
      className="flex gap-3 items-end"
    >
      <div className="flex-1">
        <RadioButtons categoryParent={handleCategoryParent} />
        <div className="w-64 border border-gray-300 rounded-lg p-2 mb-2">
          <h1 className="font-bold text-lg">카테고리 목록</h1>
          <hr />
          {categoryList.map((parent) => (
            <>
              <div key={parent.id}>{parent.categoryTitle}</div>
              <div>
                {parent.children.map((v: any, i: number) => (
                  <div key={i}>&nbsp;&nbsp;&nbsp;ㄴ{v.categoryTitle}</div>
                ))}
              </div>
            </>
          ))}
        </div>
        <div className="w-full">
          {isCategoryParent && (
            <select {...register("categoryParentId")}>
              <option value="">카테고리 선택</option>
              {categoryList.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.categoryTitle}
                </option>
              ))}
            </select>
          )}
          <input
            {...register("categoryTitle", {
              required: "카테고리명을 입력해주세요",
            })}
            type="text"
            id="categoryTitle"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="추가할 카테고리명을 입력하세요"
          />
        </div>
      </div>
      <div className="shrink-0">
        <Button canClick={true} loading={loading} actionText="추가" />
      </div>
    </form>
  );
};
