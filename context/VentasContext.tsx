import { OrderCompleteResponse } from "@/types/orders";
import { createContext, useMemo, useState, useEffect } from "react";

export type Options = {
  id: number;
  label: string;
};

interface InitialValues {
  day: number;
  month: number;
  year: number;
}

interface FilterRange {
  initial: string;
  finish: string;
}

interface ContextType {
  initialValues: InitialValues;
  sortedOrders: OrderCompleteResponse[];
  orders: OrderCompleteResponse[];
  setOrders: React.Dispatch<React.SetStateAction<OrderCompleteResponse[]>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  filteredOrders: OrderCompleteResponse[];
  totalFacturation: number;
  totalPeople: number;
  avaragePerPeople: number;
  initialDate: string;
  filteredRange: FilterRange;
  setFilteredRange: React.Dispatch<React.SetStateAction<FilterRange>>;
  rangeFilter: number;
  setRangeFilter: React.Dispatch<React.SetStateAction<number>>;
  selectedOrder: string | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string | null>>;
}

export const VentasContext = createContext<ContextType | undefined>(undefined);

export const VentasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const now = new Date();
  const initialValues = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  const initialDate = localDateTime;
  const [selectedDay, setSelectedDay] = useState<number>(initialValues.day);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialValues.month,
  );
  const [selectedYear, setSelectedYear] = useState<number>(initialValues.year);
  const [orders, setOrders] = useState<OrderCompleteResponse[]>([]);
  const [filteredRange, setFilteredRange] = useState<FilterRange>({
    initial: initialDate,
    finish: initialDate,
  });
  const [rangeFilter, setRangeFilter] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);

        if (rangeFilter === 1) {
          return (
            orderDate.getDate() === selectedDay &&
            orderDate.getMonth() + 1 === selectedMonth &&
            orderDate.getFullYear() === selectedYear
          );
        } else {
          const initialDate = new Date(filteredRange.initial);
          const finishDate = new Date(filteredRange.finish);

          return orderDate >= initialDate && orderDate <= finishDate;
        }
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ); // Orden descendente
  }, [
    orders,
    selectedDay,
    selectedMonth,
    selectedYear,
    filteredRange,
    rangeFilter,
  ]);

  const sortedOrders = useMemo(() => {
    return filteredOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [filteredOrders]);

  const { totalFacturation, totalPeople } = useMemo(() => {
    return sortedOrders.reduce(
      (acc, order) => {
        acc.totalFacturation += order.total;
        acc.totalPeople += order.people;
        return acc;
      },
      { totalFacturation: 0, totalPeople: 0 },
    );
  }, [sortedOrders]);
  const avaragePerPeople = totalFacturation / totalPeople;

  return (
    <VentasContext.Provider
      value={{
        selectedOrder,
        setSelectedOrder,
        rangeFilter,
        setRangeFilter,
        filteredRange,
        setFilteredRange,
        initialDate,
        totalFacturation,
        totalPeople,
        avaragePerPeople,
        initialValues,
        sortedOrders,
        orders,
        setOrders,
        selectedDay,
        selectedMonth,
        selectedYear,
        setSelectedDay,
        setSelectedMonth,
        setSelectedYear,
        filteredOrders,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
