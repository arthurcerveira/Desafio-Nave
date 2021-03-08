/* eslint-disable camelcase */
const naverPool = require('../models/Naver');

module.exports = {
  getNavers: async (req, res) => {
    try {
      const navers = await naverPool.getNavers();

      res.json(navers);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getNaverById: async (req, res) => {
    const { id } = req.params;

    try {
      const naver = await naverPool.getNaverById(id);
      const naverProjects = await naverPool.getNaverProjects(id);

      const reponse = naver;
      reponse.projects = naverProjects;

      res.json(reponse);
    } catch (err) {
      res.json({ error: err });
    }
  },

  createNaver: async (req, res) => {
    const {
      name, birthdate, admission_date, job_role, projects,
    } = req.body;

    try {
      const newNaver = await naverPool.createNaver(
        name, birthdate, admission_date, job_role,
      );

      const naverId = newNaver.id;

      if (projects.length > 0) await naverPool.assignNaverToProjects(naverId, projects);

      const naverProjects = await naverPool.getNaverProjects(naverId);

      const response = newNaver;
      response.projects = naverProjects;

      res.json(response);
    } catch (err) {
      res.json({ error: err });
    }
  },
};
