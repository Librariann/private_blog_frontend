import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/button";
import FormError from "@/components/form-error";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/modal/confirm-modal";
import Link from "next/link";
import Head from "next/head";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate.push("/");
  };

  const handleAccessConfirm = () => {
    setIsModalOpen(false);
    navigate.push("/");
  };

  return (
    <>
      <Head><title>접근 요청 | Librarian&apos;s Blog</title></Head>
      <main className="editorial-auth-page">
        <section className="editorial-auth-intro">
          <span className="editorial-kicker">Private desk / Request</span>
          <span className="editorial-auth-index">B</span>
          <h1>새로운 계정으로<br />작업실을 엽니다.</h1>
          <p>현재 새 계정은 관리자 승인 범위에서만 사용할 수 있습니다.</p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="editorial-auth-form">
          <span className="editorial-section-label">Create account</span>
          <label><span>Email</span>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "유효한 이메일 주소를 입력해주세요",
            },
          })}
          className="editorial-field"
          type="email"
          placeholder="Email"
        /></label>
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <label><span>Password</span><input
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{10,}$/,
              message:
                "대문자, 소문자, 숫자, 특수문자를 조합해 10자리 이상으로 비밀번호를 입력해주세요",
            },
          })}
          className="editorial-field"
          type="password"
          placeholder="Password"
        /></label>
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
          <Button canClick={isValid} loading={loading} actionText="계정 생성 →" />
          <p className="editorial-auth-switch">이미 계정이 있나요? <Link href="/login">로그인</Link></p>
        </form>
      </main>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleAccessConfirm}
        title="접근 권한 없음"
        message="현재 회원가입은 관리자만 가능합니다. 메인 페이지로 이동합니다."
        isCancel={true}
      />
    </>
  );
}

export default CreateAccount;
