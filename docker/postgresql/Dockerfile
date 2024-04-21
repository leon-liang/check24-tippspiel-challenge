FROM postgres:16.2-bullseye

COPY ./scripts/db_init.sh /docker-entrypoint-initdb.d/db_init.sh

ENV POSTGRES_MULTIPLE_DATABASES=master,keycloak

EXPOSE 5432