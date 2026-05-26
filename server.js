const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

let users = {};
let tasks = [];
let config = {
  reward: 100,
  vipMultiplier: 2,
  notice: "Welcome to Pay Task BD Cash PRO",
  monetagScript: ""
};

// ================= USER LOGIN =================
app.post("/api/login", (req,res)=>{
  const {id,name} = req.body;

  if(!users[id]){
    users[id] = {
      id,
      name,
      points: 0,
      vip: 0,
      tasksDone: []
    };
  }

  res.json(users[id]);
});

// ================= EARN ADS =================
app.post("/api/earn",(req,res)=>{
  const {id} = req.body;

  let reward = config.reward;

  if(users[id]?.vip > 0){
    reward *= config.vipMultiplier;
  }

  users[id].points += reward;

  res.json(users[id]);
});

// ================= TASK SYSTEM =================
app.post("/api/task/add",(req,res)=>{
  const task = req.body;
  task.id = Date.now();
  tasks.push(task);
  res.json(task);
});

app.get("/api/tasks",(req,res)=>{
  res.json(tasks);
});

app.post("/api/task/complete",(req,res)=>{
  const {userId,taskId} = req.body;

  let task = tasks.find(t=>t.id==taskId);
  if(!task) return res.json({error:"no task"});

  users[userId].points += task.reward;
  users[userId].tasksDone.push(taskId);

  res.json({success:true});
});

// ================= ADMIN CONFIG =================
app.post("/api/admin/config",(req,res)=>{
  config = {...config,...req.body};
  res.json(config);
});

app.get("/api/config",(req,res)=>{
  res.json(config);
});

app.listen(3000,()=>{
  console.log("PRO SERVER RUNNING");
});
