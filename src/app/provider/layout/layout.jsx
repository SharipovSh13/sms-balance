import { Outlet } from "react-router-dom";
import { Toaster } from "@/shared/ui/kit/sonner.jsx";
export default function Layout() {
  return (
    <section>
      <Toaster position="top-right" richColors closeButton />

      <main>
        <Outlet />
      </main>
      <div>footer...</div>
    </section>
  );
}
