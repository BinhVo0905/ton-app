"use client"
import Media from "@/components/Media";
import { Blog } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { FC } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/apiHelpers";
interface BlogPageProps {

}
const BlogPage: FC<BlogPageProps> = ({ }) => {
    const { data, isLoading } = useCustomQuery<Blog>({
        key: "blogs", id: 1, urlParamsObject: {
            populate: "*"
        }
    });
    if (isLoading) {
        return <></>
    }
    else {
        const blog = data as Blog;
        return <div className="container py-10">
            <div className="mx-60">
                <div className="flex items-center justify-center mt-8 lg:mt-0">
                    <Image
                        src={getStrapiMedia(blog.featuredImage.data.attributes.url) || ""}
                        alt="none provided"
                        className="object-cover w-full h-full rounded-lg overflow-hidden"
                        width={400}
                        height={400}
                    />
                </div>
                <h2 className="text-3xl font-bold text-center my-10">{blog.name}</h2>
                <BlocksRenderer content={blog.content} />
            </div>

        </div>;

    }

}
export default BlogPage;