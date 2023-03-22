import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            {/* <Test /> */}
            <Route path="/" element={<Main />} />
            <Route path="/upload" element={<Upload />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="*" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
