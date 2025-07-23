// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import "./index.css"
// import { RouterProvider } from "react-router-dom"
// import router from "./router.tsx"
// import { AuthProvider } from "./context/AuthProvider.tsx"
//
// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <AuthProvider>
//             <RouterProvider router={router} />
//         </AuthProvider>
//     </StrictMode>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
