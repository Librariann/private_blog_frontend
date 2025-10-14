// 이미지를 서버에 업로드하는 함수
export async function uploadImageToServer(file: File): Promise<string> {
  const uploadUri = process.env.NEXT_PUBLIC_FILE_UPLOAD_URI;

  if (!uploadUri) {
    throw new Error("Upload server URL is not configured");
  }

  const form = new FormData();
  form.append("file", file);

  try {
    console.log("Uploading to:", uploadUri);

    const res = await fetch(uploadUri, {
      method: "POST",
      body: form,
      // Don't set Content-Type header - let browser set it with boundary for FormData
    });

    console.log("Upload response status:", res.status);
    console.log(
      "Upload response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Upload error response:", errorText);

      if (res.status === 404) {
        throw new Error(
          "Upload server is not available (404). Please check server status."
        );
      } else if (res.status === 0 || res.status === undefined) {
        throw new Error(
          "Network error or CORS issue. Please check server configuration."
        );
      } else {
        throw new Error(
          `Upload failed with status ${res.status}: ${errorText}`
        );
      }
    }

    const result = await res.json();
    console.log("Upload successful:", result);
    return result.url as string;
  } catch (error) {
    console.error("Image upload error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to connect to upload server. Please check your internet connection and server status."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown upload error occurred. Please try again.");
  }
}
