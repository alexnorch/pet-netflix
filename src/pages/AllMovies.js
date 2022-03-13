import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AllMovies.scss";

import ListItem from "../components/listItem/ListItem";
import Pagination from "@mui/material/Pagination";
import Skeleton from '@mui/material/Skeleton';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';

const baseURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "b5734930c9753019953c02e83f2a0d0b";

const AllMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false)
  const [movies, setMovies] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      const response = await fetch(
        `${baseURL}${category}?api_key=${apiKey}&language=en-US&page=${currentPage}`
      );
      const movieData = await response.json();

      setMovies(movieData.results);
      setIsMoviesLoaded(true)
    };

    getCategory();
  }, [currentPage, category]);

  const changePage = (num) => {
      setCurrentPage(num)
      window.scrollTo(0,0)
  }

  return (
    <main>
      <div className="container">
        <div className="all-movies">
          {isMoviesLoaded ? (
              movies.map((item) => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  posterPath={item.backdrop_path}
                />
              ))
          ) : (
              <Box
              sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '30px'
              }}>
                  {Array(16).fill('i').map((i) => (
                      <Skeleton
                        key={(Math.random() * 100).toString()} 
                        variant='rectangular' 
                        width={'calc(100% / 4 - 22.5px)'} height={320}/>
                  ))}
              </Box>
          )}
        </div>
        <div className="movies-pagination">
          <Stack spacing={2}>
            <Pagination
              onChange={(_, num) => changePage(num)}
              color="error"
              count={500}
              defaultPage={currentPage}
              siblingCount={0}
            />
          </Stack>
        </div>
      </div>
    </main>
  );
};

export default AllMovies;
