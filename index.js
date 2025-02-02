const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/data", (req, res)=>{
  fs.readFile("./data.json", "utf-8", (err, jsonString)=>{
    if (err) {
      console.log(err);
    }else{
      res.json(JSON.parse(jsonString));
    }
  });
});

app.post("/data", (req, res)=>{
  let newData = req.body;
  fs.writeFile("./data.json", JSON.stringify(newData, null, 2), (err)=>{
    if(err){
      console.log(err);
      res.status(500).json({ error: "Error" });
    }else{
      console.log("Updated");
      res.json({ message: "Success" });
    }
  });
});

app.listen(8080, ()=>{
  console.log("Server Started");
});