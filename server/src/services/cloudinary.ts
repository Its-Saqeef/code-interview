import { v2 as cloudinary } from 'cloudinary'

export async function CloudinaryUpload(file: string) {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })

        const uploadResult = await cloudinary.uploader.upload(file, {
            folder: "code-interview",
            resource_type: "auto",
        });

        return uploadResult;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }


}