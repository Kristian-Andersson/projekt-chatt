


// komponent för att lägga till meddelande i databasen som användaren skriver i inputfältet.
class ChattMsg extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputMessage: null,
      choosenOne: [] // localstorage på userName som man väljer att prata privat med.
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
        fetch('/api/privatchatt', {
          body: '{ "privateSender": "' + localStorage.getItem("username") + '", "receiver": "' + this.state.choosenOne + '", "privateText": "' + this.state.inputMessage + '" }',
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


  fetch('/api/privatchatt').then(function (response) {
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
    return <p className="p-chatt-styling" key={msg._id}>{msg.privateSender}: {msg.privateText}</p>;
      }
    )
  }
};

class UsersList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      usersData: []
    };
  }

  componentDidMount() {
      fetch('/api/inlogg').then(function (response) {
        return response.json();
      }).then(function (result) {
        this.setState({
          usersData: result
        });

      }.bind(this))
    }

    render () {
      return this.state.usersData.map(function (user) {
                  return <li key={user._id}>{user.userName}</li>;
                }
              )
            }
}



var h1Styles = {
  color: 'white',
  fontSize: 2 + 'em',
  fontFamily: 'Raleway',
  paddingBottom: 0.3 + 'em'
};
ReactDOM.render(<div>
    <div className="user-list-wrapper">
      <ul>
        <UsersList></UsersList>
      </ul>
    </div>
    <div className="chattwrapper">
      <h1 style={h1Styles}>Privatchatt med userName</h1>
      <div className="chattbox">
        <MsgOutput></MsgOutput>
      </div>
      <ChattMsg></ChattMsg>
    </div>
  </div>,
  document.getElementById('app')
 );
