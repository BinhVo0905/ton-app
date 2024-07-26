"use client";

import React, { FC } from "react";
import { Application, PostDataType } from "@/data/types";
import Link from "next/link";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import Image from "next/image";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface CardApplicationProps {
  className?: string;
  app: Application;
}

const CardApplication: FC<CardApplicationProps> = ({
  className = "h-full",
  app,
}) => {
  console.log(app)

  const { name, href, subTitle, logo, id } = app;

  const renderDefaultBtnListen = (state?: "playing") => {
    return (
      <div className="inline-flex items-center mt-3 pe-4 py-0.5 hover:ps-0.5 cursor-pointer rounded-full transition-all hover:bg-primary-50 dark:hover:bg-neutral-900">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-neutral-800 text-primary-6000 dark:text-primary-200">
          {state === "playing" ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5 rtl:rotate-180" />
          )}
        </span>

        <span className="ms-3 text-xs sm:text-sm font-medium">
          {state === "playing" ? "Now playing" : "Listen now"}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`nc-CardApplication relative flex group items-center p-3 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="w-1/4 flex-shrink-0">
        <Link
          href={`${href}?id=${id}`}
          className="block h-0 aspect-w-1 aspect-h-1 relative rounded-full overflow-hidden shadow-lg"
        >
          <Image
            className="object-cover w-full h-full"
            src={getStrapiMedia(logo.data.attributes.url) || ""}
            fill
            alt={name}
            sizes="100px"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow ms-4">
        <h2 className={`nc-card-title block font-semibold text-sm sm:text-lg`}>
          <Link
            href={`${href}?id=${id}`}
            className={`line-clamp-1`}
            title={name}
          >
            {name}
          </Link>
        </h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ">
          {subTitle}
        </span>
      </div>
    </div>
  );
};

export default CardApplication;
