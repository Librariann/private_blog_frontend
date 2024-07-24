"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "@/components/button";
import { useForm } from "react-hook-form";

type postingProps = {
  posting: string;
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

function PostWrite() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<postingProps>({
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log(md);
  };

  const [md, setMd] = useState<string | undefined>("");
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDEditor value={md} onChange={setMd} autoFocus={true} height={800} />
        <Button
          canClick={isValid}
          loading={false}
          actionText="게시물 생성"
        ></Button>
      </form>
    </div>
  );
}

export default PostWrite;
