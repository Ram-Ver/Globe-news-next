import { MarkerItem } from "@/typescript/types/AdminMap";
import MarkerPopup from "./MarkerPopup";

type Props = {
  markers: MarkerItem[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

export default function MarkerList({ markers, onDelete, onEdit }: Props) {
  return (
    <>
      {markers.map((marker) => (
        <MarkerPopup
          key={marker.id}
          marker={marker}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}
