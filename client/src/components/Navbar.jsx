import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const Navbar = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const getUserData = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/profile`, {
      credentials: "include",
    });
    const userData = await response.json();
    setUserInfo(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_URL}/logout`, {
      credentials: "include",
      method: "POST"
    });
    setUserInfo({});
    getUserData();
    navigate("/auth?mode=login");
  }

  return (
    <nav className="flex items-center justify-between p-10">
      <Link to={"/"} className="font-bold text-2xl">
        Blog.io
      </Link>
      <div className="flex items-center gap-2">
        {Object.keys(userInfo).length !== 0 ? (
          <>
            <Link
              to={"/post-create"}
              className="px-3 py-1 font-medium text-lg border-2 border-black bg-black text-white"
            >
              Create Post
            </Link>
            <button onClick={logout}
              className="px-3 py-1 font-medium text-lg border-2 border-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/auth?mode=login"}
              className="px-3 py-1 font-medium text-lg border-2 border-black"
            >
              Login
            </Link>
            <Link
              to={"/auth?mode=register"}
              className="px-3 py-1 font-medium text-lg border-2 border-black bg-black text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
