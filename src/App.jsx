import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import NavBar from './Components/NavBar';
import PostCard from './Components/PostCard';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Get All Foods
  const getExploreList = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_REACT_JWT_TOKEN}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExploreList();
  }, [isLoading]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='content d-flex row gap-5 col-8'>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
    
    </>
  )
}

export default App
