import React, { useEffect } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./cartItem-content";
import { Navigate, useNavigate } from "react-router-dom";

const UserCartItems = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate();
  console.log("🚀 ~ UserCartItems ~ cartItems:", cartItems);
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="flex justify-center">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 ">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <CartItemContent cartItems={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4 ">
        <div className="flex justify-between ">
          <span className="font-normal ">Total</span>
          <span className="mb-2 font-normal uppercase">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
        className="w-full mt-4"
      >
        Thanh Toán
      </Button>
    </SheetContent>
  );
};

export default UserCartItems;
