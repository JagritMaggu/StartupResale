

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import { motion, transform } from "framer-motion";
import {
  LucideActivitySquare,
  CircleDollarSign,
  Factory,
  Medal,
  Banknote,
  Globe2,
  Box,
  Zap,
  TrendingUp,
  Swords,
  Wallet,
  Percent,
  Calculator,
  UserSquare2,
  CoinsIcon,
  RotateCcw,

} from "lucide-react";

function StartupValuation() {
  const navigate = useNavigate();
  const bgStyle = {
    background: `url("/images/vibrantStartupSetting.jpg") no-repeat center center fixed `,
    backgroundSize: "100% 100%",
    position: "absolute",
    filter: "blur(5px)",
    transform: "scale(1.05)",

    width: "100%",

    margin: "0px",
    padding: "0px",
  };

  useEffect(() => {
    async function checkUser() {
      try {
        const userRes = await api.get("/fetchUser");

        if (!userRes.data || userRes.data.role !== "founder") {
          toast.error("Access Denied! Unauthorised");
          navigate("/");
          return;
        }
      } catch (error) {
        toast.error("Unauthorised");
        navigate("/");
        return;
      }
    }
    checkUser();
  }, []);

  const scoreIcons = {
    Team: UserSquare2,
    Product: Box,
    Market: Globe2,
    Traction: Zap,
    Competition: Swords,
  };

  const [revenue, setRevenue] = useState("");
  const [liabilities, setLiabilities] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [profitMargin, setProfitMargin] = useState('');
  const [cashOnHand, setCashOnHand] = useState('');

  const [industry, setIndustry] = useState("");
  const [scores, setScores] = useState({
    Team: 5,
    Product: 5,
    Market: 5,
    Traction: 5,
    Competition: 5,
  });

  const [valuation, setValuation] = useState(null);

  const industryMultiples = {
    saas: 6,
    consumer: 4,
    services: 2,
    fintech: 7,
    ecommerce: 3,
  };
  const handleReset = (e) =>{
    e.preventDefault();
    setRevenue("")
    setLiabilities("")
    setGrowthRate("")
    setProfitMargin("")
    setCashOnHand("")
    setIndustry("")
    setScores({
      Team: 5,
    Product: 5,
    Market: 5,
    Traction: 5,
    Competition: 5,
    })

  }
  const handleScoreChange = (e) => {
    setScores({ ...scores, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseValuation = Number(revenue) * (industryMultiples[industry] || 3);

    const weights = {
      Team: 0.3,
      Product: 0.25,
      Market: 0.2,
      Traction: 0.15,
      Competition: 0.1,
    };
 
    let factor = 0;
  for (let key in weights) {
    // const score = Number(scores[key]) || 0;
    factor += (scores[key] / 10) * weights[key];
  }
    let adjusted = baseValuation * factor;

    adjusted -= liabilities;

    adjusted *= 1 + growthRate / 100;

    adjusted *= profitMargin / 100;

    adjusted += cashOnHand;
//  if (isNaN(adjusted)) adjusted = 0;

  setValuation(Math.round(Math.max(0,adjusted)));
   
  };
  return (
    <>
      <div className="relative min-h-screen   w-full overflow-hidden">
        <div style={bgStyle} className="min-h-screen min-w-screen">
          {" "}
        </div>
        <Navbar />
        <div className="relative flex items-center justify-center mt-38">
          <motion.div
            className="z-10  bg-gray-200 max-h-screen p-8 mx-auto rounded shadow-8xl w-full max-w-5xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-2xl flex items-center font-bold mb-5.5 text-emerald-700">
                <LucideActivitySquare className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                Startup Valuation Calculator
              </h1>

              <div className="grid grid-cols-2">
                <div className="flex items-center">
                  {/* Revenue Setup */}
                  <CircleDollarSign className="text-gray-400 mr-2 mt-1 h-6 w-6" />
                  <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1 ">
                    Annual Revenue(INR)
                  </label>
                  <input
                    className="text-md p-1 border rounded-md text-gray-500"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center">
                  {/* Inustry Setup*/}
                  <Factory className="text-gray-400 mr-2 mt-1 h-6 w-6" />
                  <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1">
                    Industry
                  </label>
                  <select
                    className="text-md p-1 border rounded-md text-gray-500"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option
                      className="text-lg p-1 border rounded-md text-gray-700"
                      value=""
                    >
                      Select Industry
                    </option>
                    <option
                      className="text-md p-1 border rounded-md text-gray-500"
                      value="saas"
                    >
                      Saas
                    </option>
                    <option
                      className="text-md p-1 border rounded-md text-gray-500"
                      value="consumer"
                    >
                      Consumer Apps
                    </option>
                    <option
                      className="text-md p-1 border rounded-md text-gray-500"
                      value="services"
                    >
                      Traditional Services
                    </option>
                    <option
                      className="text-md p-1 border rounded-md text-gray-500"
                      value="fintech"
                    >
                      Fintech
                    </option>
                    <option
                      className="text-md p-1 border rounded-md text-gray-500"
                      value="ecommerce"
                    >
                      E-commerce
                    </option>
                  </select>
                </div>
              </div>
              {/* Scorecard sliders */}
              <h2 className="text-2xl flex items-center my-7 font-bold  text-gray-600">
                {" "}
                <Medal className="text-gray-400 mr-2 mt-1 h-6 w-6" />
                Scorecard
              </h2>
              <div className="grid grid-cols-6 gap-5 w-full">
                {Object.keys(scores).map((key) => {
                  const Icon = scoreIcons[key];
                  return (
                    <div key={key}>
                      <label className="text-lg flex items-center font-semibold mr-3 text-gray-600 ml-1">
                        {Icon && (
                          <Icon className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                        )}
                        {key}
                      </label>
                      <input
                        className="text-md p-1 ml-1 w-full border rounded-md text-gray-500 transition duration-300"
                        type="range"
                        min="1"
                        max="10"
                        value={scores[key]}
                        name={key}
                        onChange={handleScoreChange}
                      />
                      <span className="text-xl p-1 text-gray-500">
                        {scores[key]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2">

       <div className="flex items-center">
    <Banknote className="text-gray-400 mr-2 h-6 w-6"/>
    <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1">Liabilities (₹)</label>
    <input 
      type="number" 
      min="0"
      className="text-md p-1 border rounded-md text-gray-500"
      value={liabilities}
      onChange={(e) => setLiabilities(Number(e.target.value))}
    />
  </div>


  <div className="flex items-center">
    <Percent className="text-gray-400 mr-2 h-6 w-6"/>
    <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1">Profit Margin (%)</label>
    <input 
      type="number" 
      min="0"
      max="100"
      className="text-md p-1 border rounded-md text-gray-500"
      value={profitMargin}
      onChange={(e) => setProfitMargin(Number(e.target.value))}
    />
  </div>

 
  <div className="flex items-center">
    <TrendingUp className="text-gray-400 mr-2 h-6 w-6"/>
    <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1">Growth Rate (%)</label>
    <input 
      type="number" 
      min="0"
      className="text-md p-1 border rounded-md text-gray-500"
      value={growthRate}
      onChange={(e) => setGrowthRate(Number(e.target.value))}
    />
  </div>

 
  <div className="flex items-center">
    <Wallet className="text-gray-400 mr-2 h-6 w-6"/>
    <label className="text-2xl font-semibold mr-3 text-gray-600 ml-1">Cash on Hand (₹)</label>
    <input 
      type="number" 
      min="0"
      className="text-md p-1 border rounded-md text-gray-500"
      value={cashOnHand}
      onChange={(e) => setCashOnHand(Number(e.target.value))}
    />
  </div>
</div>

              <div className="flex items-center gap-6">
                <button
                  className="flex items-center justify-center ml-1 text-white transition duration-300 bg-emerald-800 p-3 rounded-lg hover:bg-emerald-900"
                  type="submit"
                >
                  <Calculator className="text-gray-400 mr-2 h-6 w-6" />
                  Calculate Valuation
                </button>
                <button
                  className="flex items-center justify-center ml-auto text-white transition duration-300 bg-yellow-700 p-3 rounded-lg hover:bg-yellow-800"
                  onClick={handleReset}
                >
                  <RotateCcw className="text-gray-400 mr-2 h-6 w-6" />
                  Reset
                </button>
                {valuation !== null && (
                  <div className="flex items-center text-gray-700 text-2xl mb-2 font-medium">
                   
                    <CoinsIcon className="text-gray-400 mr-2 mt-1 h-6 w-6" />
                    {"₹ "}{valuation}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default StartupValuation;
