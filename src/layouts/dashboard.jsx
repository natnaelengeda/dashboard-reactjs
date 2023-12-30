import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { LoginContext } from "@/context/LoginContext";
import { useSnackbar } from "notistack";

// Images
import logo from "../assets/images/logo.png";
import axios from "../http/axios";
export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const state = useContext(LoginContext);
  const log = localStorage.getItem("log");
  const data = JSON.parse(localStorage.getItem("decoded"));

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // console.log(decoded);
  useEffect(() => {
    if (!log || !data) {
      navigate("/auth/sign-in");
    } else {
      // console.log(data.adminId)
      axios
        .post(
          "/checklog",
          {
            id: data,
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          if (response.data.msg === "admin") {
            // enqueueSnackbar('Welcome Back!!',{variant: "Success"});
          } else {
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
    }
  }, []);
  return (
    <div>
      {log && (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav routes={routes} brandImg={logo} />
          <div className="p-4 xl:ml-60">
            <DashboardNavbar />
            <Configurator />
            {/* <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton> */}
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element, inpages }) => (
                    <>
                      <Route key={path} exact path={path} element={element} />
                      {inpages &&
                        inpages.map(({ path, element }) => (
                          <Route
                            key={path}
                            exact
                            path={path}
                            element={element}
                          />
                        ))}
                    </>
                  ))
              )}
            </Routes>
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
