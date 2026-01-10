# Référence infra K8s (à destination des apps)

Ce dépôt installe et maintient l'infrastructure partagée du cluster K3s (ingress, TLS, stockage, monitoring, registry). Les dépôts applicatifs peuvent s'appuyer dessus pour publier leurs services via Gateway API/Envoy avec certificats Let's Encrypt et stockage Longhorn.

## Vue d'ensemble
- Déploiement automatisé par GitHub Actions dans [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) : connexion Tailscale, installation kubectl/helm, puis application des manifestes.
- Namespaces socle créés dans [manifests/namespaces/all.yaml](manifests/namespaces/all.yaml) : `cert-manager`, `envoy-gateway-system`, `monitoring`, `longhorn-system`, `registry`, `minio` (ajoutez vos namespaces applicatifs au besoin).
- Entrée réseau : Envoy Gateway + Gateway API (classe `envoy`) via [k8s/gateway-api/gateway.yaml](k8s/gateway-api/gateway.yaml), DNS `*.necsus.dev`, certificats gérés par cert-manager/Let's Encrypt via [k8s/gateway-api/certificates.yaml](k8s/gateway-api/certificates.yaml).
- Stockage : Longhorn déployé avec Helm et valeurs [k8s/longhorn/values.yaml](k8s/longhorn/values.yaml), backup MinIO déployé par Helm.
- Observabilité : kube-prometheus-stack, Grafana, Loki, Alloy, Alertmanager (manifestes sous `k8s/monitoring/`).
- Registry privé : manifests dans [k8s/registry](k8s/registry), exposé en HTTPS avec Basic Auth.

## Secrets GitHub requis pour la pipeline
Références dans [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) :
- `TAILSCALE_AUTHKEY`, `KUBECONFIG`.
- Hash htpasswd SHA pour les Basic Auth : `LONGHORN_AUTH`, `PROMETHEUS_AUTH`, `ALERTMANAGER_AUTH`, `LOKI_AUTH`, `REGISTRY_PASSWORD` (utilisé pour générer `registry-auth`).
- Optionnel Postgres minimal : `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` pour le secret `postgres-secret` appliqué avant les manifestes Postgres.

## Checklist d'onboarding d'une application
1) **Namespace** : créez un namespace dédié dans votre repo (ou ajoutez-le à `manifests/namespaces/all.yaml` si centralisé).
2) **Image et registry** : poussez vos images vers `registry.necsus.dev` (Basic Auth). Ajoutez un `imagePullSecret` si vous ne déployez pas dans le namespace `registry`.
3) **Service + HTTPRoute** : exposez votre service via le Gateway principal.

Exemple d'HTTPRoute pour `app.example.com` pointant sur un Service `app` port 8080 :
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: app
  namespace: app-namespace
spec:
  parentRefs:
    - name: main-gateway
      namespace: envoy-gateway-system
      sectionName: app-https
  hostnames:
    - app.example.com
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: app
          port: 8080
```

4) **Listener + certificat** :
- Ajouter un listener dédié dans [k8s/gateway-api/gateway.yaml](k8s/gateway-api/gateway.yaml) avec `hostname: app.example.com` et `certificateRefs` vers un secret TLS.
- Créer le `Certificate` dans `envoy-gateway-system` en s'inspirant de [k8s/gateway-api/certificates.yaml](k8s/gateway-api/certificates.yaml) en pointant sur `ClusterIssuer letsencrypt-prod`.

5) **Authentification (optionnel)** : si Basic Auth requis, ajoutez une `SecurityPolicy` Envoy dans le namespace applicatif en suivant [k8s/envoy-gateway/security-policies.yaml](k8s/envoy-gateway/security-policies.yaml) et créez le secret htpasswd référencé.

6) **NetworkPolicies** :
- Par défaut les namespaces infra sont en deny-all (voir [k8s/networkpolicies/default-deny.yaml](k8s/networkpolicies/default-deny.yaml)). Reproduisez ce modèle pour votre namespace, puis autorisez explicitement l'accès depuis `envoy-gateway-system` vers votre service.
- Exemple minimal d'allow depuis le Gateway :
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-envoy-gateway
  namespace: app-namespace
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: envoy-gateway-system
```

7) **Stockage** : utilisez la StorageClass Longhorn (par défaut `longhorn`) pour vos PVC. Exemple :
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
  namespace: app-namespace
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: longhorn
  resources:
    requests:
      storage: 5Gi
```

8) **Observabilité** :
- Métriques : exposez un endpoint Prometheus et ajoutez un `ServiceMonitor` (le CRD est installé par kube-prometheus-stack).
- Logs : Alloy est déployé (voir valeurs dans [k8s/monitoring/alloy-values.yaml](k8s/monitoring/alloy-values.yaml)). Assurez-vous que vos pods écrivent sur stdout/err ; ajoutez des labels si vous voulez des filtres dédiés.

9) **Bases de données partagées** : un Postgres monocopie est fourni dans `database` (voir [k8s/postgres/service-postgres.yaml](k8s/postgres/service-postgres.yaml)). Hôte interne : `postgres.database.svc.cluster.local:5432`. Gérez vos schémas/migrations côté application.

## Flux de déploiement (rappel)
1. Création des namespaces puis installation des CRD Gateway API et cert-manager.
2. Déploiement Helm : cert-manager, Envoy Gateway, Longhorn, MinIO, kube-prometheus-stack, Loki, Grafana Alloy.
3. Application des manifestes métiers : GatewayClass, Gateway, ReferenceGrants, SecurityPolicies, NetworkPolicies, HTTPRoutes, PDB, HPA, registry, Postgres minimal.
4. Vérifications finales (pods, HPA, PDB, certificats, events).

## Bonnes pratiques pour les repos applicatifs
- Garder les manifestes applicatifs dans votre repo, ce dépôt restant la source de vérité de l'infra partagée.
- Versionner vos images et chart Helm explicitement ; éviter `latest`.
- Toujours créer un namespace isolé et des NetworkPolicies restrictives.
- Documenter dans vos READMEs le hostname, les ports et les secrets utilisés par votre app.
