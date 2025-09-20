import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Factory,
  FileText,
  Hash,
  BarChart2,
  Tag,
  Edit,
  X,
  Check,
  Trash,
} from "lucide-react";
import {motion} from "framer-motion"
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function MyStartups() {
  const [startups, setStartups] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchStartups() {
      try {
        const userRes = await api.get("/fetchUser");
        if (userRes.data.role !== "founder") {
          // userRes.data here = (req.user) sent by the backend. however if in the backend it was res.json({user:req.user}) then we would have written userRes.data(<the whole obj>).user.role here
          toast.error("Unauthorised");
          navigate("/");
          return;
        }
        const res = await api.get("/startups");
        setStartups(res.data);
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong!");
        navigate("/");
      }
    }
    fetchStartups();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/startups/${id}`);
      setStartups(startups.filter((s) => s._id !== id));
      toast.success("Startup deleted");
    } catch (error) {
      toast.error("Sorry couldn't delete");
    }
  }

  async function handleUpdate(id, updatedFields) {
    // id is the arg used to pass in the params of put and updatedFields is the param to be passed as the updated field in the put edit
    try {
      const res = await api.put(`/startups/${id}`, updatedFields);

      setStartups((prev) =>
        prev.map((st) => (st._id === id ? { ...st, ...res.data } : st))
      );

      toast.success("Startup updated!");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to update startup");
    }
  }

  return (
    <div className="border flex flex-col gap-6 min-h-screen p-3 rounded shadow  bg-gray-700">
      {startups.length === 0 ? (
        <motion.div initial={{ opacity: 0,  }} 
  animate={{ opacity: 1,   }}
  transition={{ duration: 0.4, ease:"easeOut" }} className="flex items-center">
        <p className="text-2xl text-gray-200">No startups found</p> 
         <Link  className="text-yellow-600 transitiion ml-2 text-lg mt-2 duration-700 hover:underline " to="/RegisterStartup">Click Here to Register</Link>
        </motion.div>
      ) : (
        startups.map((s) => (
          <div key={s._id}>
            {editing[s._id] ? (
              <div className="bg-gray-200">
                <label className="text-2xl font-semibold ml-3 text-gray-600 text-center mb-6">Edit Startup Name:</label>
                <input
                  type="text"
                  value={s.name}
                  className="text-2xl p-1 m-3 border rounded-md text-gray-500"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id ? { ...st, name: e.target.value } : st
                      )
                    )
                  }
                />
                  <label className="text-2xl p-1 font-semibold text-gray-600 ml-3 text-center mb-6">Edit Cin:</label>
                <input
                  type="text"
                  value={s.cin}
                  className="text-2xl m-3 border rounded-md text-gray-500"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id ? { ...st, cin: e.target.value } : st
                      )
                    )
                  }
                />
                 <label className="text-2xl font-semibold text-gray-600 ml-3 text-center mb-6">Edit Gstin:</label>
                <input
                  type="text"
                  value={s.gstin}
                  className="text-2xl p-1 m-3.5 border rounded-md text-gray-500"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id ? { ...st, gstin: e.target.value } : st
                      )
                    )
                  }
                />
                <div className="flex items-center gap-4 ">
                  <label className="text-2xl font-semibold text-gray-600 ml-3 text-center ">Edit Industry:</label>
                <select
                  className="text-2xl p-1 border rounded-md text-gray-500"
                  value={s.industry}
                  placeholder="Edit industry"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id
                          ? { ...st, industry: e.target.value }
                          : st
                      )
                    )
                  }
                  
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
                <label className="text-2xl font-semibold text-gray-600 ml-3 text-center ">Edit Stage:</label>
                <select
                  value={s.stage}
                  className="text-2xl border p-1 rounded-md text-gray-500"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id ? { ...st, stage: e.target.value } : st
                      )
                    )
                  }
                
                  required
                >
                  <option value="">Select Stage</option>
                  <option value="Idea">Idea</option>
                  <option value="Early">Early</option>
                  <option value="Growth">Growth</option>
                  <option value="Mature">Mature</option>
                </select>
</div>          <div className="flex items-center">
  <label className="text-2xl font-semibold text-gray-600 ml-3 text-center ">Edit Description:</label> 
                <textarea
                  value={s.description}
                  className="text-2xl p-1 border rounded-md m-3 text-gray-500"
                  onChange={(e) =>
                    setStartups((prev) =>
                      prev.map((st) =>
                        st._id === s._id
                          ? { ...st, description: e.target.value }
                          : st
                      )
                    )
                  }
                />
                </div>
                <div className="flex items-center">

                <button
                  onClick={() =>
                    handleUpdate(s._id, {
                      name: s.name,
                      description: s.description,
                      cin: s.cin,
                      stage: s.stage,
                      industry: s.industry,
                      gstin: s.gstin,
                    })
                  }
                  className="text-white flex items-center ml-3.5 mb-3 justify-center transitiion duration-300 bg-green-600  px-3 py-3 border-0 rounded-lg   hover:bg-green-700"
                >
                  <Check className="text-gray-300 mr-2 h-5 w-5" />
                  Save
                   
                </button>
                <button
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, [s._id]: false }))
                  }
                  className="text-white flex items-center ml-3.5 mb-3  justify-center transitiion duration-300 bg-gray-800  px-3 py-3 border-0 rounded-lg   hover:bg-gray-700"
                >
                  <X className="text-gray-300 mr-2 h-5 w-5" />
                  Cancel
                </button>
                </div>
              </div>
            ) : (
               <motion.div
                         className="bg-gray-200 z-10 p-8 mx-auto rounded shadow-8xl w-full"
  initial={{ opacity: 0, x:50,  }} 
  animate={{ opacity: 1,  x: 0, }}
  transition={{ duration: 0.4, ease:"easeOut" }}
                        >
                          {/* x positive: right
                          x negative: left
                          y positive: below
                          y negative: above */}
              <div className="bg-gray-200 m-0 py-2 pl-6">
                <h2 className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <Tag className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                  <strong>Startup Name:</strong>
                  <p className="pl-2">{s.name}</p>
                </h2>
                <p className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <User className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                  <strong>Owner Name:</strong>
                  <p className="pl-2">{s.ownerId.name}</p>
                </p>
                <p className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <FileText className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                  <strong>Description: </strong>
                  <p className="pl-2">{s.description}</p>
                </p>
                <p className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <Hash className="text-gray-400 mr-2 h-5 mt-1 w-5" />
                  <strong>Cin: </strong> {s.cin}
                </p>
                <p className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <Factory className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                  <strong>Industry: </strong>
                  <p className="pl-2">{s.industry}</p>
                </p>
                <p className="text-2xl flex items-center  m-3.5 text-gray-500">
                  <BarChart2 className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                  <strong>Stage: </strong> <p className="pl-2">{s.stage}</p>
                </p>
                <div className="grid grid-cols-16 mb-3.5 mt-4.5">
                <button
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, [s._id]: true }))
                  }
                  className="text-white flex items-center ml-3.5 justify-center transitiion duration-300 bg-blue-600  px-3 py-3 border-0 rounded-lg   hover:bg-blue-700"
                >
                  <Edit className="text-gray-400 mr-2 h-5 w-5" />
                  Edit
                </button>
                <button
                  className="text-white flex items-center ml-3.5 justify-center transitiion duration-300 bg-red-700  px-3 py-3 border-0 rounded-lg   hover:bg-red-800"
                  onClick={() => handleDelete(s._id)}
                >
                  <Trash className="text-gray-400 mr-2 h-5 w-5" />
                  Delete
                </button>
                </div>
              </div>
               </motion.div>
            )}
          </div>
           
        ))
      )}
    </div>
  
  );
}

export default MyStartups;
