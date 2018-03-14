

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
  render() {
    return <div>
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
          console.log(result.ops[0].message);
        });
      }}>Send</button>
      </div>
  }
};



ReactDOM.render(
  <div className="chattwrapper">
  <div className="chattbox"><p></p></div>
  <ChattMsg></ChattMsg>
  </div>,
  document.getElementById('app')
 );
