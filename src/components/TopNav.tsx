"use client";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import Link from "next/link";

export default function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        <Link href="/">Gallery</Link>
      </div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
