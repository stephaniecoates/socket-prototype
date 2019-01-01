import React, { Component } from "react";
import './App.css';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4001/');

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      name: "",
      message: "",
      messageArray: []
    }
    
    //socket is listening for emit events from server (aka change in array)
    socket.on('chat', (messageArray) => {
      this.setState({
        messageArray: messageArray
      })
    })
  }

  handleName (value) {
    this.setState({
      name: value
    })
  }

  handleMessage (value) {
    this.setState({
      message: value
    })
  }

  submit () {
    //emit individual message to server
    socket.emit('chat', {name: this.state.name, message: this.state.message})
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <p>SOCKET PROTO WOOOOOOO</p>
        <div style={{border: "2px solid black", height: "400px", overflow: "scroll"}} className="chat-window">
        {this.state.messageArray.map((message) => {
          return (
            <p key={message.name}>{message.name}: {message.message}</p>
          )
        })}
        </div>
        Name: <input onChange={(e) => {this.handleName(e.target.value)}}></input>
        Message: <input onChange={(e) => {this.handleMessage(e.target.value)}}></input>
        <button onClick={() => this.submit()}>Submit</button>
      </div>
    );
  }
}
export default App;
