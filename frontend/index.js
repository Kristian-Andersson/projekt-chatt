
var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var Route = ReactRouterDOM.Route;


import { BrowserRouter, Route, Link } from 'react-router-dom';



ReactDOM.render(<HashRouter>
<div>
  <nav>
    <ul>
      <li><Link to={"/index"}>home</Link></li>
      <li><Link to={"/gruppchatt"}>Gruppchatt</Link></li>
      <li><Link to={"/privatchatt"}>Privatchatt</Link></li>
    </ul>
  </nav>
  <Route component={index} path="/index"></Route>
  <Route component={gruppchatt} path="/gruppchatt"></Route>
  <Route component={privatchatt} path="/privatchatt"></Route>
</div>




</HashRouter>, document.getElementById('menu'));
