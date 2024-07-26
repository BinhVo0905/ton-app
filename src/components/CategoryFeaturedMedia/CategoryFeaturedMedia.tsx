"use client";

import React, { FC } from "react";
import { Category } from "@/data/types";

import ImagesSlider from "./ImagesSlider";

export interface CategoryFeaturedMediaProps {
  className?: string;
  category: Category;
  isHover?: boolean;
}

const CategoryFeaturedMedia: FC<CategoryFeaturedMediaProps> = ({
  className = "w-full h-full",
  category,
  isHover = false,
}) => {
  const { featuredApp, id, href } =
    category;
  const images = featuredApp.data.map(app => app.attributes.logo.data);

  const renderGallerySlider = () => {
    console.log(images);
    if (!images) return null;
    console.log("haha")
    return (
      <ImagesSlider
        href={href}
        imgsSlider={images}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    return renderGallerySlider();
  };

  return (
    <div className={`nc-CategoryFeaturedMedia relative ${className}`}>
      {renderContent()}

    </div>
  );
};

export default CategoryFeaturedMedia;
