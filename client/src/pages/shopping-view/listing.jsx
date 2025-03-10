import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/productDetails";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCart } from "@/store/shop/cart-slice";
import {
  fetchFilterProduct,
  fetchProductDetails,
} from "@/store/shop/product-slice";

import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ShoppingListing = () => {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({}); // Default sort
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();

  // các hàm lấy state bên redux
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ ShoppingListing ~ user:", user);

  const categorySearchParam = searchParams.get("category");
  // Hàm xử lý việc chọn sắp xếp
  const handleSort = (value) => {
    setSort(value);
  };

  // Hàm xử lý lọc sản phẩm
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filter }; // Sao chép trạng thái filter hiện tại
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      // Nếu không tồn tại section trong filter, thêm section mới
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      // Nếu tùy chọn đã tồn tại, xóa nó khỏi danh sách
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // Hàm tạo query string từ filter params
  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    console.log(queryParams, "queryParams");
    return queryParams.join("&");
  }

  // hàm lấy chi tiết sản phẩm
  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));

    setOpenDetails(true);
    // làm như này để tránh trường hợp khi qua lại các page thì nó chạy useeffect lấy productDetails ra
    //  và làm cho bảng hiện lên
  };
  // làm như trên thay vì để useeffect chỗ nàynày
  // useEffect(() => {
  //   if (productDetails !== null) {
  //     setOpenDetails(true);
  //   }
  // }, [productDetails]);

  //hàm thêm sản phẩm
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

  // Gửi request khi filter hoặc sort thay đổi
  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(fetchFilterProduct({ filterParams: filter, sortParams: sort }));
  }, [dispatch, sort, filter]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6">
      <ProductFilter handleFilter={handleFilter} filter={filter} />
      <div className="w-full rounded-lg shadow-sm bg-background">
        <div className="flex items-center justify-between border-b">
          <h2 className="p-4 text-lg font-bold">All Product</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <ArrowUpDownIcon className="w-6 h-6" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 cursor-pointer sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  key={productItem._id}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetails}
        setOpen={setOpenDetails}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingListing;
