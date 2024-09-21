import { Outlet } from "react-router-dom";
import Navbar from "../shared/NavBar/Navbar";
import Footer from "../shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="pb-20 pt-18">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};
export default Main;
