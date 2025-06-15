import { useState } from "react";
import { MarkerItem } from "@/typescript/types/AdminMap";
import CustomModal from "@/components/Modals/Custom";

type MarkerProps = {
  marker: MarkerItem;
  onEdit: (id: string, title: string, description: string) => void;
  onClose: () => void;
};

const MarkerForm = ({ marker, onEdit, onClose }: MarkerProps) => {
  const [title, setTitle] = useState(marker.title);
  const [description, setDescription] = useState(marker.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(marker.id, title, description);
    onClose();
  };

  return (
    <CustomModal title="Edit Marker" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default MarkerForm;
