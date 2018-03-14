

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
          console.log(result);
        });
      }}>Send</button>
      </div>
  }
};

class MsgOutput extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          data: [findresponse]
        });
      })
  }

  render() {
    return (
      <div>
        {
          this.state.data.map((dynamicData, index) => {
            let keys = Object.keys(dynamicData);
            let d = dynamicData;
            return keys.map(data => {
              return (
                <div style={{borderBottom: '1px solid black'}}>
                  <p>name: {dynamicData[data].name}</p>
                  <p>population: {dynamicData[data].population}</p>
                  <p>id: {dynamicData[data].id} </p>
                </div>
              );
            });
          })

        }
      </div>
    )
  }
}



ReactDOM.render(
  <div className="chattwrapper">
  <div className="chattbox"><p></p></div>
  <ChattMsg></ChattMsg>
  </div>,
  document.getElementById('app')
 );
