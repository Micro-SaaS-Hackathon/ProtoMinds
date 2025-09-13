import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Aside";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");


  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
