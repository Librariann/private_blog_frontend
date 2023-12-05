import { useState } from "react";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">LOGIN</h1>
      <input
        type="text"
        className="mt-14 border md:text-2xl"
        placeholder="Username"
        onChange={onChangeId}
        value={username}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        className="mt-3 border md:text-2xl"
        onChange={onChangePw}
        value={password}
      />
      <Link href="/">
        <button className="p-2 mt-7">LOGIN</button>
      </Link>
      <div>
        <Link href="join">회원가입</Link>
      </div>
    </div>
  );
}

export default Login;
