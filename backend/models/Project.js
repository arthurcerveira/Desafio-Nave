const knex = require('./database');

module.exports = {
  getProjects: async () => {
    const projects = await knex('project');

    return projects;
  },

  getProjectById: async (id) => {
    const project = await knex('project').where('id', id).first();

    return project;
  },

  getProjectNavers: async (id) => {
    const projectNavers = await knex('naver')
      .join('naver_project', 'naver_id', '=', 'naver.id')
      .where('project_id', id)
      .select('naver_id', 'naver_name', 'birthdate',
        'admission_date', 'job_role');

    return projectNavers;
  },

  createProject: async (project_name) => {
    const newProject = await knex('project').insert({
      project_name,
    }, '*');

    return newProject[0];
  },

  assignProjectToNavers: async (projectId, navers) => {
    const promises = navers.map(
      async (naverId) => knex('naver_project').insert({
        project_id: projectId,
        naver_id: naverId,
      }),
    );

    return Promise.all(promises);
  },

};
