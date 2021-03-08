const express = require('express');

const router = express.Router();
const controller = require('./controllers/controller');

router.get('/naver', controller.getNavers);
router.get('/naver/:id', controller.getNaverById);
router.post('/naver/', controller.createNaver);

router.get('/project', controller.getProjects);
router.get('/project/:id', controller.getProjectById);
router.post('/project/', controller.createProject);

module.exports = router;
