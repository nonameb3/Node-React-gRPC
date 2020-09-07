import React from "react";
import logo from "./logo.svg";
import "./App.css";

const { GreetServiceClient } = require("./grpc/main/proto/greet/greet_grpc_web_pb");
const { GreetRequest, Empty, Greeting } = require("./grpc/main/proto/greet/greet_pb");

const client = new GreetServiceClient("http://localhost:9090", null, null);

// call Stream from server
const call = client.greetManyTimes(new GreetRequest());
call.on("data", function (response) {
  console.log(response.getResult());
});

function callGreet() {
  const request = new GreetRequest();
  const greeting = new Greeting();
  greeting.setFirstName("waraphon");
  greeting.setLastName("roonnapai");
  request.setGreeting(greeting);

  client.greet(request, {}, (err, response) => {
    if (response == null) {
      console.log("error", err);
    } else {
      console.log("response", response.getResult());
    }
  });
}

function callTest() {
  const request = new Empty();
  client.testConnection(request, {}, (err, response) => {
    if (response == null) {
      console.log("error", err);
    } else {
      console.log("response", response.getStatus());
    }
  });
}

// call direct to stream server , no response
function callGreetManyTimes() {
  const request = new GreetRequest();
  const greeting = new Greeting();
  greeting.setFirstName("waraphon");
  greeting.setLastName("roonnapai");
  request.setGreeting(greeting);

  client.greetManyTimes(request, {}, (err, response) => {
    if (response == null) {
      console.log("error", err);
    } else {
      console.log("response", response.getResult());
    }
  });
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <button style={{ padding: 10 }} onClick={callTest}>
          Click for grpc TestConnection request
        </button>
        <button style={{ padding: 10 }} onClick={callGreet}>
          Click for grpc Greet request
        </button>
        <button style={{ padding: 10 }} onClick={callGreetManyTimes}>
          Click for grpc callGreetManyTimes request
        </button>
      </header>
    </div>
  );
}

export default App;
