import { Link, useNavigate, useParams } from "react-router-dom";
import BackIcon from "../icons/BackIcon";
import { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../contexts/UserContext";

const DetailPage = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const params = useParams();

  const getPost = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/post/${params.id}`
    );
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const postDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/post-delete/${params.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      alert("Success!");
      navigate("/");
    } else {
      alert("Fail!");
    }
  };

  const { title, author, createdAt, imageUrl, _id, content } = post;

  return (
    <section>
      <div className=" flex items-center justify-between">
        <div>
          <h1 className=" text-3xl font-medium">{title}</h1>
          <p className=" text-sm my-2 font-medium text-gray-500">
            {author?.username} |{" "}
            <span>
              {createdAt
                ? formatISO9075(new Date(createdAt), { representation: "date" })
                : ""}
            </span>
          </p>
        </div>
        <Link to={"/"}>
          <BackIcon />
        </Link>
      </div>
      <img src={imageUrl} alt={title} className=" w-full" />
      <div
        className=" font-medium text-gray-700 my-3"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {author?._id === userInfo?.user_id && (
        <div className="flex items-center gap-2 justify-end">
          <Link
            to={`/post-edit/${_id}`}
            className="px-3 py-1 font-medium text-lg border-2 border-blue-500 text-blue-500"
          >
            Edit
          </Link>
          <button
            className="px-3 py-1 font-medium text-lg border-2 border-red-500 bg-red-500 text-white"
            onClick={postDelete}
          >
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default DetailPage;
