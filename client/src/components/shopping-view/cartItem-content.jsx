import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "@/store/shop/cart-slice";

import { useToast } from "@/hooks/use-toast";
import { Toast } from "../ui/toast";

const CartItemContent = ({ cartItems }) => {
  console.log("🚀 ~ CartItemContent ~ cartItems:", cartItems);

  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleDeleteCart = (getCartItems) => {
    dispatch(
      deleteCart({ userId: user?.id, productId: getCartItems?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        Toast({
          title: "delete thanh cong",
        });
      }
    });
  };

  const handleUpdateQuantity = (getCartItems, type) => {
    dispatch(
      updateCart({
        userId: user?.id,
        productId: getCartItems?.productId,
        quantity:
          type === "plus"
            ? getCartItems?.quantity + 1
            : getCartItems?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "update thanfh cong",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="object-cover w-20 h-20 rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold"> {cartItems?.title} </h3>
        <div className="flex items-center mt-1">
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded"
            disabled={cartItems?.quantity === 1}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="p-4">{cartItems?.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded"
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="mb-5 font-normal">
          $
          {(cartItems?.salePrice > 0
            ? cartItems?.quantity * cartItems?.salePrice
            : cartItems?.quantity * cartItems?.price
          ).toFixed(2)}
        </p>
        <Trash2Icon
          onClick={() => handleDeleteCart(cartItems)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartItemContent;
