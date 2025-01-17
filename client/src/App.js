import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const hideHeader = ["/admin-login", "/admin-home"];
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
    }
  })
  return (
    <>
      {!hideHeader.includes(location.pathname) && <Header />}
      <Outlet />
      {!hideHeader.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
