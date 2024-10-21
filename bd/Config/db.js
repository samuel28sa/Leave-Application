const { connect } = require("mongoose")

const dbConnect = () => {
    connect("mongodb://localhost:27017/CyberbyteTest")
        .then(({ data }) => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = dbConnect
