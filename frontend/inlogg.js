class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      fetch('http://localhost:3000/', {
          body: '{ "userName": "' + this.state.value + '"}',
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
        <div className="container">
          <div className="main">
            <h2>Logga in på ProjektChatt</h2>
            <form onSubmit={this.handleSubmit}>
              <label>User Name :
              <input name="username" id="username" type="text" value={this.state.value} onChange={this.handleChange}  />
              </label>
              <button type="submit" value="Submit" id="submit">Go!</button> 
              </form>
          </div>
        </div>
      );
    }
  }

console.log(NameForm);
  
  ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
    
  );

