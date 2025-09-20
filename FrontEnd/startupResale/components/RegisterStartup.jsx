import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import {
  Coins,
  Tag,
  Factory,
  FileText,
  Hash,
  User2,
  Folder,
  Archive,
  Layers2,
  Monitor,
  Rocket,
 
  FileSignature,
  Award,
  ClipboardPlusIcon,
  BarChart2,
} from "lucide-react";
import {motion, transform} from 'framer-motion'
const uploadPreset = import.meta.env.VITE_CLOUDINARY_CLOUD_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function RegisterStartup() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      try {
        const userRes = await api.get("/fetchUser");

        if (!userRes.data || userRes.data.role !== "founder") {
          toast.error("Unauthorised");
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

  const bgStyle = {
    background: `url("/images/startupWithBrightBG.jpg") no-repeat center center fixed `,
    backgroundSize: "100% 100%",
    filter:"blur(5px)",
    transform:"scale(1.05)",
    position: "absolute",
    minHeight: "100vh",
    height: "100vh",

    width: "100%",
    margin: "0px",
    padding: "0px",
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [cin, setCin] = useState("");
  const [gstin, setGstin] = useState("");
  const [license, setLicense] = useState("");
  const [pan, setPan] = useState("");
  const [idProof, setIdProof] = useState("");
  const [stage, setStage] = useState("");
  const [incorporationCertUrl, setIncorporationCertUrl] = useState("");
  const [gstCertUrl, setGstCertUrl] = useState("");
  const [pitchDeckUrl, setPitchDeckUrl] = useState("");
  const [valuation, setValuation] = useState("");

  const handleFileUpload = async (file, setState) => {
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      setState(result.secure_url);
    } catch (error) {
      console.log("Upload failed: ", error);
      toast.error(
        `Register Startup Failed. Please try again!:, ${error.message}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/startups", {
        name,
        description,
        industry,
        cin,
        gstin,
        license,
        pan,
        idProof,
        stage,
        incorporationCertUrl,
        gstCertUrl,
        pitchDeckUrl,
        valuation,
      });

      toast.success("Startup Registered");
      setName("");
      setCin("");
      setPan("");
      setDescription("");
      setLicense("");
      setIdProof("");
      setGstin("");
      setGstCertUrl("");
      setStage("");
      setPitchDeckUrl("");
      setIncorporationCertUrl("");
      setIndustry("");
      setValuation("");

      console.log(res.data);
    } catch (error) {
      console.log("error is:", error);
      toast.error(
        `Register Startup Failed. Please try again!:, ${error.message}`
      );
    }
  };
  return (
    
          <div className="relative w-full flex items-center justify-center p-6  min-h-screen overflow-hidden">
        <div style={bgStyle}> </div>
         <motion.div
                className="relative z-10 bg-gray-200 max-w-5xl p-8 mx-auto rounded shadow-md w-full"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
        <h2 className="text-2xl  flex items-center text-emerald-800 font-bold">
          {" "}
          <ClipboardPlusIcon className="text-gray-400 mr-2 mt-1 h-5 w-5" />
          Register your startup!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center">
            <Tag className="text-gray-400 mr-2 h-5 w-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Startup Name"
              className="text-lg mx-2 border p-1 rounded-md text-gray-500"
              required
            />

            <Factory className="text-gray-400 mr-2 h-5 w-5" />
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="text-lg mx-2 border p-1 rounded-md text-gray-500"
              required
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Other">Other</option>
            </select>
            <FileText className="text-gray-400 mr-2 h-5 w-5" />
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="text-lg mx-2 border p-1 rounded-md text-gray-500"
              required
            />
          </div>
          <div className="grid grid-rows-6 gap-4">
            <div className="flex items-center">
              <Layers2 className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter License File:
              </label>
              <input
                type="file"
                className="text-yellow-600 transitiion duration-700 hover:underline"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], setLicense)
                }
                placeholder=" "
                required
              />
            </div>
            <div className="flex items-center">
              <User2 className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter IdProof File:
              </label>
              <input
                type="file"
                className="text-yellow-600 transitiion duration-700 hover:underline"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], setIdProof)
                }
                required
              />
            </div>

            <div className="flex items-center">
              <Archive className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter Company Pan File:
              </label>
              <input
                type="file"
                className="text-yellow-600 transitiion duration-700 hover:underline"
                onChange={(e) => handleFileUpload(e.target.files[0], setPan)}
                required
              />
            </div>
            <div className="flex items-center">
              <Folder className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter GST Certificate File:
              </label>
              <input
                type="file"
                className="text-yellow-600 transitiion duration-700 hover:underline"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], setGstCertUrl)
                }
              />
            </div>
            <div className="flex items-center">
              <Monitor className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter PitchDeckURL:
              </label>

              <input
                className="text-yellow-600 transitiion duration-700 hover:underline"
                type="file"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], setPitchDeckUrl)
                }
              />
            </div>
            <div className="flex items-center">
              <FileSignature className="text-gray-400 mr-2 h-5 w-5" />
              <label className="text-md font-semibold text-gray-600 mx-2  text-center ">
                Enter Incorporation certificate:
              </label>
              <input
                type="file"
                className="text-yellow-600 transitiion duration-700 hover:underline"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], setIncorporationCertUrl)
                }
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <Award className="text-gray-400 mr-2 h-5 w-5" />
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="Enter Gstin(optional)"
                className="text-lg mx-2 border p-1 rounded-md text-gray-500"
              />
            </div>
            <div className="flex items-center">
              <Hash className="text-gray-400 mr-2 h-5 w-5" />
              <input
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                placeholder="Enter CIN"
                className="text-lg mx-2 border p-1 rounded-md text-gray-500"
                required
              />
            </div>
            <div className="flex items-center">
              <BarChart2 className="text-gray-400 mr-2 h-5 w-5" />
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="text-lg mx-2 border p-1 rounded-md text-gray-500"
                required
              >
                <option value="">Select Stage</option>
                <option value="Idea">Idea</option>
                <option value="Early">Early</option>
                <option value="Growth">Growth</option>
                <option value="Mature">Mature</option>
              </select>
            </div>
            <div className="flex items-center">
              <Coins className="text-gray-400 mr-2 h-5 w-5" />
              <input
                type="number"
                min="0"
                value={valuation}
                onChange={(e) => setValuation(e.target.value)}
                placeholder="Enter Valuation in INR"
                className="text-lg mx-2 border p-1 rounded-md text-gray-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center ml-1 text-white transition duration-300 bg-emerald-800 px-3 py-3.5 rounded-lg  hover:bg-emerald-900 active:bg-blue-600"
          >
            <Rocket className="text-gray-400 mr-2 h-5 w-5" />
            Submit
          </button>
        </form>
        </motion.div>
      </div>
   
  );
}

export default RegisterStartup;
