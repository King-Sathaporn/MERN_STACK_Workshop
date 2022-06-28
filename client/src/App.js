import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import NavBarComponent from "./components/NavbarComponent/NavbarComponent";
import Swal from "sweetalert2";
import { getToken } from "./services/authoruze";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    const getApi = `${process.env.REACT_APP_API_BASE_URL}/blogs`;
    axios
      .get(getApi)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure you want to delete this blog?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    const deleteBlogApi = `${process.env.REACT_APP_API_BASE_URL}/blog/${slug}`;
    axios
      .delete(deleteBlogApi, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Deleted!",
          text: `${res.data.result}`,
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container p-5">
      <NavBarComponent />
      {blogs.map((blog, index) => {
        return (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2">
              <Link to={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </Link>
              <div className="pt-3">
                {parse(blog.content.substring(0, 180))}
              </div>
              <p className="text-muted">
                author: {blog.author} | create at:{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getToken() && (
                <div>
                  <Link
                    className="btn btn-outline-success"
                    to={`/blog/edit/${blog.slug}`}
                  >
                    Edit
                  </Link>{" "}
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
