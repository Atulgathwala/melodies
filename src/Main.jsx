import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./Components/Routes/Router.jsx";
import AuthContext from "./Components/Context/AuthContext.jsx";
import UserContext from "./Components/Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <UserContext>
      <RouterProvider router={Routers}>
        <App />
      </RouterProvider>
    </UserContext>
  </AuthContext>
);
