const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cron = require('node-cron');
const moment = require('moment');
const User = require("./models/User");

dotenv.config();
const app = express();



cron.schedule('* * * * *', async () => {
  console.log("Running cron job to check for accounts without can_open after 10 minutes");

  try {
    const users = await User.find({ can_open: false });
    const currentTime = moment();

    users.forEach(async (user) => {
      const createdAt = moment(user.createdAt);
      const diffMinutes = currentTime.diff(createdAt, 'minutes');

      if (diffMinutes >= 1) {
        await User.findByIdAndDelete(user._id);
        console.log(`Deleted user with ID: ${user._id}`);
      }
    });
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

// Use async/await for mongoose connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);


app.listen(8000, () => {
  console.log("Server running");
});

////26022002Nguyen log
//AUTHENTICATION(SO SÁNH DỮ LIỆU)
//AUTHORIZATION(PHÂN QUYỀN)
