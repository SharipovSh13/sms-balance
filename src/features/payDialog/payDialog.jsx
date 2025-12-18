import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog.jsx";
import { toast } from "sonner";
import { Button } from "@/shared/ui/kit/button.jsx";
import { Input } from "@/shared/ui/kit/input.jsx";
import { Label } from "@/shared/ui/kit/label.jsx";
import {
  // getSearch,
  // getHistoryById,
  postPayUser,
} from "@/entities/searchTable/api/searchApi.js";
import {
  //  useSelector,
  useDispatch,
} from "react-redux";
import React from "react";

export default function PayDialog({ isOpen, onClose, id }) {
  const [amountState, setAmountState] = React.useState("");
  const dispatch = useDispatch();
  console.log(id);
  const handlePay = async () => {
    if (!amountState) {
      toast.warning("Введите корректную сумму");
      return;
    }

    try {
      await dispatch(
        postPayUser({
          amount: Number(amountState),
          user_id: id,
        })
      );

      toast.success("Баланс успешно пополнен");

      setAmountState("");
      onClose();
    } catch (error) {
      toast.error(error?.message || "Ошибка при пополнении баланса");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#F5F6FA] text-[#342B4A] border-4 border-[#b396fdb6]  inset-shadow-[0px_0px_0px_8px] inset-shadow-[#EAE8FD]">
        <DialogHeader>
          <DialogTitle className="text-center w-[70%] m-auto text-[#342B4A] font-bold">
            Пополнить счет
          </DialogTitle>
          <DialogDescription className="text-center">
            Укажите сумму для пополнения баланса пользователя
          </DialogDescription>
        </DialogHeader>
        <div className="flex  flex-col space-y-2">
          <Label> Сумма пополнения:</Label>
          <Input
            type="number"
            className=" border border-[#B396FD] shadow-[0_0_4px_0_#B396FD]"
            value={amountState}
            onChange={(e) => setAmountState(e.target.value.trim())}
          />
        </div>

        <DialogFooter className="mt-4 flex justify-between gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-full h-8 bg-white text-[#662DFC]  shadow-xl shadow-[#662DFC42]"
            >
              Отмена
            </Button>
          </DialogClose>

          <Button
            onClick={() => handlePay()}
            className="rounded-full h-8 bg-[#662DFC] text-white hover:bg-[#B396FD]  "
          >
            Подтвердить и отправить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
