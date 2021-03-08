/* eslint-disable camelcase */
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'nave',
  password: 'nave',
  database: 'nave_dev',
  host: 'db', // Docker-compose host for postgres
  port: 5432,
  options: '-c search_path=nave_schema',
});

// Set up DB tables
fs.readFile('/usr/src/models/DDL.sql',
  'utf8',
  async (err, data) => pool.query(data));

module.exports = {
  getNavers: async () => {
    const navers = await pool.query('SELECT * FROM naver;');

    return navers.rows;
  },

  getNaverById: async (id) => {
    const naver = await pool.query(`SELECT * FROM naver WHERE id = ${id};`);

    return naver.rows[0];
  },

  getNaverProjects: async (id) => {
    const naverProjects = await pool.query(
      `SELECT project_id, project_name FROM project,
       naver_project WHERE naver_id = ${id}
       AND project_id = project.id;`,
    );

    return naverProjects.rows;
  },

  createNaver: async (name, birthdate, admission_date, job_role) => {
    const newNaver = await pool.query(
      `INSERT INTO naver (naver_name, birthdate, admission_date, job_role) \
         VALUES ('${name}', TO_DATE('${birthdate}', 'YYYY/MM/DD'), \
         TO_DATE('${admission_date}', 'YYYY/MM/DD'), '${job_role}')  \
         RETURNING *;`,
    );

    return newNaver.rows[0];
  },

  assignNaverToProjects: async (naverId, projects) => {
    const projectsValue = projects.reduce(
      (value, projectId) => `${value}(${projectId}, ${naverId}),`,
      '',
    );

    await pool.query(
      `INSERT INTO naver_project (project_id, naver_id) 
           VALUES ${projectsValue.slice(0, -1)};`,
    );

    return true;
  },

  getProjects: async () => {
    const projects = await pool.query('SELECT * FROM project;');

    return projects.rows;
  },

  getProjectById: async (id) => {
    const project = await pool.query(`SELECT * FROM project WHERE id = ${id};`);

    return project.rows[0];
  },

  getProjectNavers: async (id) => {
    const projectNavers = await pool.query(
      `SELECT naver_id, naver_name, birthdate, admission_date, job_role
       FROM naver_project, naver WHERE project_id = ${id}
       AND naver_id = naver.id;`,
    );

    return projectNavers.rows;
  },

  createProject: async (name) => {
    const newProject = await pool.query(
      `INSERT INTO project (project_name)
       VALUES ('${name}') RETURNING *;`,
    );

    return newProject.rows[0];
  },

  assignProjectToNavers: async (projectId, navers) => {
    const naversValue = navers.reduce(
      (value, naverId) => `${value}(${projectId}, ${naverId}),`,
      '',
    );

    await pool.query(
      `INSERT INTO naver_project (project_id, naver_id)
       VALUES ${naversValue.slice(0, -1)};`,
    );

    return true;
  },

};
