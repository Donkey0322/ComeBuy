import { BrowserRouter, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import AppFrame from "./AppFrame";
import Main from "./Main";
import Upload from "./Upload";

import "./index.css";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppFrame />}>
            <Route path="/" element={<Main />} />
            <Route path="/manipulate" element={<Upload />} />
            <Route path="*" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
