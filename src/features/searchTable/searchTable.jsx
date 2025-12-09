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
//       COLUMNS (JSX)
// ==========================
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "history",
    header: "История",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("history")}</div>
    ),
  },
  {
    accessorKey: "get_balance",
    header: "Баланс",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("get_balance") ? row.getValue("get_balance") : `$ 0`}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Действия",
    cell: () => (
      <div className="capitalize">
        {
          <Button className="border-none h-9.5 rounded-full bg-[#662DFC] hover:bg-[#682dfcd3]">
            Пополнить
          </Button>
        }
      </div>
    ),
  },
];

// ==========================
//      DATA TABLE JSX
// ==========================
export function SearchTable() {
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
  // # eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/incompatible-library
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

              <TableBody className=" text-[#342B4A]">
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
                      No results.
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
