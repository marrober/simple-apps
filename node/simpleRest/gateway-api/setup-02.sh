oc apply -f gateway.yaml
oc create namespace demo-app
oc new-app -n demo-app --name foo-app https://github.com/openshiftdemos/cakephp-ingress-demo#foo
oc rollout status deployment -w -n demo-app foo-app
oc apply -f http-route.yaml
oc wait -n demo-gateway --for=condition=ready gateways.gateway.networking.k8s.io gateway
oc get gateways.gateway.networking.k8s.io gateway -n demo-gateway -ojsonpath='{.status.addresses[*].value}'