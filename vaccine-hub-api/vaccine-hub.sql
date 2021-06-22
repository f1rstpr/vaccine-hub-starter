\echo "Delete and recreate vaccine_hub"
\prompt "Return for yes or ctrl c to cancel > " answer


DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

\i vaccine-hub-schema.sql

-- psql -U postgres -f vaccine-hub.sql


