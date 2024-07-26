
"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Blog } from "@/data/types";
import Link from "next/link";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export interface SectionBlogProps {
  className?: string;
  heading: string;

  blogs: Blog[];
  headingIsCenter?: boolean;

}

const SectionBlog: FC<SectionBlogProps> = ({
  heading,

  className = "",
  blogs,
  headingIsCenter = false,
}) => {

  return (
    <div className={`nc-SectionBlog bg-white rounded-xl ${className}`}>
      <div className={`flex justify-between`}>
        <Heading desc={""} isCenter={headingIsCenter}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          < Button className="!hidden md:!flex " pattern="secondary" sizeClass="px-6">
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>
      </div>
      <div className={`flex flex-column`}>
        {blogs.map((item, index) => {

          return <Link href={`/blog/${item.id}`} key={index} className="flex flex-row items-center">
            
              <Image className="rounded-xl" width={40} height={40} alt="" src="/tonImage.jfif" />
          
            <h2 className="ml-4">{item.name}</h2>
          </Link>
        })}
      </div>
    </div>
  );
};

export default SectionBlog;
