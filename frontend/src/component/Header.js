import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // if you want the image display image for login icon then first of all use selector for get the data from the redux;
  const userData = useSelector((state) => state.user);
  console.log(userData.email);

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logout Successfully");
  };

  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:4 z-50 bg-white">
      {/* decstop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} alt="Logo Image" className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:tex-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-m text-sm text-center">
              0
            </div>
          </div>
          <div className=" text-slate-600 " onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer h-8 w-8 rounded-full overflow-hidden drop-shadow">
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" />
              ) : (
                <BiUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer hover:text-white px-2 hover:bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"Login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
