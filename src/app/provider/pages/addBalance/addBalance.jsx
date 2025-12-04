import { Label } from "@/shared/ui/kit/label.jsx";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover.jsx";

import { Input } from "@/shared/ui/kit/input";
// import { useState } from "react";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { SearchTable } from "@/features/searchTable/searchTable.jsx";
import { HistoryTable } from "@/features/historyTable/historyTable.jsx";

export default function AddBalance() {
  return (
    <div className="bg-[#F5F6FA]">
      <div className="w-full m-auto p-2 text-[#342B4A]  h-screen">
        <div className="w-[95%] m-auto p-2 text-[#342B4A]">
          <h1 className="font-bold text-2xl mt-4 mb-4">Поиск клиента</h1>
          <div className=" border rounded-full flex    w-fit bg-white h-10 place-items-center">
            <Input
              type="text"
              className="text-xs md:text-sm border-none h-9.5 rounded-full bg-white  border-[#662dfc] w-42 shadow-none md:w-62 placeholder:text-gray-300 placeholder:font-bold"
              placeholder={`Введите username…`}
            />
            <Button
              variant="default"
              className="border-none h-9.5 rounded-full bg-[#662DFC] hover:bg-[#682dfcd3]"
            >
              Найти
            </Button>
          </div>
        </div>
        <div className="w-[95%] m-auto p-2 text-[#342B4A]">
          <h2 className="font-bold text-xl mt-4 mb-4">Результат поиска</h2>

          <SearchTable />
          <h3 className="font-bold text-xl mt-4 mb-4">История пополнений</h3>
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
