import React, { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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

const DateCell = ({ row }) => (
  <div className="capitalize">{row.getValue("date")}</div>
);

const TypeCell = ({ row }) => (
  <div className="capitalize">{row.getValue("type_balance")}</div>
);

const TotalCell = ({ row }) => (
  <div className="lowercase">{row.getValue("total")}</div>
);

const CommentCell = ({ row }) => (
  <div className="capitalize">{row.getValue("comments")}</div>
);

//       COLUMNS (JSX)
// ==========================
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "date",
    header: "Дата",
    cell: DateCell,
  },
  {
    accessorKey: "type_balance",
    header: "Тип",
    cell: TypeCell,
  },
  {
    accessorKey: "total",
    header: "Сумма",
    cell: TotalCell,
  },
  {
    accessorKey: "comments",
    header: "Комментарий",
    cell: CommentCell,
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

  const { searchData } = useSelector((state) => state.search);
  console.log(searchData);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: searchData?.items ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
          <Card className="px-4 py-2 bg-white overflow-hidden rounded-xl shadow-2xs border">
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

              <TableBody>
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
      </div>
    </div>
  );
}
