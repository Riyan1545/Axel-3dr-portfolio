import { Outlet } from "react-router-dom";

import Navbar from "../components/common/navbar/navbar";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}