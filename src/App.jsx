import { render, Component } from 'inferno';
import { HashRouter, Route, Redirect, Link } from 'inferno-router';

import DeatailsPage from './components/DeatailsPage.jsx';
import ListPage from './components/ListPage.jsx';
import Header from './components/Header.jsx';

import 'surface/src/scss/surface_styles.scss';
import './App.scss';

// sddsda sdfsdf
const Home = (props) => {
  return <div className="sendBlock">
  </div>;
};

const List = props => {
  return <ListPage />;
};

const Detail = ({ match: { params: { id }}}) => <DeatailsPage id={id} />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
    };

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend() {
    this.setState({ sent: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sent) {
      this.setState({sent: false});
    }
  }

  render() {
    const { sent } = this.state;

    return (<HashRouter>
      <div className="g--12 no-margin-vertical appMain">
        <Header />
        {sent && <Redirect to="/new"/>}

        <Route exact path="/" component={() => <Home handleSend={this.handleSend} />} />
        <Route path="/latest" component={List} />
        <Route path="/detail/:id" component={Detail} />

        <footer className="g--12">
          <div className="text-center">
            <Link to="/">Find car</Link>
          </div>
        </footer>
      </div>
      </HashRouter>
    );
  }
}

render(
  <App />,
  document.getElementById("app")
);