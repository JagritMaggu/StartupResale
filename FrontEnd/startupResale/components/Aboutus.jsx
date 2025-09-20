import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import { motion } from "framer-motion";
import { Send, MessageCircleDashed, BadgeHelp, Paperclip } from "lucide-react";

function Aboutus() {
  const navigate = useNavigate();
  const bgStyle = {
    background: `url("/images/aboutwall.jpg") no-repeat center center fixed `,
    backgroundSize: "100% 100%",
    position: "fixed",

    minHeight: "100vh",
    height: "100vh",
    filter: "blur(8px)",
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
  return (
    <>
      <div className="relative min-h-screen   w-full overflow-hidden">
        <div style={bgStyle} className="min-h-screen min-w-screen"></div>
        <Navbar />
        <div className="Border">
          <div className="flex-1 relative text-3xl max-h-screen bg-black/20 text-amber-200 rounded-lg max-w-full overflow-y-auto  p-2 m-6">
            <motion.p
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 0.8, ease:"easeIn" }}
            >  At FounderHub, we believe that every great idea deserves the right opportunity to grow. Building a startup is more than just creating a product – it’s about finding the right people, resources, and investors who share your vision. That’s where we come in.

FounderHub is designed to be a collaborative space for founders and investors, bridging the gap between innovation and capital. For founders, it’s a platform to showcase their startups, connect directly with investors, and share essential details like stage, valuation, documents, and pitch decks in a secure environment. For investors, it’s a place to discover high-potential startups, interact meaningfully with founders through real-time chat, and make informed decisions backed by transparency.

Our mission is to simplify the startup journey by making networking smarter, fundraising easier, and collaboration seamless. Whether you are an early-stage entrepreneur looking for your first round of funding, or an experienced founder scaling to new heights, FounderHub gives you the tools to tell your story, build trust, and unlock opportunities.

We’re not just another platform – we’re a community that values innovation, professionalism, and growth. With features like integrated chat portals, secure file sharing, and structured startup profiles, FounderHub helps ensure that your ideas reach the right people at the right time.

At the heart of FounderHub lies a simple belief: startups succeed when founders and investors work together. We’re here to make that connection stronger, faster, and more meaningful.


<p className="mt-7">🚀 Why FounderHub?

Unlike traditional networking or fragmented tools, FounderHub is a complete solution. It combines startup registration, valuation, communication, and document management into one professional platform. Whether you’re an early-stage entrepreneur searching for seed capital, a growth-stage founder scaling to new markets, or an investor looking for promising opportunities, FounderHub is designed to make the process smoother, smarter, and more meaningful.

At the heart of FounderHub lies a belief: startups succeed when founders and investors collaborate with clarity and purpose. Our platform is built to make that collaboration stronger, faster, and more impactful.

FounderHub isn’t just another tool — it’s a partner in your entrepreneurial journey.
</p>
</motion.p>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
