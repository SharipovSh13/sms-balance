import { Label } from "@/shared/ui/kit/label.jsx";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover.jsx";
import { useState } from "react";
import { Checkbox } from "@/shared/ui/kit/checkbox";

export default function AddBalance() {
  const [openLocationPopover, setOpenLocationPopover] = useState(false);
  return (
    <div className="w-[90%] m-auto p-2 text-[#342B4A]">
      <h1 className="font-bold text-2xl mt-4 mb-4">Касса</h1>
      <div
        className="
      #bg-[#ea3e2a]
      mt-4 mb-4"
      >
        <div className="flex flex-col gap-2 p-2">
          <Label className="font-medium">Выбор клиента</Label>
          <Popover
            open={openLocationPopover}
            onOpenChange={setOpenLocationPopover}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-[#B396FD] rounded-full justify-between  border border-[#B396FD]"
              >
                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 text-[#662dfc]" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className=" border-none min-w-[280px] sm:w-[300px] md:w-[350px] lg:w-[480px] p-2 bg-white shadow-sm shadow-[#B396FD] rounded-sm xl:w-[610px]  ">
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                {/* 🔹 Элемент "Все" */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                  // checked={selectedLocations?.length === mainLocalData?.length}
                  // onCheckedChange={() => handleLocationToggle("all")}
                  />
                  <span className="font-medium">Все</span>
                </label>
                <hr className="my-1" />
                {/* 🔹 Список локаций */}
                {/* {mainLocalData?.map((loc) => (
              <label
                key={loc.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  // checked={selectedLocations.includes(loc.id)}
                  // onCheckedChange={() => handleLocationToggle(loc.id)}
                />
                <span>{loc?.description || loc?.point}</span>
              </label>
            ))} */}
                <hr className="my-1" />
                {/* {countData.total} получателей */}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
