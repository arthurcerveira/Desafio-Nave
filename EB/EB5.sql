-- E.B.5 Faça uma querie que traga todos os projetos com sua quantidade de navers.
SELECT p.name, COUNT(p.naver_id) FROM (
    SELECT name, project_id, naver_id 
    FROM projects_navers, projects
    WHERE projects.id = project_id ) p
GROUP BY p.name;
