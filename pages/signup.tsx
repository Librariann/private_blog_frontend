import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../components/input";
import Button from "@/components/button";
import { register } from "module";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">회원가입</h1>
      <Input
        type="email"
        className="mt-10"
        placeholder="Email"
        onChange={onChangeId}
        value={email}
      ></Input>
      <Input
        className="mt-3"
        type="password"
        placeholder="Password"
        onChange={onChangePw}
        value={password}
      ></Input>
      <Button className="mt-6" buttonName="회원가입"></Button>
    </div>
  );
}

export default SignUp;
