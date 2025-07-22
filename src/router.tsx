import { createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignUpPage"
import AdminRoutes from "./context/AdminRoutes.tsx"
import MainDashboard from "./pages/MainDashboard.tsx";
// import LendingList from "./pages/LendingList.tsx";
// import LendBookForm from "./pages/LendingForm.tsx";
// import AddBook from "./pages/AddBook.tsx";
import ManageBookPage from "./pages/ManageBookPage.tsx";
import ManageReaderPage from "./pages/ManageReaderPage.tsx";
import LendingManagementPage from "./pages/ManageLendingPage.tsx";

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
                    { path: "/manage-books", element: <ManageBookPage />},
                    // { path: "/dashboard/lendings", element:<LendingList/>},
                    // { path: "/dashboard/lend-book", element:<LendBookForm/>},
                    { path: "/dashboard/lendings", element:<LendingManagementPage/>},
                    { path: "/dashboard/readers", element:<ManageReaderPage/>},
                ],
            },
        ],
    },
])

export default router

