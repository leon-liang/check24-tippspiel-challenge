FROM quay.io/keycloak/keycloak:24.0.1 as development

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

WORKDIR /opt/keycloak

FROM quay.io/keycloak/keycloak:24.0.1
COPY --from=development /opt/keycloak/ /opt/keycloak/

COPY ./server.crt.pem /opt/keycloak/conf/server.crt.pem
COPY ./server.key.pem /opt/keycloak/conf/server.key.pem
COPY ./realm-export.json /opt/keycloak/data/import/realm-export.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--db=postgres", "--import-realm", "-Dkeycloak.migration.strategy=OVERWRITE_EXISTING", "--transaction-xa-enabled=false"]