const express = require("express");
const cors = require("cors");
const { sequelize, worker } = require("./models");
const app = express();
const port = 3000;
const { Op } = require("sequelize");

app.use(cors());

// Enable JSON body parsing for all routes
app.use(express.json());

//Create a new worker
app.post("/create", async (req, res) => {
  const Worker = await worker.create({
    name: req.body.name,
    surname: req.body.surname,
    dateOfBirth: req.body.DoB,
    employeeNumber: req.body.eNumber,
    salary: req.body.salary,
    role: req.body.role,
    superior: req.body.superior,
  });
  console.log(req.body);
  res.json(Worker);
});

//Search Using Employee Number
app.post("/search/:eNumber", async (req, res) => {
  const Worker = await worker.findAll({
    where: {
      employeeNumber: req.body.searchByEmployeeNumber,
    },
  });
  res.json(Worker);
});

//Search Using Date
app.post("/searchByDate", async (req, res) => {
  const Worker = await worker.findAll({
    where: {
      dateOfBirth:{
        [Op.gte]: req.body.searchByDate
      }
    },
  });
  res.json(Worker);
});

app.get("/fullView", async (req, res) => {
  console.log(req.params.date);
  res.json(req.params.date);
});

//Update Worker
app.put("/update", async (req, res) => {
  const Worker = await worker.update(
    {
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.DoB,
      salary: req.body.salary,
      role: req.body.role,
      superior: req.body.superior,
    },
    {
      where: {
        employeeNumber: req.body.eNumber,
      },
    }
  );
  console.log(req.body);
  res.json(Worker);
}),

//Delete an employee
app.delete("/delete/:uuid", async (req, res) => {
  const Worker = await worker.destroy({
    where: {
      uuid: req.params.uuid,
    },
  });
  res.send("User Deleted");
});

//Get all superiors
app.get("/superior", async (req, res) => {
  const Superiors = await worker.findAll({
    where: {
      [Op.or]: [{ role: "Manager" }, { role: "Employee" }],
    },
  });
  res.json(Superiors);
});

//View all workrers
app.get("/workers", async (req, res) => {
  const workers = await worker.findAll();
  res.json(workers);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
