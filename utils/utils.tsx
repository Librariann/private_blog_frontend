// 이미지를 서버에 업로드하는 함수
export async function uploadImageToServer(file: File): Promise<string> {
  // 예시: presigned URL 있으면 PUT 후 그 URL 반환, 아니면 POST 후 JSON으로 URL 받기
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(process.env.NEXT_PUBLIC_FILE_UPLOAD_URI || "", {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("upload failed");
  const { url } = await res.json(); // 서버가 반환하는 공개 URL
  return url as string;
}
