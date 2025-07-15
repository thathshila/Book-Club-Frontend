import { createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignUpPage"
import AdminRoutes from "./pages/AdminRoutes"
import MainDashboard from "./pages/MainDashboard.tsx";
import LendingList from "./pages/LendingList.tsx";
import LendBookForm from "./pages/LendingForm.tsx";
// import AddBook from "./pages/AddBook.tsx";
import ManageBookPage from "./pages/ManageBookPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            {
                element: <AdminRoutes />,
                children: [
                    { path: "/dashboard", element: <MainDashboard /> },
                    // { path: "/dashboard/add-book", element: <AddBook onBookAdded={() => {}}/>},
                    { path: "/dashboard/manage-books", element: <ManageBookPage />},
                    { path: "/lendings", element:<LendingList/>},
                    { path: "/lend-book", element:<LendBookForm/>},
                ],
            },
        ],
    },
])

export default router

