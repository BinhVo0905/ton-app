"use client"
import CardCategory from "@/components/CardCategory/CardCategory";
import Heading1 from "@/components/Heading/Heading1";
import { Category } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { FC } from "react";

interface CategoriesPageProps {
}
const CategoriesPage: FC<CategoriesPageProps> = ({ }) => {
    const { data: categories, isLoading } = useCustomQuery<Category>({
        key: "categories",
        urlParamsObject: {
            populate: {
                featuredApp: {
                    populate: {
                        logo: { fields: ["url"] }
                    }
                }
            }
        }
    });
    if (isLoading) {
        return <></>
    }
    return <div className="container pt-20">
        <Heading1 isCenter={false} desc="Choose a category and find the application you need">Categories</Heading1>
        <div className={`grid gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4`}>
            {(categories as Category[]).map((item, index) => {
                return <CardCategory key={index} category={item} />;
            })}
        </div>
    </div>
}
export default CategoriesPage;