import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, idx) => (
          <div key={image.id + "-" + idx} className="flex w-48 flex-col p-4">
            <img src={image.url} alt="image" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
