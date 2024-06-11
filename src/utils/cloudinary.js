import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary

    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" },
      function (error, result) {
        console.log(result);
      }
    );

    console.log(" file uplaoded to cloudinary ", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);// removes the file from the localfile path if any error happened.
    return null;
  }
};


export {uploadCloudinary} 
// read more on cloudinary.

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

