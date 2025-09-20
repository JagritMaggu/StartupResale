require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT
const cookieParser = require("cookie-parser");
const cookie = require("cookie")
const app = express();
const server = http.createServer(app);
const startupRoutes = require("./routes/startupRoutes.js")
const authRoutes = require("./routes/auth.js")
const fetchUserRoute = require("./routes/userRoutes.js")
const {Chat} = require("./models/ChatSchema.js")
const {User} = require("./models/User.js");
const chatRoutes = require('./routes/chat.js')
const jwt = require("jsonwebtoken")

const {Server} = require('socket.io')
const io = new Server(server, { cors:{  origin: "http://localhost:5174",
    methods:["GET","POST"],
    credentials:true}
  
})
io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.jwt;

    if (!token) {
      return next(new Error("No token found"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded.id;
    socket.role = decoded.role;
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {

  socket.join(socket.userId.toString());
  socket.on("sendMessage", async ({ to, message, from, fromName, fileUrl, fileType }) => {
  if ((!message?.trim() && !fileUrl) || !to || !from) return;
  
  const receiver = await User.findById(to);
  if (!receiver) return;

  const allowedFounderAdmin =
    (socket.role === "founder" && receiver.role === "admin") ||
    (socket.role === "admin" && receiver.role === "founder");

  const allowedFounderInvestor =
    (socket.role === "founder" && receiver.role === "investor") ||
    (socket.role === "investor" && receiver.role === "founder");

  if (!allowedFounderAdmin && !allowedFounderInvestor) {
    return; // not authorized to chat
  }

  const chat = await Chat.create({
    senderId: socket.userId,
    receiverId: to,
    message: message|| " ",
    fileType: fileType || null,
    fileUrl: fileUrl || null,
  });

  io.to(to).emit("recieveMessage", {
    from: socket.userId,
    fromName: fromName,
    message: chat.message,
    fileType: chat.fileType,
    fileUrl: chat.fileUrl,
  });
   socket.on("disconnect", () => {
    console.log("Disconnected");
  });
})});


//   socket.on("sendMessage", async ({ to, message,from, fromName, fileUrl, fileType }) => {
//      if ((!message?.trim() && !fileUrl) || !to || !from) return;

//     // fetch receiver to check role
//     const receiver = await User.findById(to);
//     if (!receiver) return;

//     // Only allow founder <> admin OR founder <> investor
//     const allowedFounderAdmin =
//       (socket.role === "founder" && receiver.role === "admin") ||
//       (socket.role === "admin" && receiver.role === "founder");

//     const allowedFounderInvestor =
//       (socket.role === "founder" && receiver.role === "investor") ||
//       (socket.role === "investor" && receiver.role === "founder");

//     if (!allowedFounderAdmin && !allowedFounderInvestor) {
//       return; // not authorized to chat
//     }

//     // Save chat
//     const chat = await Chat.create({
//       senderId: from,
//       receiverId: to,
//       message,
//       fileType: fileType || null,
//       fileUrl: fileUrl || null
//     });

//     // Send to receiver if connected
//     io.to(to).emit("recieveMessage", {
//       from: socket.userId,
//       fromName: (await User.findById(socket.userId)).name,
//       message: chat.message,
//        fileType: fileType || null,
//       fileUrl: fileUrl || null
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected");
//   });
// });


server.listen(port,()=>console.log(`server is running at port:${port}`))
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes)
app.use("/api", fetchUserRoute)
app.use("/api/startups", startupRoutes)
app.use("/api", chatRoutes)
mongoose.connect(process.env.MONGO_URI);

