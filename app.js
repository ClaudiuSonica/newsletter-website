const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { parse } = require("path");
const { request } = require("http");
const port = 3000;

const app = express();



app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/f90d6d6211";

  const options = {
    method: "post",
    auth: "claudiu:4f56f48f4cc2b639efaae1e14e875cb7-us10"
  }

  const request =  https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })


  request.write(jsonData);
  request.end();
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});




 