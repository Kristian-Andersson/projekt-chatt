
// komponent för att lägga till meddelande i databasen som användaren skriver i inputfältet.
class ChattMsg extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputMessage: null,
      id: []
    };
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

  componentDidMount() {

    fetch('/api/gruppchatt').then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result);
      this.setState({
        // vet ej hur man ska connecta med rätt id beroende på användare inloggad. om userName + passWord matchar något av "userName" + "passWord" i users collection = skickas vidare.? userName + passWord + userId sparas utöver i users collectionen, beroende på vem som är inloggad och används när det behövs hämtas? när användaren loggar ut raderas denna "utöver" datan och återskapas så fort användaren loggar in igen?
        id: result.usersCollection[0]._id
      });
    }.bind(this))
  }
  render() {
    return <div className="chatt-input">
      <input className="input-field" placeholder="Börja Chatta" onChange={this.onTextChange}></input>
      <button className="send-btn" onClick={() => {
        fetch('/api/gruppchatt', {
          body: '{ "userId": "' + this.state.id + '", "text": "' + this.state.inputMessage + '" }',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          console.log(result);
        });
      }}>Send</button>
      </div>
  }
};

// komponent för att hämta databas collection "users" och sedan skriva ut det i chattbox diven.
class MsgOutput extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };

  }

componentDidMount() {
setInterval(function () {


  fetch('/api/gruppchatt').then(function (response) {
  return response.json();
}).then(function (result) {
  console.log(result);
    this.setState({
      data: result.messagesCollection
    });
  })
}.bind(this), 3000)
}

render() { // vet ej hur jag ska mappa två stycken arrayer så att den tar username från result.usersCollection.userName
  return this.state.data.map(function (msg) {
    return <p className="p-chatt-styling" key={msg._id}>username: {msg.text}</p>;
      }
    )
  }
}



ReactDOM.render(
  <div className="chattwrapper">
    <div className="chattbox">
      <MsgOutput></MsgOutput>
    </div>
    <ChattMsg></ChattMsg>
  </div>,
  document.getElementById('app')
 );


// // gruppchatt.js:
// module.exports = ChattMsg;
//
//
// // I en annan fil:
// // -----------------
// // ett till exempel på hur man kan göra
// module.exports = {
//   ChattMsg: ChattMsg,
//   MsgOutput: MsgOutput
// };
//
// var ChattMsg = require('./gruppchatt').ChattMsg;
// var MsgOutput = require('./gruppchatt').MsgOutput;
//
// // -----------------
// // använd denna i index.js
// var {ChattMsg, MsgOutput} = require('./gruppchatt');



// var usersObject = {};
// usersObject = users.forEach(function (user) {
//   usersObject[user._id] = user;
// });
