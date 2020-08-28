import React from "react";
import logo from "./logo.svg";
import "./App.css";

const { PingPongServiceClient } = require("./grpc/main/proto/ping_pong_grpc_web_pb");
const { PingRequest, PongResponse } = require("./grpc/main/proto/ping_pong_pb.js");

var client = new PingPongServiceClient("http://localhost:9090", null, null);

function App() {
  function callGrpcService() {
    const request = new PingRequest();
    request.setPing("Ping");

    client.pingPong(request, {}, (err, response) => {
      if (response == null) {
        console.log("error", err);
      } else {
        console.log("response", response.getPong());
      }
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <button style={{ padding: 10 }} onClick={callGrpcService}>
          Click for grpc request
        </button>
      </header>
    </div>
  );
}

export default App;
