


// komponent för att lägga till meddelande i databasen som användaren skriver i inputfältet.
class ChattMsg extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputMessage: null
    };
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

  render() { console.log(localStorage.getItem("username"));
    return <div className="chatt-input">
      <input className="input-field" placeholder="Börja Chatta" onChange={this.onTextChange}></input>
      <button className="send-btn" onClick={() => {
        fetch('/api/gruppchatt', {
          body: '{ "sender": "' + localStorage.getItem("username") + '", "text": "' + this.state.inputMessage + '" }',
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
    this.setState({
      data: result
    });
  }.bind(this))
}.bind(this), 1000)
}

render() {
  return this.state.data.map(function (msg) {
    return <p className="p-chatt-styling" key={msg._id}>{msg.sender}: {msg.text}</p>;
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
