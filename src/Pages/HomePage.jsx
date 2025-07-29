import React from 'react'
import Header from '../components/Header';
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const HomePage = () => {
  return (
    <div>
        <Header/>
        <div>
            <Blogs/>
            <Pagination/>
        </div>
    </div>
  )
}

export default HomePage;
