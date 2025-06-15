"use client";
import { useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import DeleteModal from "../Modals/Confirmation";

type Props = {
  polygons: { id: string; points: [number, number][] }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PolygonList({ polygons, onEdit, onDelete }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState("");
  const handleDeleteClick = (polygonId: string) => {
    setIsDeleteOpen(true);
    setId(polygonId);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      {polygons.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={polygon.points}
          pathOptions={{ color: "red" }}
        >
          <Popup>
            <div>
              <div className="mb-2">Polygon</div>
              <button
                className="bg-blue-500 text-white px-2 py-1 mr-2"
                onClick={() => onEdit(polygon.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => handleDeleteClick(polygon.id)}
              >
                Delete
              </button>
            </div>
          </Popup>
        </Polygon>
      ))}

      {isDeleteOpen && (
        <DeleteModal
          onConfirm={() => {
            onDelete(id);
            handleCloseDelete();
          }}
          onCancel={handleCloseDelete}
          message="Are you sure you want to delete this polygon?"
        />
      )}
    </>
  );
}
