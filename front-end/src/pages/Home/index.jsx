import './styles.css';
import io from "socket.io-client";

const socket = io("http://localhost:8080/");

function sendMessage() {
  var msgField = document.getElementById("input-msg"); 
  var msg = msgField.value;
  socket.emit("message", {msg: msg});
}

socket.on("showmsg", (data) => {
  console.log(data);
  var chat = document.getElementById("messages");
  var p = document.createElement("p");
  p.innerHTML = data.msg;
  chat.append(p);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Chat</h1>
      <div id="messages">

      </div>
      <input type="text" id="input-msg"></input>
      <button onClick={sendMessage}>Enviar</button>
      </header>
    </div>
  );
}

export default App;
