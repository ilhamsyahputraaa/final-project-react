import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [mostFavorite, setMostFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Foods
  const getFoodList = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_REACT_JWT_TOKEN}`,
      },
    })
      .then((response) => {
        console.log(response);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFoodList();
  }, [isLoading]);

  return (
    <>
    
    </>
  )
}

export default App
