import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

function RoutsLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RoutsLayout;
