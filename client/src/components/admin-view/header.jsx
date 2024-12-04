import React from "react";
import { Button } from "../ui/button";
import { LogOutIcon, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="lg:hidden sm:block"
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1">
        <Button
          onClick={() => handleLogout()}
          className="inline-flex items-center gap-2 px-4 text-sm font-medium rounded-md shadow "
        >
          <LogOutIcon />
          LogOut
        </Button>
      </div>
    </header>
  );
};
export default AdminHeader;
