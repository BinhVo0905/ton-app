'use client'
import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import SingleCommentLists from "@/app/(singles)/SingleCommentLists";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Media from "@/components/Media";
import MySlider from "@/components/MySlider";
import { Application, DataResponse, Review } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { getStrapiMedia } from "@/utils/apiHelpers";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import { filter } from "lodash";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
const ApplicationPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data, isLoading } = useCustomQuery<Application>({
        key: "applications", id: Number(id), urlParamsObject: {
            populate: {
                logo: { fields: ["url"] },
                reviews: {
                    populate: ["author"]
                },
                sliderImages: {
                    fields: ["url"]
                }

            }
        }
    });
    if (isLoading) {
        return <></>;
    }
    else {
        const app = data as Application;
        console.log(app)
        const reviews = retrieveDataFromResponse(app.reviews ? app.reviews.data : []);
        return (<div className="container">
            <div className="py-4 flex flex-row justify-between">
                <div className="flex flex-row">
                    <span className="block flex-shrink-0 relative w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            alt=""
                            sizes="(max-width: 600px) 480px, 800px"
                            src={getStrapiMedia(app.logo.data.attributes.url) || ""}
                        />
                    </span>
                    <div className="whitespace-nowrap ml-10">
                        <h3 className="font-semibold text-2xl">{app.name}</h3>
                        <p className="text-neutral-500">{app.subTitle}</p>
                    </div>
                </div>
                <div className="flex h-20">
                    <ButtonPrimary className="mt-8">Open app</ButtonPrimary>
                </div>
            </div>
            <MySlider
                className="py-10"
                data={app.sliderImages.data || []}
                renderItem={(item, indx) => <Media key={indx} data={item} />}
                itemPerRow={5}
            />
            <div>
                <div className="border-neutral-200 py-6">
                    <h3 className="font-semibold text-xl">Description</h3>
                    <div className="text-neutral-500 text-sm py-3" >{app.description}</div>
                </div>
            </div>
            <div
                id="comments"
                className="scroll-mt-20 max-w-screen-md"
            >
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                    Responses ({reviews.length})
                </h3>
                <SingleCommentForm />
            </div>
            <div className="max-w-screen-md mt-10">
                <SingleCommentLists reviews={reviews} />
            </div>
        </div>);
    }


}
export default ApplicationPage;