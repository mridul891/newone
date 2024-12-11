import connectDb from './db.js';


const startServer = async () => {
  await connectDb();
  console.log("Server is ready to start...");
  
};

startServer();
