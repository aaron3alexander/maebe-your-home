import { useEffect, useState, useRef } from "react";
import MuiInput from "@mui/material/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import greencheckmark from "../../public/greencheckmark.svg";
import redx from "../../public/redx.svg";

import Slider from "@mui/material/Slider";
import "../App.css";

export default function Input() {
  const [income, setIncome] = useState(0);
  const [carPayment, setCarPayment] = useState(0);
  const [studentLoan, setStudentLoan] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const sectionRef = useRef(null);

  const [propertyValue, setPropertyValue] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);
  const [mortgageLength, setMortgageLength] = useState(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [passes, setPasses] = useState(false);

  let resultArray = [[1, ""], [1], [1], [1]];
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
    setLoan(propertyValue - downpayment);
  }, [downpayment, propertyValue]);

  useEffect(() => {
    let monthInterest = interest / 12;
    console.log("monthinterest", monthInterest);

    setMonthlyMortgage(
      loan *
        ((monthInterest * Math.pow(1 + monthInterest, mortgageLength * 12)) /
          (Math.pow(1 + monthInterest, mortgageLength * 12) - 1))
    );
  }, [loan, interest, mortgageLength]);

  useEffect(() => {
    console.log(
      income,
      carPayment,
      studentLoan,
      creditCard,
      creditScore,
      propertyValue,
      downpayment,
      loan,
      interest,
      mortgageLength,
      monthlyMortgage
    );

    let DTI =
      (monthlyMortgage + studentLoan + carPayment + creditCard) / income;

    let LEDTI = monthlyMortgage / income;
    let LTV = loan / propertyValue;
    let message = [];
    let isGud = true;
    console.log(
      "Values: ",
      DTI <= 0.36,
      LEDTI <= 0.28,
      LTV <= 0.8,
      creditScore > 640
    );

    if (!(creditScore > 640)) {
      isGud = false;
      message = [
        "N",
        "Too low Credit Score! For ways to improve your score please visit:",
      ];
      resultArray[0] = 0;
    }

    if (!(DTI <= 0.36)) {
      isGud = false;
      resultArray[1] = 0;

      if (message.length > 0) {
        message.push(
          "DTI sucks, Debt is too high to safely purchase a home. Either pay off certain debts, or transfer debt into a lower interest rate loan/credit card."
        );
      } else
        message = [
          "N",
          "0",
          "DTI sucks, Debt is too high to safely purchase a home. Either pay off certain debts, or transfer debt into a lower interest rate loan/credit card.",
        ];
    }

    if (!(LEDTI <= 0.28)) {
      isGud = false;
      resultArray[2] = 0;

      if (message.length > 0) {
        message.push(
          "LEDTI sucks, mortgage would be too great to safely buy a house."
        );
      } else
        message = [
          "N",
          "0",
          "0",
          "LEDTI sucks, mortgage would be too great to safely buy a house.",
        ];
    }

    if (!(LTV <= 0.8)) {
      isGud = false;
      resultArray[3] = 0;
      if (message.length > 0) {
        message.push(
          "LTV sucks. The few options you can use to help with buying a home would be to obtain PMI(Private Mortgage Loan), look for a less expensive home, or increase downpayment now."
        );
      } else
        message = [
          "N",
          "0",
          "0",
          "0",
          "LTV sucks, PMI needed in order to purchase house",
        ];
    }
    if (isGud) {
      setPasses(true);
      console.log("passes set to true!");
    } else {
      setPasses(false);
    }
  }, [
    interest,
    loan,
    income,
    carPayment,
    propertyValue,
    downpayment,
    creditCard,
    studentLoan,
    mortgageLength,
    creditScore,
  ]);

  function handleButton() {
    setIsReady(true);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth", // Add smooth scrolling
        block: "start", // Align to the start of the section
      });
    }
  }

  return (
    <div className="h-3/4 w-full flex flex-col items-center">
      <h1 className="text-8xl font-bold text-blue-400 mb-8 mt-8">
        Loan Calculator
      </h1>
      <div className="w-1/2 mb-6 bg-blue-400 rounded-lg p-4 text-white">
        There are 4 major things to focus on when purchasing a home. They are
        your credit score, loan to value (LTV) ratio, debt to income (DTI)
        ratio, and front-end debt to income (FEDT) ratio.
      </div>

      <div className="flex  shadow-xl border-black rounded-lg">
        <div className="h-full w-full p-3 rounded-lg flex flex-col items-center bg-blue-400">
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
              Annual Interest (in Decimal):
              <input
                className="w-full px-4 py-2 text-black mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="number"
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
              />
            </label>

            <label className="block mb-2 text-sm text-white font-semibold text-gray-600">
              Length of Mortgage:
              <input
                className="w-full px-4 py-2 text-black mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="number"
                value={mortgageLength}
                onChange={(e) => {
                  setMortgageLength(e.target.value);
                }}
              />
            </label>
            <label className="block mb-2 text-white text-sm font-semibold text-gray-600">
              Monthly Mortgage Amount:
              <input
                className="w-full text-black px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="number"
                value={monthlyMortgage}
              />
            </label>
          </div>
        </div>
      </div>

      <button
        className="w-1/2 bg-blue-400 text-white text-2xl h-16 rounded-lg mt-4 font-bold hover:bg-blue-300 transition-all"
        onClick={handleButton}
      >
        View Loan
      </button>
      {isReady && (
        <div
          ref={sectionRef}
          className="h-full mt-8 bg-gray-800 p-8 w-2/3 rounded-full"
        >
          {passes ? <h1 className="text-4xl text-green-500 font-bold text-center">Congrats Future Homeowner!</h1> : (
            <h1 className="text-4xl text-red-400 font-bold text-center mb-2 ">Not A Good Idea!</h1>
          )}
          <div className="flex justify-evenly">
            {passes ? (
              <img className="h-96" src={greencheckmark} />
            ) : (
              <img className="h-96" src={redx} />
            )}
            <div className="flex flex-col justify-evenly ml-6 w-1/2">
              <p>
                {creditScore > 780 ? (
                  <h1 className="text-green-500 font-bold">
                    Awesome! Your credit score is above 780. Keep it up!
                  </h1>
                ) : creditScore > 700 ? (
                  <h1 className="text-green-300 font-bold ">
                    Sweet! Your credit score is above 700!
                  </h1>
                ) : creditScore > 640 ? (
                  <h1 className="text-yellow-500 font-bold">
                    Your credit score passes the minimum of 640, but you should try to
                    increase it!
                  </h1>
                ) : (
                  <h1 className="text-red-700 font-bold">
                    Your credit score does not pass the minimum score of 640!
                    Try to improve it!
                  </h1>
                )}
              </p>

              <p>
                {(monthlyMortgage + studentLoan + carPayment + creditCard) /
                  income <=
                0.2 ? (
                  <h1 className="text-green-500 font-bold">
                    Awesome! Your debt-to-income (DTI) ratio is less than 20%!
                    Great job!
                  </h1>
                ) : (monthlyMortgage + studentLoan + carPayment + creditCard) /
                    income <=
                  0.3 ? (
                  <h1 className="text-green-300 font-bold ">
                    Good! Your debt-to-income ratio (DTI) is less than 30%!
                  </h1>
                ) : (monthlyMortgage + studentLoan + carPayment + creditCard) /
                    income <=
                  0.36 ? (
                  <h1 className="text-yellow-500 font-bold">
                    Your debt-to-income ratio (DTI) passes the minimum of 36%,
                    but you should try to lower it!
                  </h1>
                ) : (
                  <h1 className="text-red-700 font-bold">
                    Your debt-to-income ratio (DTI) DOES NOT pass the minimum of
                    36%! Either try to lower your debt or increase your income!
                  </h1>
                )}
              </p>

              <p>
                {monthlyMortgage / income <= 0.15 ? (
                  <h1 className="text-green-500 font-bold">
                    Awesome! Your front-end debt-to-income (FEDTI) ratio is less than 15%!
                  </h1>
                ) : monthlyMortgage / income <= 0.2 ? (
                  <h1 className="text-green-300 font-bold ">
                    Good! Your front-end debt-to-income (FEDTI) ratio is less than 20%!
                  </h1>
                ) : monthlyMortgage / income <= 0.28 ? (
                  <h1 className="text-yellow-500 font-bold">
                    Your front-end debt-to-income (FEDTI) ratio passes the minimum of 28%, but you
                    should try to lower it!
                  </h1>
                ) : (
                  <h1 className="text-red-700 font-bold">
                    Your front-end debt-to-income (FEDTI) ratio DOES NOT pass the minimum of 28%.
                    Either try to lower your monthly mortgage payment or increase your income!
                  </h1>
                )}
              </p>

              <p>
                {(loan / propertyValue) <= .8 ? (
                  <h1 className="text-green-500 font-bold">
                    Awesome! Your loan-to-value (LTV) ratio is less than 80%! Your interest rates should be low!
                  </h1>
                )  : (loan / propertyValue) <= .95 ? (
                  <h1 className="text-yellow-500 font-bold">
                    Your front-end debt-to-income (FEDTI) ratio passes the minimum of 28%, but you
                    should try to lower it!
                  </h1>
                ) : (
                  <h1 className="text-red-700 font-bold">
                    Your loan-to-value (LTV) ratio is greater than 80%! This can lead to higher interest rates and require mortgage insurance.
                    Try to increase the size of your downpayment!
                  </h1>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
