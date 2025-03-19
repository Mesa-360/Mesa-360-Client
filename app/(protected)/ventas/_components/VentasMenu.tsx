import React from "react";
import { CalendarSearch } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useVentas } from "@/hooks/useVentas";
import DailyFilter from "./DailyFilter";
import { VentasFilter } from "./VentasFilter";
import Rangefilter from "./Rangefilter";

export const filterOptions = [
  { id: 1, label: "Diario" },
  { id: 2, label: "Rango" },
];

export default function VentasMenu() {
  const {
    totalFacturation,
    totalPeople,
    avaragePerPeople,
    sortedOrders,
    rangeFilter,
    setRangeFilter,
  } = useVentas();

  return (
    <div className="border p-2 rounded-lg shadow-sm ">
      <h1 className="text-center p-2 text-xl bg-chart-1 text-white rounded-sm font-bold">
        Ver Facturación y Ventas
      </h1>
      <div className="flex p-2 gap-5 items-center justify-between ">
        <CalendarSearch className="min-w-8" />
        <VentasFilter
          options={filterOptions}
          select={setRangeFilter}
          today={rangeFilter}
        />
        {rangeFilter === 1 ? <DailyFilter /> : <Rangefilter />}
      </div>
      {sortedOrders.length > 0 && (
        <div className="my-5 flex justify-evenly items-center gap-5 text-center">
          <div>
            <p className="text-xl  font-bold  text-chart-1 px-3 py-2 ">
              Personas:
            </p>
            <span className="text-gray-500 font-normal"> {totalPeople}</span>
          </div>

          <div>
            <p className="text-xl  font-bold  text-chart-1 px-3 py-2 ">
              Promedio por Persona:{" "}
            </p>
            <span className="text-gray-500 font-normal">
              {" "}
              ${formatNumber(avaragePerPeople)}{" "}
            </span>
          </div>
          <div>
            <p className="text-xl  font-bold  text-chart-1 px-3 py-2 ">
              Facturación Total:
            </p>
            <span className="text-gray-500 font-normal">
              {" "}
              ${formatNumber(totalFacturation)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
