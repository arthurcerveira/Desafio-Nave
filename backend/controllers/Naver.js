const naverModel = require('../models/Naver');

module.exports = {
  getNavers: async (req, res) => {
    try {
      const navers = await naverModel.getNavers();

      if (navers.length === 0) res.json({
          message: 'Nenhum Naver encontrado'
        })
      else res.json(navers);

    } catch (err) {
      res.json({ error: err });
    }
  },

  getNaverById: async (req, res) => {
    const { id } = req.params;

    try {
      const naver = await naverModel.getNaverById(id);

      if (!naver) res.json({
          message: `Nenhum Naver encontrado com ID ${id}`
        })
      else {
        const naverProjects = await naverModel.getNaverProjects(id);

        const reponse = naver;
        reponse.projects = naverProjects;

        res.json(reponse);
      }

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
