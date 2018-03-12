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
      alert('test');
    }
  
    render() {
      return (
        <div className="container">
      <div className="main">
        <h2>Logga in på ProjektChatt</h2>
        <form id="form_id" method="post" name="myform">
          <label>User Name :</label>
          <input name="username" id="username" type="text" value={this.state.value} onChange={this.handleChange} />
          <label>Email :</label>
          <input name="email" id="email" type="email"  />
          <input defaultValue="Login" id="submit"  type="button" />
        </form>
        <span>
        </span></div>
    </div>
      );
    }
  }
  
  ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
  );
