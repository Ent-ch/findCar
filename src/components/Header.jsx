import { Link } from 'inferno-router';

const Header = props => <header className="container--baseline">
<h1 className="m--1 g--6">Find car UA</h1>
<input type="checkbox" id="nav--horizontal-responsive" />
<label for="nav--horizontal-responsive">MENU</label>
<nav className="g--6 nav--horizontal">
  <ul>
    <li><Link to="/latest">Latest</Link></li>
  </ul>
</nav>
</header>;

export default Header;
