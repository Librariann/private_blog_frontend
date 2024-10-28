import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "@/components/button";
import FormError from "@/components/form-error";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
interface ICreateAccountForm {
  email: string;
  password: string;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

function CreateAccount() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });

  const navigate = useRouter();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      alert("계정이 생성 됐습니다.");
      navigate.push("/login");
    } else {
      alert(error);
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password },
        },
      });
    }
  };

  const redirectLogin = () => {
    navigate.push("/login");
  };

  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">회원가입</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 mb-5 w-full"
      >
        <input
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "유효한 이메일 주소를 입력해주세요",
            },
          })}
          className="input-new"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{10,}$/,
              message:
                "대문자, 소문자, 숫자, 특수문자를 조합해 10자리 이상으로 비밀번호를 입력해주세요",
            },
          })}
          className="input-new"
          type="password"
          placeholder="Passowrd"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <Button
          canClick={isValid}
          loading={loading}
          actionText="계정생성"
        ></Button>
      </form>
      <div>
        이미 계정이 있으신 분들은{" "}
        <span
          className="cursor-pointer font-bold text-xl underline decoration-sky-500 hover:text-red-600"
          onClick={redirectLogin}
        >
          여기
        </span>
        를 클릭해주세요
      </div>
    </div>
  );
}

export default CreateAccount;
