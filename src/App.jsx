import Input from "./components/Input";
import Account from "./components/Account";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";

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
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/signup" element = {<SignupPage />} />
        <Route path="/account" element = {<AccountPage />} />
    </Routes>
    </div>

    </div>
    </BrowserRouter>
  );
}

export default App;
