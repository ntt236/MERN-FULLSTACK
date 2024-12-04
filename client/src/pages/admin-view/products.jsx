import ProductImgaeUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  price: "",
  brand: "",
  category: "",
  totalStock: "",
  salePrice: "",
};
const AdminProducts = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [upLoadImageUrl, setUpLoadImageUrl] = useState("");
  const [imageLoading, setimageLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { toast } = useToast();

  const { productList } = useSelector((state) => state.adminProducts);
  console.log(
    "🚀 ~ AdminProducts ~ productList:",
    productList,
    imageFile,
    upLoadImageUrl
  );

  const dispatch = useDispatch();

  // const handleCloseSheet = () => {
  //   setOpenProduct(false);
  //   setImageFile(null); // Reset image về null
  //   setFormData(initialFormData); // Reset form về giá trị ban đầu
  // };
  const onSubmit = (e) => {
    e.preventDefault();

    currentEditId !== null
      ? dispatch(
          editProduct({
            id: currentEditId,
            formData,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setFormData(initialFormData);
            setOpenProduct(false);
            toast({
              title: "Sửa sản phẩm thành công",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: upLoadImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenProduct(false);
            toast({
              title: "Thêm sản phẩm thành công",
            });
          }
        });
  };

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllProduct());
      }
    });
  };

  return (
    <Fragment>
      <div className="flex justify-start w-full mb-9">
        <Button onClick={() => setOpenProduct(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem?._id}
                setFormData={setFormData}
                setOpenProduct={setOpenProduct}
                product={productItem}
                setCurrentEditId={setCurrentEditId}
                formData={formData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openProduct}
          onOpenChange={() => {
            setOpenProduct(false);
            setCurrentEditId(null);
            setFormData(initialFormData); // Reset form khi đóng
          }}
        >
          <SheetContent size="left" className="overflow-auto">
            <SheetHeader>
              <SheetTitle className="text-center">
                {currentEditId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            <ProductImgaeUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              upLoadImageUrl={upLoadImageUrl}
              setUpLoadImageUrl={setUpLoadImageUrl}
              imageLoading={imageLoading}
              setimageLoading={setimageLoading}
              isEditMode={currentEditId !== null}
            />

            <div className="py-6">
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={currentEditId ? "Edit Product" : "Add New Product"}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
