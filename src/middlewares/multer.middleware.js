import multer from "multer";

const storage = multer.diskStorage({
  // Setting the destination where the files will be stored
  destination: function (req, file, cb) {
    // Call the callback function with `null` for error and the destination directory
    cb(null, "./public/temp");
  },
  // Setting the filename for the stored file
  filename: function (req, file, cb) {
    // Generate a unique suffix using the current timestamp and a random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Call the callback function with `null` for error and the new filename
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Create a Multer instance with the specified storage configuration
export const upload = multer(
    { storage: storage }
);
