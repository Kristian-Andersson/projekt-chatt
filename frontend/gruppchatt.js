


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
          body: '{ "publicSender": "' + localStorage.getItem("username") + '", "publicText": "' + this.state.inputMessage + '" }',
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
    return <p className="p-chatt-styling" key={msg._id}>{msg.publicSender}: {msg.publicText}</p>;
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


/* var Sidebar = createReactClass({
  render: function(){
    return <div className="container">
            <h1>Friends</h1>
            <div className="friendslist">
                <ul>
                    <li>Test1</li>
                    <li>Test2</li>
                    <li>Test3</li>
                    <li>Test4</li>
                </ul>
            </div>
      </div>
  }
});

*/
ReactDOM.render(
  <div>
  div className="user-list-wrapper">
    <ul>
      <UsersList></UsersList>
    </ul>
  </div>
  <div className="chattwrapper">
    <div className="chattbox">
    <MsgOutput></MsgOutput>
    </div>
    <ChattMsg></ChattMsg>
   </div>
   <Sidebar></Sidebar>

   </div>,
  document.getElementById('app')
 );
