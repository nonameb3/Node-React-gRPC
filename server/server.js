const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("ping_pong.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const pingPongProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(pingPongProto.pingpong.PingPongService.service, {
  pingPong: function (call, callback) {
    console.log("Request");
    return callback(null, { pong: "Pong" });
  },
});

server.bind("0.0.0.0:8080", grpc.ServerCredentials.createInsecure());
server.start();
