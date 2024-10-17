import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootPage} from "./pages/RootPage";
import {IndexPage} from "./pages/IndexPage";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";

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
        <RouterProvider router={router}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
