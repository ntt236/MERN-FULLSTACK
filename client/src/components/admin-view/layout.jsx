import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex w-full min-h-screen">
      {/* Admin sidebar */}
      <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-col flex-1">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex flex-col flex-1 p-10 bg-muted/40 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
