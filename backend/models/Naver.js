/* eslint-disable camelcase */
const pool = require('./database');

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
};
