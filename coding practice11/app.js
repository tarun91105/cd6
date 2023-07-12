const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19India.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
//getting the states
app.get("/states/", async (request, response) => {
  const query = `select * from state`;
  const data = await db.all(query);
  response.send(
    data.map((k) => ({
      stateId: k.state_id,
      stateName: k.state_name,
      population: k.population,
    }))
  );
});
//API 2
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const query = `select * from state where state_id='${stateId}';`;
  const k = await db.get(query);
  response.send({
    stateId: k.state_id,
    stateName: k.state_name,
    population: k.population,
  });
});
//API 3
app.post("/districts/", async (request, response) => {
  const body = request.body;
  const { a, b, c, d, e, f } = body;
  const query = `insert into district(district_name,state_id,
    cases,cured,active,deaths) values('${a}','${b}','${c}','${d}','${e}','${f}')`;
  const data = await db.run(query);
  response.send("District Successfully Added");
});
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const query = `select * from district where district_id='${districtId}'`;
  const data = await db.get(query);
  response.send({
    districtId: data.district_id,
    districtName: data.district_name,
    stateId: data.state_id,
    cases: data.cases,
    cured: data.cured,
    active: data.active,
    deaths: data.deaths,
  });
});
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const query = `delete from district where district_id='${districtId}'`;
  const data = await db.run(query);
  response.send("District Removed");
});
app.put("/districts/:districtId/", async (request, response) => {
  const body = request.body;
  const { districtId } = request.params;
  const { a, b, c, d, e, f } = body;
  const query = `update district set
    "district_name"='${a}',
    "state_id"='${b}',
    "cases"='${c}',
    "cured"='${d}',
    "active"='${e}',
    "deaths"='${f}'
    where district_id='${districtId}'`;
  const data = await db.run(query);
  response.send("District Details Updated");
});
app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const query = `select sum(cases) as cases,sum(cured) as cured,sum(active) as active,sum(deaths) as deaths from state natural join district where state_id='${stateId}'`;
  const k = await db.get(query);
  response.send({
    totalCases: k.cases,
    totalCured: k.cured,
    totalActive: k.active,
    totalDeaths: k.deaths,
  });
});
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const query = `select state_id as stateId from district where district_id='${districtId}'`;
  const data = await db.get(query);
  const query2 = `select state_name as stateName from state where state_id='${data.stateId}'`;
  const data2 = await db.get(query2);
  response.send({ stateName: data2.stateName });
});

module.exports = app;
const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19India.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
//getting the states
app.get("/states/", async (request, response) => {
  const query = `select * from state`;
  const data = await db.all(query);
  response.send(
    data.map((k) => ({
      stateId: k.state_id,
      stateName: k.state_name,
      population: k.population,
    }))
  );
});
//API 2
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const query = `select * from state where state_id='${stateId}';`;
  const k = await db.get(query);
  response.send({
    stateId: k.state_id,
    stateName: k.state_name,
    population: k.population,
  });
});
//API 3
app.post("/districts/", async (request, response) => {
  const body = request.body;
  const { a, b, c, d, e, f } = body;
  const query = `insert into district(district_name,state_id,
    cases,cured,active,deaths) values('${a}','${b}','${c}','${d}','${e}','${f}')`;
  const data = await db.run(query);
  response.send("District Successfully Added");
});
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const query = `select * from district where district_id='${districtId}'`;
  const data = await db.get(query);
  response.send({
    districtId: data.district_id,
    districtName: data.district_name,
    stateId: data.state_id,
    cases: data.cases,
    cured: data.cured,
    active: data.active,
    deaths: data.deaths,
  });
});
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const query = `delete from district where district_id='${districtId}'`;
  const data = await db.run(query);
  response.send("District Removed");
});
app.put("/districts/:districtId/", async (request, response) => {
  const body = request.body;
  const { districtId } = request.params;
  const { a, b, c, d, e, f } = body;
  const query = `update district set
    "district_name"='${a}',
    "state_id"='${b}',
    "cases"='${c}',
    "cured"='${d}',
    "active"='${e}',
    "deaths"='${f}'
    where district_id='${districtId}'`;
  const data = await db.run(query);
  response.send("District Details Updated");
});
app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const query = `select sum(cases) as cases,sum(cured) as cured,sum(active) as active,sum(deaths) as deaths from state natural join district where state_id='${stateId}'`;
  const k = await db.get(query);
  response.send({
    totalCases: k.cases,
    totalCured: k.cured,
    totalActive: k.active,
    totalDeaths: k.deaths,
  });
});
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const query = `select state_id as stateId from district where district_id='${districtId}'`;
  const data = await db.get(query);
  const query2 = `select state_name as stateName from state where state_id='${data.stateId}'`;
  const data2 = await db.get(query2);
  response.send({ stateName: data2.stateName });
});

module.exports = app;
