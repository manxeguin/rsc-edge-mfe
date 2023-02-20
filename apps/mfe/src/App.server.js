import React from "react";
import Footer from "./Footer.server";
import HeroImageGallery from "./HeroImageGallery.server";
import ProductList from "./ProductList.server";

export default function App({ selectedId, isEditing, searchText }) {
  return (
    <div>
      {/* <HeroSection /> */}
      <HeroImageGallery />
      <ProductList />
      <Footer />
    </div>
  );
}
