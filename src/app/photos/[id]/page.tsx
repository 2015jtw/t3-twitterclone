import FullPageImageView from "~/components/FullPageImageView";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid id");

  return <FullPageImageView id={idAsNum} />;
}
