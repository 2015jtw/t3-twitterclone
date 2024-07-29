import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/ead1c6d2-8ac4-4d3e-9b5e-792d0c13a1a2-uqe41n.jpg",
  "https://utfs.io/f/d71ee404-848d-4f25-b85f-88f646cb3c29-1nqriq.png",
  "https://utfs.io/f/32a4d0fe-36aa-4cb7-b0c8-28e4aaa82ab0-rv87ai.webp",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48 p-4">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      <h1>TEST...</h1>
    </main>
  );
}
