"use client";

import { useDraggable } from "@dnd-kit/core";
import { Table } from "@/types/tables";

interface TableCardProps {
  table: Table;
  size: number;
  onClick?: () => void;
}

const TableCard = ({ table, size, onClick }: TableCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table._id,
  });

  const handleBgColor = (status: string) => {
    if (status == "Occupied") {
      return "bg-chart-2";
    }
    if (status == "Billing") {
      return "bg-chart-4";
    }
    return "bg-white";
  };

  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      style={{
        transform: `translate(${table.x + (transform?.x || 0)}px, ${table.y + (transform?.y || 0)}px)`,
        position: "absolute",
        cursor: "grab",
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`${handleBgColor(table.status)} flex items-center justify-center shadow-lg border rounded-lg`}
    >
      <span
        className={`flex items-center justify-center text-xl font-bold ${table.status != "Free" && "text-white"}`}
      >
        {table.number}
      </span>
    </article>
  );
};

export default TableCard;
