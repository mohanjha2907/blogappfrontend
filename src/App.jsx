
import './App.css'

import { useContext,useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import { Routes,Route, useSearchParams, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import BlogPage from './Pages/BlogPage'
import TagPage from './Pages/TagPage'
import CategoryPage from './Pages/CategoryPage'
function App() {
  const{fetchBlogPosts,page}=useContext(AppContext);
  const [searchParams,setSearchParams]=useSearchParams();
  const location=useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if (location.pathname.includes("tags")) {
        const tag = location.pathname.split("/").at(-1).replace("-", " ");
        fetchBlogPosts(Number(page), tag);
    } else if (location.pathname.includes("categories")) {
        const category = location.pathname.split("/").at(-1).replace("-", " ");
        fetchBlogPosts(Number(page), category);
    } else {
        fetchBlogPosts(Number(page));
    }
}, [location.pathname, location.search]);


  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/blog/:blogId" element={<BlogPage/>} />
        <Route path="/tags/:tag" element={<TagPage/>} />
        <Route path="/categories/:category" element={<CategoryPage/>} />
    </Routes>
  )
}

export default App
