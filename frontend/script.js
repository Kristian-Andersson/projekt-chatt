
class Chatten extends React.Component {
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
  render() {
    return <div className="chattwrapper">
      <div className="chattbox"></div>
      <input onChange={this.onTextChange}></input>
      <button onClick={() => {
        fetch('http://localhost:3000/', {
          body: '{ "message": "' + this.state.inputMessage + '"}',
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
}

ReactDOM.render(
  <Chatten></Chatten>,
  document.getElementById('app')
 );
