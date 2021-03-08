const express = require('express');

const router = express.Router();
const naverController = require('./controllers/Naver');
const projectController = require('./controllers/Project');

router.get('/naver', naverController.getNavers);
router.get('/naver/:id', naverController.getNaverById);
router.post('/naver/', naverController.createNaver);

router.get('/project', projectController.getProjects);
router.get('/project/:id', projectController.getProjectById);
router.post('/project/', projectController.createProject);

module.exports = router;
