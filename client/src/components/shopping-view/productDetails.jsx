import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  console.log("🚀 ~ ProductDetailsDialog ~ productDetails:", productDetails);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAddToCart = (getCurrentProductId) => {
    console.log(
      "🚀 ~ handleAddToCart ~ getCurrentProductId:",
      getCurrentProductId
    );
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCart(user?.id));
        toast({
          title: "Thêm sản phẩm giỏ hàng thành công",
        });
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[70vw] lg:max-w-[60vw]">
        <div className="relative overflow-hidden rounded-lg ">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="object-cover w-full aspect-square"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold ">{productDetails?.title}</h1>
            <p className="py-5 overflow-auto text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between py-5">
            <p
              className={` font-bold text-lg ${
                productDetails?.salePrice > 0
                  ? "line-through text-muted-foreground font-normal"
                  : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-lg font-bold ">${productDetails?.salePrice}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-1 py-3">
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <span className="text-muted-foreground">(5)</span>
          </div>
          <div>
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to cart
            </Button>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <h2 className="py-3 text-xl font-bold">Review</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-6 h-6 border">
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-normal"> NTrieu</h3>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                  </div>
                  <p>Sản phẩm xấu </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 py-2">
              <Input placeholder="Mời bạn đánh giá" />
              <Button>Đánh giá</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
