const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const uploadImage = async (imgPath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const options = {
    use_filename: true,
    unique_filename: false,
    folder: "Hermes",
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imgPath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;
