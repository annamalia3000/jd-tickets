import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Order } from "./pages/Order/Order";
import { NotFound } from "./pages/NotFound/NotFound";

import { Passengers } from "./pages/Passengers/Passengers";
import "./App.css";
import { Payment } from "./pages/Payment/Payment";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/order" element={<Order />} />
          <Route path="/passengers" element={<Passengers/>} />
           <Route path="/payment" element={<Payment/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
