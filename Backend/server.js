import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";
const PORT = process.env.PORT || 5500;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
