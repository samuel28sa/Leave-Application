const { connect } = require("mongoose");

const dbConnect = () => {
  connect("mongodb://localhost:27017/cyberbyteTest")
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
