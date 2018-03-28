class NameForm extends React.Component {
    constructor(props) {
      super();
      this.state = {
        value: '',
        value1: ''
      };
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
          console.log(result.ops[0]);
        });

      event.preventDefault();

      localStorage.setItem("username", this.state.value);

    }

    render() {
      return (
        <div className="container">
          <div className="main">
            <h2>Logga in på ProjektChatt</h2>
            <form onSubmit={this.handleSubmit}>
              <label>User Name :
              <input name="username" id="username" type="text"  />
              </label>
              <label>Password :
              <input name="password" id="password" type="text"  />
              </label>
              <button type="submit" value="Submit" id="submit">Go!</button>
              <p className="inlogg-p">Inget konto? Klicka </p>
              </form>
            <Reg />
          </div>
        </div>
      );
    }
  };

 /*
  class InloggHandler extends React.Component {
        constructor(props) {
          super();
          this.state = {
            data: []
          };

        }
        componentDidMount() {
          fetch('/api/inlogg').then(function (response) {
            return response.json();
          }).then(function (result) {
            this.setState({
              data: result
            });
          }.bind(this))
        }
          render() {
            return this.state.data.map(function (inlogg) {
                if (this.state.value == inlogg.userName && this.state.value1 == inlogg.passWord) { return location.href="http://localhost:3000/gruppchatt";
              } else {
                alert('Fel Användarnamn eller Lösenord!');
              }
              })
            }
          }

*/


  ReactDOM.render(
    <NameForm />,
    document.getElementById('app')

  );
