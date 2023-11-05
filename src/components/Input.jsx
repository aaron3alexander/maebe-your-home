import { useEffect, useState } from "react";
import MuiInput from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import "../App.css";

export default function UserInfo() {
  const [income, setIncome] = useState(0);
  const [carPayment, setCarPayment] = useState(0);
  const [studentLoan, setStudentLoan] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [creditScore, setCreditScore] = useState(0);

  const [propertyValue, setPropertyValue] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);


  const marks = [
    {
      value: 300,
      label: "300",
    },
    {
      value: 400,
      label: "400",
    },
    {
      value: 500,
      label: "500",
    },
    {
      value: 600,
      label: "600",
    },
    {
      value: 700,
      label: "700",
    },
    {
      value: 800,
      label: "800",
    },
  ];

  useEffect(() => {
    console.log(creditScore);
    setLoan(propertyValue - downpayment);
  }, [downpayment, propertyValue]);

  return (
    <div className="h-3/4 w-2/3 flex border-2 border-black rounded-lg  ">
      <div className="h-full w-full p-3 rounded-lg bg-blue-400 flex flex-col items-center">
        <h1 className="text-white text-2xl text-center">Your Information</h1>
        <hr className="mt-1 border-2 border-white w-2/3 " />

        <div className="w-full h-full mt-10 p-6 bg-white rounded-md shadow-md">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Monthly Income:
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Monthly Car Payment:
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={carPayment}
              onChange={(e) => {
                setCarPayment(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Monthly Student Loan Payment:
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={studentLoan}
              onChange={(e) => {
                setStudentLoan(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Monthly Credit Card Bill:
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={creditCard}
              onChange={(e) => {
                setCreditCard(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Credit Score:
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={creditScore}
              onChange={(e) => {
                setCreditScore(e.target.value);
              }}
            />
            <Slider
              value={creditScore}
              defaultValue={600}
              min={300}
              max={850}
              marks={marks}
              onChange={(e) => {
                setCreditScore(e.target.value);
              }}
            />
          </label>
        </div>
      </div>

      <div className="h-full w-full p-3 rounded-lg flex flex-col items-center">
        <h1 className="text-2xl text-center">Property Information</h1>
        <hr className="mt-1 border-2 border-black w-2/3" />
        <div className="w-full h-full mt-10 p-6 rounded-md shadow-md bg-blue-400">
          <label className="block mb-2 text-sm font-semibold text-white">
            Appraisal Value:
            <input
              className="w-full text-black px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={propertyValue}
              onChange={(e) => {
                setPropertyValue(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-white">
            Proposed Downpayment:
            <input
              className="w-full text-black px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={downpayment}
              onChange={(e) => {
                setDownpayment(e.target.value);
              }}
            />
          </label>
          <label className="block mb-2 text-white text-sm font-semibold text-gray-600">
            Loan Amount:
            <input
              className="w-full text-black px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={loan}
            />
          </label>
          <label className="block mb-2 text-sm text-white font-semibold text-gray-600">
            Annual Interest:
            <input
              className="w-full px-4 py-2 text-black mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              value={interest}
              onChange={(e) => {
                setInterest(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
