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
import PayDialog from "@/features/payDialog/payDialog.jsx";

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
import {
  getSearch,
  getHistoryById,
  // postPayUser
} from "@/entities/searchTable/api/searchApi.js";

// ==========================
//       COLUMNS (JSX)
// ==========================

const HistoryCell = ({ id, history }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(getHistoryById(id));
  };

  return (
    <Button
      onClick={() => handleClick(id)}
      variant="ghost"
      className="border rounded-sm text-[#775DA6] h-8 text-xs bg-[#775da645]
                 hover:text-black hover:bg-[#775da64f]"
    >
      {history ? "Не известно" : "Просмотреть"}
    </Button>
  );
};
const PayCell = ({ row, setSendDialog, setUserId }) => {
  const handleClick = () => {
    setUserId(row.original.id); // <-- здесь row теперь есть
    setSendDialog(true);
  };

  return (
    <div className="capitalize grid place-items-end">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="border-none h-8 shadow-xl shadow-[#c6c0fd] rounded-full bg-[#662DFC] hover:bg-[#682dfcd3]"
      >
        Пополнить
      </Button>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getColumns = (setSendDialog, setUserId) => [
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
      <HistoryCell id={row.original.id} history={row.getValue("history")} />
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
    cell: ({ row }) => (
      <PayCell row={row} setSendDialog={setSendDialog} setUserId={setUserId} />
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
  const [sendDialog, setSendDialog] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const columns = getColumns(setSendDialog, setUserId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearch());
  }, [dispatch]);

  const { searchData } = useSelector((state) => state.search);
  // console.log(searchData);
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
              <TableHeader className="border-b-2">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isActions =
                        header.column.columnDef.accessorKey === "action";

                      return (
                        <TableHead
                          key={header.id}
                          className={`${
                            isActions ? "text-right" : ""
                          }   px-6 py-4`}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className=" text-[#342B4A]">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="bg-[#F9F9F9]"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-4">
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

        <PayDialog
          isOpen={sendDialog}
          onClose={() => setSendDialog(false)}
          id={userId}
        />
      </div>
    </div>
  );
}
