"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Application, TaxonomyType, Token } from "@/data/types";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CardApplication from "../CardApplication/CardApplication";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { formatNumber } from "@/utils/convertNumbThousand";
import Image from "next/image";
import TableTokens from "../TableTokens/TableTokens";


export interface SectionAppsOfCategoryProps {
  className?: string;
  heading: string;
  subHeading: string;
  applications: Application[];
  headingIsCenter?: boolean;
  gridClass?: string;
  tokens?: Token[];
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
      {heading === "Jettons" ? <TableTokens perPage={3} /> : <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {applications.map((item, index) => {
          const topIndex = index < 3 ? `#${index + 1}` : undefined;
          return <CardApplication key={index} app={item} />;
        })}
      </div>}


    </div>
  );
};

export default SectionAppsOfCategory;
