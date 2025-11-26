import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../../../widgets/loading/loading.jsx";
import { Login, AddBalance } from "../lazy/lazy.jsx";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="addBalance" element={<AddBalance />} />
      </Routes>
    </BrowserRouter>
  );
}
