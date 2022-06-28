import { getToken } from "../services/authoruze";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getToken()? (
                <Component {...props} />):
                (<Redirect 
                    to={{pathname:"/login-admin", 
                    state:{from:props.location}}} 
                />
            )
        }
    />
)

export default AdminRoute;