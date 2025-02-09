import React from "react";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum. photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const ProductDetails = () => {
  return (
    <div className=" p-6">
      <div className=" max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className=" flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className=" hidden md:flex flex-col space-y-4 mr-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
