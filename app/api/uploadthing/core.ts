import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create an instance of Uploadthing
const f = createUploadthing();

// Define FileRouter without middleware
export const ourFileRouter = {
  // Define routes with no middleware
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    // Code runs after the upload completes
    console.log("File uploaded:", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
