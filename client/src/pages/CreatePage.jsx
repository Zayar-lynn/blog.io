import PostForm from "../components/PostForm";

const CreatePage = () => {
  return (
    <PostForm uiTitle={"Create Form"} uiBtnText={"Upload"} isEditMode={false} />
  );
};

export default CreatePage;
