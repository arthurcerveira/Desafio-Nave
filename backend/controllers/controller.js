/* eslint-disable camelcase */
const pool = require('../models/db');

module.exports = {
  getNavers: async (req, res) => {
    try {
      const navers = await pool.getNavers();

      res.json(navers);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getNaverById: async (req, res) => {
    const { id } = req.params;

    try {
      const naver = await pool.getNaverById(id);
      const naverProjects = await pool.getNaverProjects(id);

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
      const newNaver = await pool.createNaver(
        name, birthdate, admission_date, job_role,
      );

      const naverId = newNaver.id;

      if (projects.length > 0) await pool.assignNaverToProjects(naverId, projects);

      const naverProjects = await pool.getNaverProjects(naverId);

      const response = newNaver;
      response.projects = naverProjects;

      res.json(response);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getProjects: async (req, res) => {
    try {
      const projects = await pool.getNavers();

      res.json(projects);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getProjectById: async (req, res) => {
    const { id } = req.params;

    try {
      const project = await pool.getProjectById(id);

      const projectNavers = await pool.getProjectNavers(id);

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
      const newProject = await pool.createProject(name);

      const projectId = newProject.id;

      if (navers.length > 0) await pool.assignProjectToNavers(projectId, navers);

      const projectNavers = await pool.getProjectNavers(projectId);

      const response = newProject;
      response.navers = projectNavers;

      res.json(response);
    } catch (err) {
      res.json({ error: err });
    }
  },

};
