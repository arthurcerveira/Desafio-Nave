const projectModel = require('../models/Project');

module.exports = {
  getProjects: async (req, res) => {
    try {
      const projects = await projectModel.getProjects();

      res.json(projects);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getProjectById: async (req, res) => {
    const { id } = req.params;

    try {
      const project = await projectModel.getProjectById(id);

      const projectNavers = await projectModel.getProjectNavers(id);

      const reponse = project;
      reponse.navers = projectNavers;

      res.json(reponse);
    } catch (err) {
      res.json({ error: err });
    }
  },

  createProject: async (req, res) => {
    const { name, navers } = req.body;

    try {
      const newProject = await projectModel.createProject(name);

      const projectId = newProject.id;

      if (navers.length > 0) await projectModel.assignProjectToNavers(projectId, navers);

      const projectNavers = await projectModel.getProjectNavers(projectId);

      const response = newProject;
      response.navers = projectNavers;

      res.json(response);
    } catch (err) {
      res.json({ error: err });
    }
  },
};
