

## Install package and start

At root folder

```
 $ cd server && npm i && npm start
 $ cd react-client && npm i && npm start
```

## Run Envoy

At root folder

```
 $ docker build -t nonameb3/node-react-grpc ./react-client/src
 $ docker run -d -p 9090:9090 nonameb3/node-react-grpc

```

Or on react-client/src/

```
 $ docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
  -p 9090:8080 -p 9901:9901 envoyproxy/envoy:v1.15.0
```

## Generate client-side code in javascript, *** Done in repo - No need to run this script

```
 $protoc -I=. src/grpc/main/proto/greet/greet.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```
