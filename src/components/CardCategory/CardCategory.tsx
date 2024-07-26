"use client";
import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { Category, PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import PostCardMetaV2 from "@/components/PostCardMeta/PostCardMetaV2";
import Link from "next/link";
import CategoryFeaturedMedia from "../CategoryFeaturedMedia/CategoryFeaturedMedia";

export interface CardCategoryProps {
  className?: string;
  category: Category;
}

const CardCategory: FC<CardCategoryProps> = ({ className = "h-full", category }) => {
  const { href, } = category;
  const [isHover, setIsHover] = useState(false);
  
  return (
    <div
      className={`nc-CardCategory relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={href} className="absolute inset-0" />
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <CategoryFeaturedMedia category={category} isHover={isHover} />
        </div>

        <Link
          href={href}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link>
      </div>
      <div className="space-y-2.5 rtl:space-x-reverse mt-4">
        <h2 className={`block font-semibold`}>
          {category.name}
        </h2>
        <h2 className={`text-sm`}>
          {category.subTitle}
        </h2>
      </div>
    </div>
  );
};

export default CardCategory;
