/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const PostItem = ({ post }) => {
  const { title, author, createdAt, imageUrl, _id } = post;
  return (
    <>
      <div className=" mb-10">
        <h2 className=" text-3xl font-medium">{title}</h2>
        <p className=" text-sm my-2 font-medium text-gray-500">
          {author.username} |{" "}
          <span>
            {formatISO9075(new Date(createdAt), { representation: "date" })}
          </span>
        </p>
        <img
          src={imageUrl}
          alt={title}
          className=" h-96 w-full object-cover my-3"
        />
        {/* <p className=" font-normal text-gray-600 my-3">
          {content.slice(0, 250)}
        </p> */}
        <Link
          to={`/post/${_id}`}
          className=" bg-black text-white px-4 py-2 text-lg font-medium"
        >
          Read full article
        </Link>
      </div>
    </>
  );
};

export default PostItem;
