'use client'
import { ReviewsApi } from "@/apis/ReviewsApi";
import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import SingleCommentLists from "@/app/(singles)/SingleCommentLists";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Media from "@/components/Media";
import MySlider from "@/components/MySlider";
import { Application, DataResponse, Review, ReviewFormData } from "@/data/types";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { getStrapiMedia } from "@/utils/apiHelpers";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MutableRefObject, useRef } from "react";
import { Rating } from "@mui/material";
const ApplicationPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { mutate } = useCustomMutation({ key: "reviews", type: "create", queryKey: "applications" })

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
    const handleSubmit = () => {
        const content = textareaRef.current?.value || "";
        const data: ReviewFormData = {
            content,
            author: 1,
            application: Number(id)
        }
        mutate({ data });
        if (textareaRef.current !== null) {
            textareaRef.current.value = ""
        }




    }

    if (isLoading) {
        return <></>;
    }
    else {
        const app = data as Application;
        const reviews = retrieveDataFromResponse(app.reviews ? app.reviews.data : []);
        return (<div className="relative">
            <div className="container relative">
                <div className="py-4 flex md:flex-row flex-col justify-between">
                    <div className="flex flex-row">
                        <div className=" md:w-28 md:h-28 w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden">
                            <Image
                                fill
                                className="object-cover"
                                alt=""
                                sizes="(max-width: 600px) 30vw, 40vw"
                                src={getStrapiMedia(app.logo.data.attributes.url) || ""}
                                unoptimized={true}
                            />
                        </div>
                        <div className="ml-10">
                            <h3 className="font-semibold md:text-2xl text-lg">{app.name}</h3>
                            <p className="text-neutral-500 md:text-base text-sm py-2">{app.subTitle}</p>
                            <div className="flex items-center">
                                <span className="md:text-2xl text-lg font-semibold">{app.rating}</span>
                                <Rating
                                    value={app.rating}
                                    precision={0.01}
                                    size="small"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex h-20 md:w-auto w-full">
                        <ButtonPrimary className="mt-8 w-full">Open app</ButtonPrimary>
                    </div>
                </div>
                <MySlider
                    className="py-10"
                    data={app.sliderImages.data || []}
                    renderItem={(item, indx) => <Media key={indx} data={item} />}
                    itemPerRow={5}
                />
                <div className="body">
                    
                </div>
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
                    <SingleCommentForm
                        textareaRef={textareaRef}
                        onClickSubmit={handleSubmit} />
                </div>
                <div className="max-w-screen-md mt-10">
                    <SingleCommentLists reviews={reviews} />
                </div>
            </div>

        </div>);
    }


}
export default ApplicationPage;