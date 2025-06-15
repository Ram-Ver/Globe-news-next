import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { MarkerItem } from "@/typescript/types/AdminMap";
import DeleteModal from "../../Modals/Confirmation";
import MarkerForm from "./MarkerForm";

type Props = {
  marker: MarkerItem;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

const MarkerPopup = ({ marker, onDelete, onEdit }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Marker
        position={marker.position}
        icon={
          marker.iconUrl
            ? L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [30, 40],
                iconAnchor: [15, 40],
              })
            : undefined
        }
      >
        <Popup>
          <div className="mb-2">{marker.title}</div>
          <div className="mb-2">{marker.description}</div>
          <button
            className="bg-blue-500 text-white px-2 py-1 mr-2"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </Popup>
      </Marker>

      {isEditOpen && (
        <MarkerForm marker={marker} onEdit={onEdit} onClose={handleCloseEdit} />
      )}

      {isDeleteOpen && (
        <DeleteModal
          onConfirm={() => {
            onDelete(marker.id);
            handleCloseDelete();
          }}
          onCancel={handleCloseDelete}
          message="Are you sure you want to delete this marker?"
        />
      )}
    </>
  );
};

export default MarkerPopup;
