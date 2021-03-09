-- E.B.2 Faça um script que limpe e crie dados nas tabelas.
DELETE FROM navers;
DELETE FROM projects;
DELETE FROM projects_navers;

INSERT INTO navers (name, job_role, birthdate, admission_date) VALUES 
    ('Fulano', 'Desenvolvedor', TO_DATE('1998-05-15', 'YYYY-MM-DD'), TO_DATE('2020-06-12', 'YYYY-MM-DD')),
    ('Ciclano', 'Designer', TO_DATE('1999-07-16', 'YYYY-MM-DD'), TO_DATE('2019-09-14', 'YYYY-MM-DD')),
    ('Beltrano', 'Gerente de projetos', TO_DATE('1997-02-22', 'YYYY-MM-DD'), TO_DATE('2017-08-10', 'YYYY-MM-DD'));

INSERT INTO projects (name) VALUES 
    ('Projeto muito Bom'),
    ('Projeto Realmente Bom');

-- Add all Navers to all projects
INSERT INTO projects_navers (project_id, naver_id)  
    SELECT projects.id, navers.id FROM projects, navers;
