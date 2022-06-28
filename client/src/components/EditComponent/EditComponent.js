import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getToken} from "../../services/authoruze";
import NavBarComponent from "../NavbarComponent/NavbarComponent";

const EditComponent = (props) =>{

    const [state, setState] = useState({
        title: "",
        author: "",
        slug:""
    })

    //destructuring the state
    const { title, author, slug } = state;
    const [content, setContent] = useState('');

    const submitContent = (e) =>{
        setContent(e);
    }

    useEffect(() => {
        const blogPath = props.match.params.slug;
        const getSingleBlogApi = `${process.env.REACT_APP_API_BASE_URL}/blog/${blogPath}`;
        axios.get(getSingleBlogApi)
        .then((res) => {
            const { title, content, author, slug } = res.data;
            setState({
                ...state,
                title,
                author,
                slug
            })
            setContent(content);
        })
        .catch((err) => {
            alert(err);
        })
        // eslint-disable-next-line 
    },[])

    const inputValue = name => e =>{
        setState({...state,[name]:e.target.value});
    }


    const showEditForm = () =>(
        <form onSubmit={submitForm}>
        <div className="form-group">
            <label>Title</label>
            <input type="text" 
                className="form-control" 
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
                    style={{border: "1px solid #666"}}
                />
        </div>
        <div className="form-group">
            <label>Author</label>
            <input type="text" 
                className="form-control" 
                value={author} 
                onChange={inputValue("author")}
            />
        </div>
        <br/>
        <input type="submit" className="btn btn-primary" value="update"/>
    </form>
    )

    const submitForm = (e) =>{
        e.preventDefault();
        const editSingleBlogApi = `${process.env.REACT_APP_API_BASE_URL}/blog/${slug}`;
        axios.put(editSingleBlogApi, 
            {title, content, author},
            {headers:{
                authorization: `Bearer ${getToken()}`
            }})
        .then(res=>{
            Swal.fire(
                'Successfully',
                'Update Blog Success',
                'success'
              )
            const { title, content, author, slug } = res.data;
            setState({
                ...state,
                title,
                author,
                slug
            })
            setContent(content);
        })
        .catch(err=>{
            Swal.fire(
                'Create Blog Failed',
                'Please try again',
                'error'
              )
        })
    }

    return(
        <div className="container p-5">
            <NavBarComponent />
            <h1>Edit Blog</h1>
            {showEditForm()}
        </div>
    )
}

export default EditComponent;