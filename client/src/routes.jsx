import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error"
import HomePage from "./pages/HomePage"
import Setup2fa from "./pages/Setup2fa"
import Verify2fa from "./pages/Verify2fa"

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />
    },
    {
        path: "/setup-2fa",
        element: <Setup2fa />,
        errorElement: <Error />
    },
    {
        path: "/verify-2fa",
        element: <Verify2fa />,
        errorElement: <Error />
    },
]);

export default router;