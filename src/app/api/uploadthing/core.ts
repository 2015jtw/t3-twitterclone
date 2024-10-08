import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import ratelimit from "~/server/rateLimit";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = auth();

      if (!user.userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User does not have upload permissions.");

      const { success } = await ratelimit.limit(user.userId);

      if (!success) throw new UploadThingError("Rate limit exceeded");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await db
        .insert(images)
        .values({ name: file.name, url: file.url, userId: metadata.userId });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
