import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import NavBarComponent from "../NavbarComponent/NavbarComponent";

const SingleComponent = (props) => {

    const [blog, setBlog] = useState('');

    useEffect(() => {
        const blogPath = props.match.params.slug;
        const getSingleBlogApi = `${process.env.REACT_APP_API_BASE_URL}/blog/${blogPath}`;
        axios.get(getSingleBlogApi)
        .then((res) => {
            setBlog(res.data);
        })
        .catch((err) => {
            alert(err);
        })
        // eslint-disable-next-line 
    },[])

    return (
      <div className="container p-5">
        <NavBarComponent />
        {blog && (
          <div>
            <h1>{blog.title}</h1>
            <div className="pt-3">{parse(blog.content)}</div>
            <p className="text-muted">
                author: {blog.author} | create at:{" "}
                {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    );

}

export default SingleComponent;