import { getImage } from "~/server/queries";
import Image from "next/image";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid id");
  const image = await getImage(idAsNum);
  return <Image src={image.url} alt={image.name} width={192} height={192} />;
}
