
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Components/Nav/Nav"; 

function Layout() {
  const location = useLocation(); 

  return (
    <>
      {location.pathname !== "/" && location.pathname!=="/register" && location.pathname!=="/recover" && <Nav />}
      <Outlet />
    </>
  );
}

export default Layout;
