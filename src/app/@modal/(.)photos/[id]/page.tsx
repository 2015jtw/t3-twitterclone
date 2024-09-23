import { Modal } from "./modal";
import FullPageImageView from "~/components/FullPageImageView";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid id");

  return (
    <Modal>
      <FullPageImageView id={idAsNum} />
    </Modal>
  );
}
