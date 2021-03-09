-- E.B.4 Faça uma querie que traga todos os projetos com seus respectivos navers.
SELECT projects.id, projects.name, navers.name 
FROM projects, navers, projects_navers
WHERE projects.id = projects_navers.project_id
AND navers.id = projects_navers.naver_id;