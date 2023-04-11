import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "../components/Table";
import Servico from "../servico/Servico";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Servico />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
