To run Skaffold: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml

k8s secrets
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=jsaiojd13j309rj1fm

# Skaffold dev to run the clusters

C:\skaffold-windows-amd64 dev

### Useful commands

# Gets available namespaces

kubectl get namespace

# Gets available services

kubectl get services

# Gets available services inside a namespace

kubectl get services -n [ingress-nginx]

Step to do only if you are running Docker/Kubernetes on your local machine
Change into the ‘client’ directory at your terminal
Run ‘docker build -t YOURDOCKERID/client .’
Run ‘docker push YOURDOCKERID/client’
Change back to the root project directory and do the same for other services.

Run ‘skaffold dev’
