import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import "./Blog.css";

import { Link } from 'react-router-dom';

const Blogs = () => {
  const { posts, loading } = useContext(AppContext);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            
            <p className='title'>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </p>

           
            <p>
              By <span>{post.author}</span> on{' '}
              <Link to={`/categories/${post.category}`}>{post.category}</Link>
            </p>

            <p>Posted on {post.date}</p>
            <p>{post.content}</p>

            
            <div>
              {post.tags.map((tag) => (
                <Link className='tags' key={tag} to={`/tags/${tag}`}>
                  {tag}
                </Link>
              ))}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};
export default Blogs;