import Input from "./components/Input";
import Aibot from "./components/AIbot";

function App() {
  return (
    <div className="">
      <div className="h-fit w-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 mt-8">
          Loan Calculator
        </h1>
        <Input />
      </div>
      <div className="h-fit w-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 mt-8">
          AI Bot
        </h1>
          <Aibot />
      </div>
    </div>
  );
}

export default App;
