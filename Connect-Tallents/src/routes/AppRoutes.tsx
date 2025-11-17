import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Integrantes from "../pages/Integrantes";
import Sobre from "../pages/Sobre";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            }
            ,
            {
                path: "/integrantes",
                element: <Integrantes />
            }
            ,
            {
                path: "/sobre",
                element: <Sobre />
            }
        ]
    }
])