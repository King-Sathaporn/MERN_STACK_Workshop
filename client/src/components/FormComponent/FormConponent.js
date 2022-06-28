import { useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import { getUsername, getToken } from "../../services/authoruze";
import 'react-quill/dist/quill.snow.css';
import NavBarComponent from "../NavbarComponent/NavbarComponent";

const FormComponent = (props) =>{

    const [state, setState] = useState({
        title: "",
        author: getUsername(),
    })

    //destructuring the state
    const { title, author } = state;

    const [content, setContent] = useState('');


    const inputValue = name => e =>{
        setState({...state,[name]:e.target.value});

    }
    const submitContent = (e) =>{
        setContent(e);
    }

    const submitForm = (e) =>{
        e.preventDefault();
        const apiCreateUrl = `${process.env.REACT_APP_API_BASE_URL}/create`;
        axios.post(apiCreateUrl, 
            {title, content, author}, 
            {headers:{
                authorization: `Bearer ${getToken()}`
            }})
        .then(res=>{
            Swal.fire(
                'Successfully',
                'Create Blog Success',
                'success'
              )
            setState({...state,title:"", author:""});
            setContent('');
        })
        .catch(err=>{
            Swal.fire(
                'Create Blog Failed',
                err.response.data.error,
                'error'
              )
        })
    }

    return(
        <div className="container p-5">
            <NavBarComponent />
            <h1>Create Content</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Enter title" 
                        value={title} 
                        onChange={inputValue("title")}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="Enter content"
                        style={{border: "1px solid #666"}}
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Author" 
                        value={author} 
                        onChange={inputValue("author")}
                    />
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" value="submit"/>
            </form>
        </div>
    )
}

export default FormComponent;