import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeader = ["/admin-login"];
  return (
    <>
      {!hideHeader.includes(location.pathname) && <Header />}
      <Outlet />
      {!hideHeader.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
