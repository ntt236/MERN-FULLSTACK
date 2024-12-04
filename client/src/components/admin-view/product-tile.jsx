import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditId,
  setOpenProduct,
  setFormData,
  formData,
  handleDelete,
}) => {
  console.log("🚀 ~ product:", product);
  const handleEdit = () => {
    setCurrentEditId(product?._id);
    setOpenProduct(true);
    setFormData({
      ...product,
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="mt-2 mb-2 text-xl font-bold line-clamp-1 ">
            {product?.title}
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
