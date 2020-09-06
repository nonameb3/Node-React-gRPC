const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./proto/greet.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const greetProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

function onGreetManyTimes(stream) {
  function loop() {
    stream.write({ result: "stream" });
    setTimeout(loop, 3000);
  }

  setTimeout(loop, 3000);
}

function onTestConnect(call, callback) {
  return callback(null, { status: "this is testConnect response." });
}

function onGreet(call, callback) {
  let request = { first_name: "", last_name: "" };
  if (!!call.request.greeting) {
    request = call.request.greeting;
  }
  return callback(null, { result: `this is greet response, ${request.first_name} ${request.last_name}` });
}

// request, response grpc handle
server.addService(greetProto.greet.GreetService.service, {
  TestConnection: onTestConnect,
  Greet: onGreet,
  GreetManyTimes: onGreetManyTimes,
});

server.bindAsync("0.0.0.0:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) return console.log("error: ", err.message);
  server.start();
  console.log("server start at: " + port);
});
