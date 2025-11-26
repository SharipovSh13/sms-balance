import { Card } from "@/shared/ui/kit/card.jsx";
import { Input } from "@/shared/ui/kit/input.jsx";
import { Label } from "@/shared/ui/kit/label.jsx";
// import { Checkbox } from "@/shared/ui/kit/checkbox.jsx";
import { Button } from "@/shared/ui/kit/button.jsx";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/entities/login/api/loginApi.js";
import { useEffect, useState } from "react";
import "./login.css";

import { getToken } from "@/shared/lib/utils/token.js";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/"); // ✅ если токен есть — переход на /pages
    }
  }, [navigate, token]);
  async function handlLogin(e) {
    e.preventDefault();
    const userName = e.target.userName.value.trim();
    const password = e.target.password.value.trim();

    if (!userName || !password) {
      toast.error("Заполните все поля!");
      return;
    }
    const admin = {
      password,
      userName,
    };

    const resultAction = await dispatch(login(admin));
    if (login.fulfilled.match(resultAction)) {
      toast.success("Успешно!");
      navigate("/addBalance");
    } else if (login.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload?.message || "Ошибка входа!";
      toast.error(errorMessage);
    }
  }

  return (
    <section className="login-section  h-screen w-full bg-linear-to-tr from-[#8556fc] to-80% to-[#a583fd]   ">
      <div>
        <div
          className="login-forms  text-[#]
      min-w-1xl"
        >
          <Card className="p-6 text-center bg-[#F5F6FA]   border-none   ">
            <div className="flex flex-col space-y-2  mt-0 mb-1">
              <h1 className="font-bold ">Войти</h1>
              <p className=" ">Введите логин и пароль для входа</p>
            </div>
            <form onSubmit={handlLogin} className="flex  flex-col space-y-5 ">
              <div className="grid w-full  items-center gap-3">
                <Label htmlFor="Login" className="">
                  Login
                </Label>
                <Input
                  placeholder="Логин"
                  className="  bg-white border-none placeholder:text-black"
                  type="text"
                  name="userName"
                  autoComplete="username"
                />
              </div>
              <div className="grid w-full  items-center gap-3 relative">
                <Label htmlFor="password">Password</Label>
                <div>
                  <Input
                    placeholder="Пароль"
                    className=" bg-white border-none placeholder:text-black"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                  />
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-11 -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>

              <Button className="bg-[#662DFC] hover:bg-[#997be2]" type="submit">
                Войти
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
