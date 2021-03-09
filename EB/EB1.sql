-- E.B.1 Crie um script que delete e crie todas as tabelas.
DROP SCHEMA public CASCADE;
CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION nave;
SET search_path TO public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE navers ( 
    id              UUID NOT NULL DEFAULT uuid_generate_v1(), 
    name            VARCHAR(40) NOT NULL, 
    job_role        VARCHAR(40) NOT NULL, 
    birthdate       DATE, 
    admission_date  DATE, 
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),   
PRIMARY KEY (id)); 

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON navers
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS projects (
    id              UUID NOT NULL DEFAULT uuid_generate_v1(), 
    name            VARCHAR(40) NOT NULL, 
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),    
PRIMARY KEY (id)); 

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS projects_navers (
    id              SERIAL UNIQUE NOT NULL, 
    naver_id        UUID NOT NULL, 
    project_id      UUID NOT NULL, 
PRIMARY KEY (naver_id, project_id), 
FOREIGN KEY (naver_id) REFERENCES navers(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE, 
FOREIGN KEY (project_id) REFERENCES projects(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE);