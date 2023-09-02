import process from "process";

const fetcherImagePost = async <T extends object>(
  url: string,
  data: FormData,
): Promise<Response> => {
  return await fetch(url, {
    method: "POST",
    body: data,
  }).then((res) => res.json());
};

const ImageUploadPost = async (data: FormData) => {
  const cloudName = process.env.NEXT_IMAGE_CLOUD_NAME;
  return fetcherImagePost(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data,
  );
};

export const handleImageUpload = (callback: (imageVal: string) => void) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    const file = input.files[0];
    const formData = new FormData();

    if (file.size > 1024 * 1024) {
      alert("file size cannot exceed 1mb");
      return;
    }

    if (/^image\//.test(file.type)) {
      formData.append("file", file);
      formData.append("upload_preset", "soullink_user");

      const res = await ImageUploadPost(formData).then((res) => {
        return res.url;
      });
      callback(res);
    } else {
      alert("Image Upload Error");
      return null;
    }
  };
};
