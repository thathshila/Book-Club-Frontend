// import { createBrowserRouter } from "react-router-dom"
// import Layout from "./pages/Layout"
// import Login from "./pages/LoginPage"
// import Signup from "./pages/SignUpPage"
// import AdminRoutes from "./context/AdminRoutes.tsx"
// import MainDashboard from "./pages/MainDashboard.tsx";
// import ManageBookPage from "./pages/ManageBookPage.tsx";
// import ManageReaderPage from "./pages/ManageReaderPage.tsx";
// import LendingManagementPage from "./pages/ManageLendingPage.tsx";
// import LendingList from "./components/LendingList.tsx";
//
//
//
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         children: [
//             { path: "/", element: <Login /> },
//             { path: "/login", element: <Login /> },
//             { path: "/signup", element: <Signup /> },
//             {
//                 element: <AdminRoutes />,
//                 children: [
//                     { path: "/dashboard", element: <MainDashboard /> },
//                     //{ path: "/dashboard/manage-books", element: <ManageBookPage/>},
//                     { path: "/manage-books", element: <ManageBookPage />},
//                      { path: "/dashboard/lendingList", element:<LendingList refreshFlag={false}/>},
//                     // { path: "/dashboard/lend-book", element:<LendBookForm/>},
//                     { path: "/dashboard/lendings", element:<LendingManagementPage/>},
//                     { path: "/dashboard/readers", element:<ManageReaderPage/>},
//                 ],
//             },
//         ],
//     },
// ])
//
// export default router
//
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import AdminRoutes from "./context/AdminRoutes.tsx";
import MainDashboard from "./pages/MainDashboard.tsx";
import ManageBookPage from "./pages/ManageBookPage.tsx";
import ManageReaderPage from "./pages/ManageReaderPage.tsx";
import LendingManagementPage from "./pages/ManageLendingPage.tsx";
import LendingList from "./components/LendingList.tsx";
import StaffList from "./components/StaffList.tsx";
import ManageOverduePage from "./pages/ManageOverduePage.tsx";
import ChangePassword from "./components/ChangePassword.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Login /> }, // sets / to Login
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            {
                element: <AdminRoutes />,
                children: [
                    { index: true, element: <MainDashboard /> }, // dashboard default landing
                    { path: "dashboard", element: <MainDashboard /> },
                    { path: "manage-books", element: <ManageBookPage /> },
                    { path: "dashboard/lendingList", element: <LendingList refreshFlag={false} /> },
                    { path: "dashboard/lendings", element: <LendingManagementPage /> },
                    { path: "dashboard/readers", element: <ManageReaderPage /> },
                    { path: "staff" ,element: <StaffList /> },
                    { path: "dashboard/overdue", element: <ManageOverduePage /> },
                ],
            },
            { path: "change-password", element: <ChangePassword />},

        ],
    },
]);

export default router;
