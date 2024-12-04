import { HousePlus, LogOut, Menu, ShoppingBag, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItem } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCart } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// MenuItems component to display navigation items in header
const MenuItems = () => {
  // Để điều hướng trang
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col gap-6 mb-4 lg:mb-0 lg:items-center lg:flex-row">
      {shoppingViewHeaderMenuItem.map((menuItem) => (
        <Label
          key={menuItem.id}
          className="text-lg font-normal cursor-pointer"
          onClick={() => handleNavigate(menuItem)} // Attach navigation logic
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

// HeaderRightContent component for cart and user dropdown
const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/shop/home"); // Redirect to home after logout
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user?.id)); // Fetch cart when user is logged in
    }
  }, [dispatch, user]);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems?.items?.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
      {/* Cart button to open cart */}
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button
          onClick={() => setOpenCart(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[0px] flex items-center justify-center h-4 w-4 text-white font-bold text-sm rounded-full bg-red-500">
            {totalQuantity || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet> */}

      {/* User avatar and dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="font-extrabold text-white bg-black">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Account page link */}
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserRound className="w-6 h-6 mr-2 " />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout button */}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-6 h-6 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Main ShoppingHeader component
const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-8 md:px-8">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlus className="w-6 h-6 " />
          <span className="font-bold">SHOP....</span>
        </Link>

        {/* Mobile menu toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6 " />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs ">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <div className="hidden lg:block ">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
