import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootPage} from "./pages/RootPage";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {SimpleVisPage} from "./pages/SimpleVisPage";
import {IndexPage} from "./pages/IndexPage";
import {VisStereoPage} from "./components/visualizations/VisStereoPage";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css"

const basename = process.env.NODE_ENV === 'development' ? {} : {
  basename: "/music-visualizer"
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: '/',
        element: <IndexPage />
      },
      {
        path: '/simple',
        element: <SimpleVisPage />
      },
      {
        path: '/stereo',
        element: <VisStereoPage />
      }
    ]
  },
],
  basename
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <PrimeReactProvider>
          <RouterProvider router={router}/>
        </PrimeReactProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
