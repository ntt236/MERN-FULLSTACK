import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  Footprints,
  Shirt,
  Umbrella,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilterProduct,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/productDetails";

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log("🚀 ~ ShoppingHome ~ productList:", productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slides = [banner1, banner2];
  // const categories = [
  //   { id: "men", label: "Men", icon: Shirt },
  //   { id: "women", label: "Women", icon: CloudLightning },
  //   { id: "kids", label: "Kids", icon: Baby },
  //   { id: "accessories", label: "Accessories", icon: Watch },
  //   { id: "footwear", label: "Footwear", icon: Umbrella },
  // ];
  const brandWithIcon = [
    { id: "nike", label: "Nike", icon: Footprints },
    { id: "adidas", label: "Adidas", icon: Footprints },
    { id: "puma", label: "Puma", icon: Footprints },
    { id: "levi", label: "Levi's", icon: Footprints },
    { id: "zara", label: "Zara", icon: Footprints },
    { id: "h&m", label: "H&M", icon: Footprints },
  ];

  const handleNavigate = (getCurrentItem, section) => {
    sessionStorage.clear(); // Clear previous filters
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // Navigate to the listing page with query parameters for filtering
    navigate(`/shop/listing?${section}=${getCurrentItem.id}`);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    console.log(
      "🚀 ~ handleGetProductDetails ~ getCurrentProductId:",
      getCurrentProductId
    );
    dispatch(fetchProductDetails(getCurrentProductId));
    setOpenDetails(true);
  };

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(
          fetchFilterProduct({
            filterParams: {}, // Truyền object rỗng thay vì null
            sortParams: "price-lowtohigh",
          })
        );
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            alt={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute transform -translate-y-1/2 bg-white top-1/2 left-4"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute transform -translate-y-1/2 bg-white top-1/2 right-4"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            MUA SẮP THEO LOẠI
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((categoryItems) => (
              <Card
                onClick={() => handleNavigate(categoryItems, "category")}
                className="transition-shadow cursor-pointer hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItems.icon className="w-12 h-12 text-primary" />
                  <span>{categoryItems.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Brand Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            MUA SẮM THEO THƯƠNG HIỆU
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandWithIcon.map((brandItems) => (
              <Card
                onClick={() => handleNavigate(brandItems, "brand")}
                className="transition-shadow cursor-pointer hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItems.icon className="w-12 h-12 text-primary" />
                  <span>{brandItems.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            SẢN PHẨM ĐẶC TRƯNG
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((productItems) => (
                <ShoppingProductTile
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItems}
                  key={productItems._id}
                />
              ))
            : null}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetails}
        setOpen={setOpenDetails}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
