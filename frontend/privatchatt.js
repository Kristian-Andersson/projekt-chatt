
var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var Route = ReactRouterDOM.Route;

ReactDOM.render(<HashRouter>
<div>
  <nav>
    <ul>
      <li><Link to={"/cities"}>Cities</Link></li>
      <li><Link to={"/nameform"}>NameForm</Link></li>
      <li><Link to={"/box"}>box</Link></li>
    </ul>
  </nav>
  <Route component={Cities} path="/cities"></Route>
  <Route component={MyForm} path="/nameform"></Route>
  <Route component={Box} path="/box"></Route>
</div>

</HashRouter>, document.getElementById('menu'));

/*class PrivatChattMsg extends React.Component {
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
        fetch('http://localhost:3000/privatchatt', {
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
);*/
