import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUpIcon, ImageUpIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImgaeUpload = ({
  imageFile,
  setImageFile,
  upLoadImageUrl,
  setUpLoadImageUrl,
  imageLoading,
  setimageLoading,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files?.[0]);
  };

  // const handleClick = (e) => {
  //   inputRef.current.click();
  // };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setImageFile(e.dataTransfer.files?.[0]);
  };
  const handleDeleteFile = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const upLoadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    if (response.data?.success) {
      setUpLoadImageUrl(response.data?.result.url);
      setimageLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) upLoadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="block mb-1 text-sm font-medium mt-7">
        Upload Product Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        // onClick={handleClick}

        className={` ${
          isEditMode ? "opacity-60" : ""
        }  p-4 mt-3 border-2 border-dashed rounded-lg`}
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center h-20 my-3 cursor-pointer`}
          >
            <ImageUpIcon className="w-10 h-10 mb-4 text-muted-foreground " />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-gray-50" />
        ) : (
          <div className="flex items-center justify-center">
            <FileUpIcon className="w-8 h-8 mr-2 text-primary" />
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleDeleteFile}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remote file </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImgaeUpload;
