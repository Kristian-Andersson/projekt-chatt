class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.state = {value1: ''};
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({value: event.target.value});
  }

  handlePassword(event) {
    this.setState({value1: event.target.value});
  }

  handleSubmit(event) {
    fetch('/api/inlogg', {
        body: '{ "userName": "' + this.state.value + '", "passWord": "' + this.state.value1 + '"}',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(result.ops[0].message);
      });

      event.preventDefault();
  }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          <form onSubmit={this.handleSubmit}>
          <div id="popup-inputs">
              <label class="user-name-reg">User Name :
              <button id="close-me-button" onClick={this.props.closePopup}>X</button>
              <input name="username" id="reg-username" type="text" value={this.state.value} onChange={this.handleUsername}   />
              </label>
              <label>Password :
              <input name="password" id="reg-password" type="text" value={this.state.value1} onChange={this.handlePassword}   />
              </label>             
              <button id="register-button" type="submit" value="Submit" id="submit">Register</button>
              </div>
              </form>
            <h1>{this.props.text}</h1>
          </div>
        </div>
      );
    }
  }
  class Reg extends React.Component {
    constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render() {
      return (
        <div className='reg'>
          <button id="first-reg-button" onClick={this.togglePopup.bind(this)}>Här</button>
          {this.state.showPopup ? 
            <Popup
              closePopup={this.togglePopup.bind(this)}/>       
            : null
          }
        </div>
      );
    }
  };

 