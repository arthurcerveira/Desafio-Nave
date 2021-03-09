const knex = require('./database');

module.exports = {
  getNavers: async () => {
    const navers = await knex('naver');

    return navers;
  },

  getNaverById: async (id) => {
    const naver = await knex('naver').where('id', id).first();

    return naver;
  },

  getNaverProjects: async (id) => {
    const naverProjects = await knex('project')
      .join('naver_project', 'project_id', '=', 'project.id')
      .where('naver_id', id)
      .select('project_id', 'project_name');

    return naverProjects;
  },

  createNaver: async (naver_name, birthdate, admission_date, job_role) => {
    const newNaver = await knex('naver').insert({
      naver_name, birthdate, admission_date, job_role,
    }, '*');

    return newNaver[0];
  },

  assignNaverToProjects: async (naverId, projects) => {
    const promises = projects.map(
      async (projectId) => knex('naver_project').insert({
        project_id: projectId,
        naver_id: naverId,
      }),
    );

    return Promise.all(promises);
  },

};
