import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostsList from './components/PostsList';
import PostNew from './pages/PostNew';
import PostView from './pages/PostView';
import ProviderContext from './context/Provider';
import './App.css';

function App() {
  return (
    <div className="App">
      <ProviderContext>
        <Router>
          <Switch>
            <Route exact path="/" component={PostsList} />
            <Route exact path="/posts/new" component={PostNew} />
            <Route exact path="/posts/:postId" component={PostView} />
          </Switch>
        </Router>
      </ProviderContext>
    </div>
  );
}

export default App;
