'use client'
import CardApplication from "@/components/CardApplication/CardApplication";
import { Application, Category, DataResponse } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import { usePathname } from "next/navigation";
const CategoryPage = () => {
    const pathname = usePathname();
    const { data, isLoading } = useCustomQuery<Category>({
        key: "categories", urlParamsObject: {
            filters: {
                href: {
                    $eq: pathname,
                },
            },
            populate: {
                applications: {
                    populate: {
                        logo: { fields: ["url"] }
                    }
                }
            }
        }
    });
    if (isLoading) {
        return <></>;
    }
    else {
        const category = (data as Category[])![0];
        const appData = category.applications.data as DataResponse<Application>[];
        const applications = retrieveDataFromResponse<Application>(appData);
        return (
            <div className="container py-20">
                <div className="py-10">
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold`}>
                        {category.name}
                    </h2>
                    <div className="text-sm my-3 text-neutral-500 w-2/3">{category.description}</div>
                </div>
                <div className={`grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3`}>
                    {applications.map((item, index) => {
                        return <CardApplication key={index} app={item} />;
                    })}
                </div>
            </div>
        );
    }


}
export default CategoryPage;