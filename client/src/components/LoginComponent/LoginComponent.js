import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { authenticate, getToken } from "../../services/authoruze";
import NavBarComponent from "../NavbarComponent/NavbarComponent";

const LoginComponent = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}/login-admin`;
    axios
      .post(url, { username, password })
      .then((res) => {
        authenticate(res, ()=>props.history.push("/"));
      })
      .catch((err) => {
        Swal.fire("Create Blog Failed", err.response.data.message, "error");
      });
  };

  useEffect(()=>{
    getToken()&& props.history.push("/");
  },[])

  return (
    <div className="container p-5">
      <NavBarComponent />
      <h1>Login Form | Admin</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" className="btn btn-primary" value="login" />
      </form>
    </div>
  );
};

export default withRouter(LoginComponent);
