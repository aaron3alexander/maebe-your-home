import Input from "./components/Input";
import Account from "./components/Account";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className=" flex flex-col ">
        <div className="flex justify-end w-full p-4">
          <Account />
        </div>
        <div className="h-fit w-screen flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Input />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
