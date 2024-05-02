# Kubernetes deployment


### Deploy

Ensure to be inside the `k8s/` directory of this repository.

```bash
kubectl apply -f .
```


### View

Retrieve the load balancer URL
```bash
$ kubectl get svc dvwa-web-service -n dvwa
NAME               TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)          AGE
dvwa-web-service   LoadBalancer   10.1.8.181   34.221.167.111   80:32198/TCP   4h32m
```
Then open http://34.321.167.111 
