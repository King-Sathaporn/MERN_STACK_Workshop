import { Link, withRouter } from "react-router-dom";
import { getUsername, logout } from "../../services/authoruze";


const NavBarComponent = (props) => {

    return (
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {getUsername() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/create" className="nav-link">
                Create Blog
              </Link>
            </li>
          )}
          {!getUsername() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/login-admin" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {getUsername() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <button
                className="nav-link"
                onClick={() => logout(() => props.history.push("/login-admin"))}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    );

}

export default withRouter(NavBarComponent);