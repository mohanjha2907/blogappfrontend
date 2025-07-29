import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Spinner from '../components/Spinner';

const BlogPage = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { loading, setLoading } = useContext(AppContext);
  const location = useLocation();
  let newbaseUrl="https://codehelp-apis.vercel.app/api/"
  const blogId = location.pathname.split('/').at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newbaseUrl}get-blog?blogId=${blogId}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch (error) {
      console.log('Error occurred while fetching the blog using blogId');
      setBlog(null);
      setRelatedBlogs([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [blogId]);

  return (
    <div>
      <Header />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <div>
          {loading ? (
            <Spinner />
          ) : blog ? (
            <div>
              
              <h2>
                <Link to={`/blog/${blogId}`}>{blog.title}</Link>
              </h2>

              {/* Clickable Category */}
              <p>
                By <span>{blog.author}</span> on{' '}
                <Link to={`/categories/${blog.category}`}>{blog.category}</Link>
              </p>

              <p>Posted on {blog.date}</p>
              <p>{blog.content}</p>
            </div>
          ) : (
            <p>No Blog Found</p>
          )}
        </div>

        {/* Display Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div>
            <h3>Related Blogs:</h3>
            {relatedBlogs.map((related) => (
              <div key={related.id} onClick={() => navigate(`/blog/${related.id}`)}>
                <h4>{related.title}</h4>
                <p>By {related.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;