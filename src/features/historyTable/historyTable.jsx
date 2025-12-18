import React, { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/shared/ui/kit/checkbox";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/kit/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Card } from "@/shared/ui/kit/card";

import { Input } from "@/shared/ui/kit/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";

import { useSelector, useDispatch } from "react-redux";
import { getSearch } from "@/entities/searchTable/api/searchApi.js";

// ==========================
// ============ STABLE COMPONENTS ============

const DateCell = ({ row }) => {
  const iso = row.getValue("purchased_at");
  const date = new Date(iso);

  const formatted = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Dushanbe",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return <div>{formatted}</div>;
};

const TotalCell = ({ row }) => (
  <div className="lowercase">{`$ ${row.getValue("price_paid")}`}</div>
);

const CommentCell = ({ row }) => (
  <div className="capitalize">{row.getValue("comments")}</div>
);
const IdCell = ({ row }) => (
  <div className="capitalize">{row.getValue("id")}</div>
);

//       COLUMNS (JSX)
// ==========================
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: IdCell,
  },
  {
    accessorKey: "purchased_at",
    header: "Дата",
    cell: DateCell,
  },

  {
    accessorKey: "price_paid",
    header: "Сумма",
    cell: TotalCell,
  },
];

// ==========================
//      DATA TABLE JSX
// ==========================
export function HistoryTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearch());
  }, [dispatch]);

  const { historyData } = useSelector((state) => state.search);
  console.log(historyData);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: historyData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-6">
        <div className="">
          <Card className="px-4 py-2 bg-white overflow-hidden rounded-xl shadow-2xs border h-[40vh]">
            <Table className="bg-white ">
              <TableHeader className="border-b-2 ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="bg-[#F5F6FA]"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Не найдено
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredRowModel().rows.length} строк
          </div>
        </div>
      </div>
    </div>
  );
}
