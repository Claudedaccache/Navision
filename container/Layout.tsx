import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router-dom";
import BackToTop from "../components/BackToTop.tsx";
import { Stack } from "@mui/material";
import Header from "../components/header/Header.tsx";

const Layout = () => {
  return (
    <Stack height="100vh" justifyContent="space-between">
      <Header />
      <Stack>
        <Outlet />
      </Stack>
      <Footer />
      <BackToTop />
    </Stack>
  );
};
export default Layout;
