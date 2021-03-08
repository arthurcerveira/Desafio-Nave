const pool = require('./database');

module.exports = {
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
