import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const admintSideBarMenuItem = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8 ">
      {admintSideBarMenuItem.map((item) => (
        <div
          onClick={() => {
            setOpen(false);
            navigate(item.path);
          }}
          key={item.id}
          className="flex items-center gap-2 px-3 py-5 border-b-2 cursor-pointer hover:bg-muted hover:text-foreground text-muted-foreground"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b sm:items-center">
              <SheetTitle className="flex gap-2 pb-3 ">
                <ChartNoAxesCombined size={25} />
                <span className="text-xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="flex-col hidden w-64 p-4 border-r bg-background lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center justify-center gap-2 pb-4 border-b cursor-pointer"
        >
          <ChartNoAxesCombined size={25} />
          <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
