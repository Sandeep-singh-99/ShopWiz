import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeader = ["/admin-login", "/admin-home"];
  
  return (
    <>
      {!hideHeader.includes(location.pathname) && <Header />}
     <div className="min-h-[calc(100vh-120px)] bg-gray-100">
      <Outlet/>
      </div>
      {!hideHeader.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
