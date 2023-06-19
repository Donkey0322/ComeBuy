import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFrame from "./AppFrame";
import Main from "./Main";
import Manipulate from "./Manipulate";
import { useCondition } from "./hooks/useCondition";
import { getConst } from "./middleware";

import "./index.css";

function App() {
  const { SETDATA } = useCondition();

  useEffect(() => {
    (async () => {
      try {
        const result = await getConst();
        SETDATA(result);
      } catch (error) {
        throw error;
      }
    })();
  }, [SETDATA]);
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppFrame />}>
            <Route path="/" element={<Main />} />
            <Route path="/manipulate" element={<Manipulate />} />
            <Route path="*" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
