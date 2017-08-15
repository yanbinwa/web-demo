#!/bin/bash

#docker run -d haproxy-datadog -v

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker rm -fv demo-site
docker run -d --name demo-site \
  -v $DIR/client:/usr/src/app/client \
  -v $DIR/server:/usr/src/app/server \
  -p 8080:8080 \
  demo/node-web
