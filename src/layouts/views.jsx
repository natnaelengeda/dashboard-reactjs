import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";
import routes from '@/routes';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

// Images
import logo from '../assets/images/logo.png'
export function Views() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
                brandImg={logo}
            />
            <div className="p-4 xl:ml-60">
                <DashboardNavbar />
                <Configurator />
                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(dispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                </IconButton>
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === "views" &&
                            pages.map(({ path, element }) => (
                                <Route exact path={path} element={element} />
                            ))
                    )}
                </Routes>
                <div className="text-blue-gray-600">
                    <Footer />
                </div>
            </div>

        </div>
    )
}

Views.displayName = "/src/layout/views.jsx";

export default Views;