"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Application, TaxonomyType } from "@/data/types";
import CardCategory3 from "@/components/CardCategory3/CardCategory3";
import CardCategory4 from "@/components/CardCategory4/CardCategory4";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import CardCategory5 from "@/components/CardCategory5/CardCategory5";
import MySlider from "../MySlider";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CardApplication from "../CardApplication/CardApplication";

export interface SectionAppsOfCategoryProps {
  className?: string;
  heading: string;
  subHeading: string;
  applications: Application[];
  headingIsCenter?: boolean;
  gridClass?: string;
}

const SectionAppsOfCategory: FC<SectionAppsOfCategoryProps> = ({
  heading,
  subHeading,
  className = "",
  applications,
  headingIsCenter = false,
  gridClass = "",
}) => {

  return (
    <div className={`nc-SectionAppsOfCategory ${className}`}>
      <div className={`flex justify-between`}>
        <Heading desc={subHeading} isCenter={headingIsCenter}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          < Button className="!hidden md:!flex " pattern="white" sizeClass="px-6">
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>

      </div>

      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {applications.map((item, index) => {
          const topIndex = index < 3 ? `#${index + 1}` : undefined;
          return <CardApplication key={index} index={topIndex} application={item} />;
        })}
      </div>
      <div className="flex mt-20 justify-center items-center">

      </div>
    </div>
  );
};

export default SectionAppsOfCategory;
