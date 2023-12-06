const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://gofordivya:ErpiAa2NrXN2aerp@cluster0.4cq6yxd.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongoose databse connnection established"))
  .catch(() => console.log("mongooose database failed to connect"));

module.exports = mongoose;
