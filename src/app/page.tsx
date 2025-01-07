// React/NextJS
import Image from "next/image";
import Link from "next/link";

// API
import { getMyImages } from "~/server/queries";

// Clerk
import { SignedOut, SignedIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="flex w-48 flex-col items-center overflow-hidden rounded-lg border border-gray-300 shadow-md"
        >
          <Link href={`/photos/${image.id}`}>
            <div className="relative h-40 w-48">
              <Image
                src={image.url}
                className="rounded-lg object-cover" // Ensures consistent cropping
                fill // Automatically adjusts width/height to the container
                alt={image.name || "Image"} // Fallback alt text
              />
            </div>
          </Link>
          <div className="py-4 text-center text-sm font-medium text-black">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above to see images
        </div>
      </SignedOut>
      <SignedIn>
        {/* <Images /> */}
        <Images />
      </SignedIn>
    </main>
  );
}
