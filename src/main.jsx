import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from 'react-redux'
// import store from './store'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { SnackbarProvider } from 'notistack';

import "./css/tailwind.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
        {/* <Provider store={store}> */}
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <App />
          </SnackbarProvider>
          {/* </Provider> */}
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
