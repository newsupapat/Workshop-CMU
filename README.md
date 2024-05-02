## 01. Gitleaks

Gitleak install

```bash {"id":"01HWSY7NTNEJZ4RYNRTSMM4WJ7"}
  wget https://github.com/gitleaks/gitleaks/releases/download/v8.18.2/gitleaks_8.18.2_linux_x64.tar.gz
  tar xvf gitleaks_8.18.2_linux_x64.tar.gz
  chmod +x ./gitleaks
  export PATH=$PATH:$(pwd)/
```

Clone repository which you want to scan

```bash {"id":"01HWSY7NTNEJZ4RYNRTXH3CEAY"}
  git clone https://github.com/newsupapat/Workshop-CMU
```

Run the following command

```bash {"id":"01HWSY7NTNEJZ4RYNRV0CXJA2G"}
  gitleaks detect -s 01-gitleaks -v
```

## 02. Snyk

Snyk docker

```bash {"id":"01HWSY7NTNEJZ4RYNRTSMM4WJ7"}
docker run -it -e "SNYK_TOKEN={YOUR_TOKEN}" -v "./02-snyk:/project" snyk/snyk:node bash
```

Inside Docker

```bash {"id":"01HWSY7NTNEJZ4RYNRTXH3CEAY"}
  cd /project
  snyk test
```

To monitor

```bash {"id":"01HWSY7NTNEJZ4RYNRV0CXJA2G"}
  snyk monitor
```
