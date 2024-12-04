import React, { useState } from "react";
import img from "../../assets/banner-2.webp";
import Address from "@/components/shopping-view/address";
import { useSelector, useDispatch } from "react-redux";
import CartItemContent from "@/components/shopping-view/cartItem-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  console.log("🚀 ~ ShoppingCheckout ~ approvalURL:", approvalURL);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  const dispatch = useDispatch();
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  console.log("🚀 ~ ShoppingCheckout ~ cartItems:", cartItems);

  // const handleInitiatePaypalPayment = () => {
  //   const orderData = {
  //     userId: user?.id,
  //     cartId: cartItems?._id,
  //     cartItems: cartItems.items.map((singleCartItem) => ({
  //       productId: singleCartItem?.productId,
  //       title: singleCartItem?.title,
  //       image: singleCartItem?.image,
  //       price:
  //         singleCartItem?.salePrice > 0
  //           ? singleCartItem?.salePrice
  //           : singleCartItem?.price,
  //       quantity: singleCartItem?.quantity,
  //     })),
  //     addressInfo: {
  //       addressId: currentSelectedAddress?._id,
  //       address: currentSelectedAddress?.address,
  //       city: currentSelectedAddress?.city,
  //       pincode: currentSelectedAddress?.pincode,
  //       phone: currentSelectedAddress?.phone,
  //       notes: currentSelectedAddress?.notes,
  //     },
  //     orderStatus: "pending",
  //     paymentMethod: "paypal",
  //     paymentStatus: "pending",
  //     totalAmount: totalCartAmount,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //     paymentId: "",
  //     payerId: "",
  //   };
  //   console.log("🚀 ~ handleInitiatePaypalPayment ~ orderData:", orderData);

  //   dispatch(createNewOrder(orderData)).then((data) => {
  //     console.log(data);
  //     if (data?.payload?.success) {
  //       setIsPaymemntStart(true);
  //     } else {
  //       setIsPaymemntStart(false);
  //     }
  //   });
  //   if (approvalURL) {
  //     window.location.href = approvalURL;
  //   }
  // };
  const handleInitiatePaypalPayment = async () => {
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log("🚀 ~ handleInitiatePaypalPayment ~ orderData:", orderData);

    if (cartItems.length === 0) {
      toast({
        title: "Giỏ hàng trống, vui lòng thêm sản phẩm ",
        variant: "destructive",
      });

      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Vui lòng chọn địa chỉ để tiếp tục thanh toán",
        variant: "destructive",
      });

      return;
    }
    // Chờ đợi phản hồi từ API trước khi chuyển hướng
    const data = await dispatch(createNewOrder(orderData));
    console.log("🚀 ~ handleInitiatePaypalPayment ~ data:", data);

    if (data?.payload?.success && approvalURL) {
      window.location.href = approvalURL;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="object-cover object-center w-full h-full" />
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 mt-5 sm:grid-cols-2">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemContent cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4 ">
            <div className="flex justify-between ">
              <span className="font-normal ">Total</span>
              <span className="mb-2 font-normal uppercase">
                ${totalCartAmount}
              </span>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout with PayPal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
