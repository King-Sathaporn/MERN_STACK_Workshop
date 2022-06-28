import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App';
import FormComponent from '../components/FormComponent/FormConponent';
import SingleComponent from '../components/SingleComponent/SingleComponent';
import EditComponent from '../components/EditComponent/EditComponent';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import AdminRoute from "./AdminRoute"

const MyRoute = () => {

    return(
        <Router>
            <Switch>
                <Route path="/" exact component={App}/>
                <AdminRoute path="/create" exact component={FormComponent}/>
                <Route path="/blog/:slug" exact component={SingleComponent}/>
                <AdminRoute path="/blog/edit/:slug" exact component={EditComponent}/>
                <Route path="/login-admin" exact component={LoginComponent}/>
            </Switch>
        </Router>
    )

}

export default MyRoute;