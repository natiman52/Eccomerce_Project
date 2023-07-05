import {createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"
export const client =createClient({
    projectId:"s7m4t4w8",
    dataset:"production",
    apiVersion:"2022-03-25",
    useCdn:true,
    token:process.env.NEXT_PUBLIC_TOKEN_SANITY
    
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)