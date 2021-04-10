require("dotenv").config();
module.exports = {
  url: process.env.MONGO_DB_URL,
  secretOrKey: process.env.SECRET_KEY,
};
