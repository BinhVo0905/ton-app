"use client"
import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import SectionMagazine2 from "@/components/Sections/SectionMagazine2";
import SectionSliderExplorer from "@/components/SectionSliderExplore/SectionSliderExplore";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Application, Blog, Category, DataResponse } from "@/data/types";
import SectionAppsOfCategory from "@/components/SectionAppsOfCategory/SectionAppsOfCategory";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import SectionBlog from "@/components/SectionBlog/SectionBlog";
import StatisticCard from "@/components/StatisticCard/StatisticCard";
import { useQuery } from "@tanstack/react-query";
import { TokensApi } from "@/apis/tokensApi";
import MySlider from "@/components/MySlider";
import PromotedApp from "@/components/PromotedApp/PromotedApp";



//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//
const PageHome = ({ }) => {
  const { data: categories } = useCustomQuery<Category>({
    key: "categories",
    urlParamsObject: {
      populate: {
        applications: {
          populate: {
            logo: { fields: ["url"] }
          }
        }
      }
    }
  });
  const { data: blogs } = useCustomQuery<Blog>({
    key: "blogs",
  });
  const { data: tonData } = useQuery({ queryKey: ["tonData"], queryFn: () => TokensApi.getById("the-open-network") });
  const { data: promotedApp } = useCustomQuery({
    key: "applications", urlParamsObject: {
      filters: {
        href: {
          $contains: "empty"
        }
      },
      populate: {
        logo: { fields: ["url"] }
      }
    }
  })
  return (
    <div className="nc-PageHome relative">
      <div className="container relative">
        {/* <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={DEMO_POSTS?.filter((_, i) => i < 3)}
        /> */}
        <SectionSliderExplorer
          className="pt-10"
          heading="Explore 991 apps in TON Ecosystem"
          categories={categories as Category[] || []}
        />
        <div className="flex flex-col md:gap-4 gap-2"> 
        <SectionBlog
          className="mt-10 p-5"
          heading="News"
          blogs={blogs as Blog[] || []}
        />
        <div className="flex lg:flex-row flex-col lg:gap-4 gap-2">
          <div className="lg:flex-1 bg-white rounded-xl p-4 flex flex-row items-center">
            <h2 className="md:text-base text-sm whitespace-nowrap font-semibold">Promoted Apps</h2>
            <MySlider className="px-4 overflow-hidden lg:overflow-visible" data={promotedApp as Application[] || []} itemPerRow={5} renderItem={(item, index) => <PromotedApp application={item} key={index} />} />
          </div>
          {tonData && <div className="lg:flex-1 flex lg:gap-4 gap-2">
            <div className="flex-1">
              <StatisticCard value={tonData.market_data.current_price.usd || 0} changedValue={3.4} title="Toncoin" />
            </div>
            <div className="flex-1">
              <StatisticCard value={tonData.market_data.market_cap.usd || 0} changedValue={3.4} title="Market Cap" />
            </div>
          </div>
          }
        </div>
        </div>
        {(categories as Category[] || []).map((category, index) => {
          const appData = category.applications.data as DataResponse<Application>[];
          return <SectionAppsOfCategory
            key={index}
            className="py-16 "
            heading={category.name}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
            subHeading={category.subTitle}
            applications={retrieveDataFromResponse<Application>(appData)} />;
        }
        )}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="Say hello to future creator potentials"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div> */}

        <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Top trending topics"
          subHeading="Discover 233 topics"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Explore latest audio articles"
            subHeading="Click on the icon to enjoy the music or podcast 🎧"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
          />
        </div>

        <SectionMagazine1 className="py-16 lg:py-28" posts={MAGAZINE1_POSTS} />

        <SectionAds />

        <SectionMagazine7
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
        />
      </div>

      <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div>

      <div className="container ">
        <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
          />
        </div>

        <SectionGridAuthorBox
          className="py-16 lg:py-28"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionMagazine2
          className="py-16 lg:py-24"
          heading="Life styles 🎨 "
          posts={MAGAZINE2_POSTS}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading="More design articles"
            subHeading="Over 1118 articles "
            posts={DEMO_POSTS.filter(
              (p, i) => i > 3 && i < 25 && p.postType === "standard"
            )}
          />
        </div>

        <SectionSubscribe2 className="pt-16 lg:pt-28" />

        <SectionVideos className="py-16 lg:py-28" />

        <SectionLatestPosts className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default PageHome;
