/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = ({ uiTitle, uiBtnText, isEditMode }) => {
  const navigate = useNavigate();

  const params = useParams();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const getOldData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/edit-post/${params.id}`
    );
    const data = await response.json();
    const { title, imageUrl, content, author } = data;
    setTitle(title);
    setImageUrl(imageUrl);
    setContent(content);
    setAuthorId(author);
  };

  useEffect(() => {
    if (isEditMode) {
      getOldData();
    }
  }, []);

  const uploadPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    formData.append("content", content);
    formData.append("authorId", authorId);

    let fetchUrl = `${import.meta.env.VITE_URL}/upload`;
    let method = "POST";

    if (isEditMode) {
      fetchUrl = `${import.meta.env.VITE_URL}/update-post`;
      method = "PUT";
      formData.append("id", params.id);
    }

    const response = await fetch(fetchUrl, {
      method,
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      alert("Success!");
      navigate("/");
    } else {
      alert(response.statusText);
    }
  };

  return (
    <>
      <section className=" mx-auto">
        <h1 className=" text-center font-bold text-2xl">{uiTitle}</h1>
        <form onSubmit={uploadPost} method="post">
          <div className="mb-4">
            <label htmlFor="title" className="font-medium">
              Enter title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="block border border-black text-lg p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="font-medium">
              Upload cover photo url
            </label>
            <input
              type="text"
              name="image"
              id="image"
              required
              className="block border border-black text-lg p-2 w-full"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className=" mb-4">
            <label htmlFor="" className="font-medium">
              Description
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className=" h-44"
              value={content}
              onChange={setContent}
            />
          </div>

          <button className=" text-white font-medium text-lg text-center bg-black py-4 w-full mt-16 mb-5">
            {uiBtnText}
          </button>
        </form>
      </section>
    </>
  );
};

export default PostForm;
