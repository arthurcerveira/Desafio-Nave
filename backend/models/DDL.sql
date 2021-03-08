CREATE SCHEMA IF NOT EXISTS nave_schema AUTHORIZATION nave;
SET search_path TO nave_schema;
SET client_min_messages TO WARNING;

CREATE TABLE IF NOT EXISTS naver ( 
    id              SERIAL UNIQUE NOT NULL, 
    naver_name      VARCHAR(40) NOT NULL, 
    birthdate       DATE, 
    admission_date  DATE, 
    job_role        VARCHAR(40) NOT NULL, 
PRIMARY KEY (id)); 

CREATE TABLE IF NOT EXISTS project (
    id              SERIAL UNIQUE NOT NULL, 
    project_name    VARCHAR(40) NOT NULL, 
PRIMARY KEY (id)); 

CREATE TABLE IF NOT EXISTS naver_project ( 
    naver_id        INT NOT NULL, 
    project_id      INT NOT NULL, 
PRIMARY KEY (naver_id, project_id), 
FOREIGN KEY (naver_id) REFERENCES naver(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE, 
FOREIGN KEY (project_id) REFERENCES project(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE);