oc create namespace demo-gateway
oc project demo-gateway
oc adm policy add-scc-to-group anyuid system:serviceaccounts:demo-gateway

