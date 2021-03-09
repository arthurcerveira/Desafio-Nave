const naverModel = require('../models/Naver');

module.exports = {
  getNavers: async (req, res) => {
    try {
      const navers = await naverModel.getNavers();

      res.json(navers);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getNaverById: async (req, res) => {
    const { id } = req.params;

    try {
      const naver = await naverModel.getNaverById(id);
      const naverProjects = await naverModel.getNaverProjects(id);

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
      const newNaver = await naverModel.createNaver(
        name, birthdate, admission_date, job_role,
      );

      const naverId = newNaver.id;

      if (projects.length > 0) await naverModel.assignNaverToProjects(naverId, projects);

      const naverProjects = await naverModel.getNaverProjects(naverId);

      const response = newNaver;
      response.projects = naverProjects;

      res.json(response);
    } catch (err) {
      res.json({ error: err });
    }
  },
};
