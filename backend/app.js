/* eslint-disable camelcase */
/* eslint-disable no-console */

const express = require('express');

const app = express();
const port = 5000;

const pool = require('./db');

app.use(express.json());

// Get all navers
app.get('/naver', async (req, res) => {
  try {
    const navers = await pool.query('SELECT * FROM naver;');

    res.json(navers.rows);
  } catch (err) {
    console.log(err);
  }
});

// Get specific naver
app.get('/naver/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const naver = await pool.query(`SELECT * FROM naver WHERE id = ${id};`);

    const naverProjects = await pool.query(
      `SELECT project_id, project_name FROM project,
       naver_project WHERE naver_id = ${id}
       AND project_id = project.id;`,
    );

    const reponse = naver.rows[0];
    reponse.projects = naverProjects.rows;

    res.json(reponse);
  } catch (err) {
    console.log(err);
  }
});

// Create a new naver
app.post('/naver', async (req, res) => {
  const {
    name, birthdate, admission_date, job_role, projects,
  } = req.body;

  try {
    const newNaver = await pool.query(
      `INSERT INTO naver (naver_name, birthdate, admission_date, job_role) \
       VALUES ('${name}', TO_DATE('${birthdate}', 'YYYY/MM/DD'), \
       TO_DATE('${admission_date}', 'YYYY/MM/DD'), '${job_role}')  \
       RETURNING *;`,
    );

    const naverId = newNaver.rows[0].id;

    if (projects.length > 0) {
      const projectsValue = projects.reduce(
        (value, projectId) => `${value}(${projectId}, ${naverId}),`,
        '',
      );

      await pool.query(
        `INSERT INTO naver_project (project_id, naver_id) 
         VALUES ${projectsValue.slice(0, -1)};`,
      );
    }

    const naverProjects = await pool.query(
      `SELECT project_id, project_name FROM project,
       naver_project WHERE naver_id = ${naverId}
       AND project_id = project.id;`,
    );

    const response = newNaver.rows[0];
    response.projects = naverProjects.rows;

    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

// Get all projects
app.get('/project', async (req, res) => {
  try {
    const projects = await pool.query('SELECT * FROM project;');

    res.json(projects.rows);
  } catch (err) {
    console.log(err);
  }
});

// Get a specific project
app.get('/project/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await pool.query(`SELECT * FROM project WHERE id = ${id};`);

    const projectNavers = await pool.query(
      `SELECT naver_id, naver_name, birthdate, admission_date
       FROM naver_project, naver WHERE project_id = ${id}
       AND naver_id = naver.id;`,
    );

    const reponse = project.rows[0];
    reponse.navers = projectNavers.rows;

    res.json(reponse);
  } catch (err) {
    console.log(err);
  }
});

// Create a new project
app.post('/project', async (req, res) => {
  const { name, navers } = req.body;

  try {
    const newProject = await pool.query(
      `INSERT INTO project (project_name) 
       VALUES ('${name}') RETURNING *;`,
    );

    const projectId = newProject.rows[0].id;

    if (navers.length > 0) {
      const naversValue = navers.reduce(
        (value, naverId) => `${value}(${projectId}, ${naverId}),`,
        '',
      );

      await pool.query(
        `INSERT INTO naver_project (project_id, naver_id) 
         VALUES ${naversValue.slice(0, -1)};`,
      );
    }

    const projectNavers = await pool.query(
      `SELECT naver_id, naver_name, birthdate, admission_date
       FROM naver_project, naver WHERE project_id = ${projectId}
       AND naver_id = naver.id;`,
    );

    const response = newProject.rows[0];
    response.navers = projectNavers.rows;

    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
