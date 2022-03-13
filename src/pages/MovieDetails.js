import * as React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from '../store/profileSlice';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "../components/list/List.scss";
import "./MovieDetails.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


// Mui components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import ListItem from "../components/listItem/ListItem";
import Skeleton from '@mui/material/Skeleton';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const displayAverage = (rating) => {
  if (rating <= 4) {
    return "low";
  } else if (rating > 4 && rating <= 7) {
    return "medium";
  } else if (rating > 7) {
    return "high";
  }
};

const apiKey = "b5734930c9753019953c02e83f2a0d0b";

const MovieDetails = () => {
  const [movieMedia, setMovieMedia] = useState([]);
  const [isSimilarLoaded, setIsSimilarLoaded] = useState(false)
  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false)
  const [isMediaLoaded, setIsMediaLoaded] = useState(false)
  const [movieDetails, setMovieDetails] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { pathname } = useLocation();
  const {
    id,
    poster_path,
    vote_average,
    title,
    overview,
    spoken_languages,
    release_date,
    genres,
  } = movieDetails;
  const isLogged = useSelector(state => state.profile.isLogged)
  const myList = useSelector(state => state.profile.movieList)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const movieId = pathname.replace(/[^0-9.]/g, "");
  const genresList = genres?.map((item) => item.name);
  const alreadyInList = myList.some(item => item.id === id)
  
  // Getting movie details
  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );
      const movieDetails = await response.json();

      setMovieDetails(movieDetails);
      setIsDetailsLoaded(true)
    };

    getMovieDetails();
  }, [movieId]);

  //Getting similar movies
  useEffect(() => {
    const getSimilarMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
      );
      const similarMovies = await response.json();

      setSimilarMovies(similarMovies.results);
      setIsSimilarLoaded(true)
    };
    
    getSimilarMovies();
  }, [movieId]);

  //Getting videos
  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      );
      const video = await response.json();

      setMovieMedia(video.results[0]);
      setIsMediaLoaded(true)
    };

    getVideos();
  }, [movieId]);

  const addToList = () => {

    if (isLogged) {
      dispatch(addItem(movieDetails))
      setAlertMessage('Successfully added to your list')
      setIsAlertOpen(true)
    } else {
      navigate('/signin')
    }
  }

  const removeFromList = (id) => {
    dispatch(deleteItem(id))
    setAlertMessage('Successfully removed from your list')
    setIsAlertOpen(true)
  }

  return (
    <main>
      <div className="container">
        <div className="movie-content">
          <div className="movie-content__left">
            {isDetailsLoaded ? (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt=""
                />
                <span
                  className={`movie-content__average ${displayAverage(
                    vote_average
                  )}`}
                >
                  {vote_average}
                </span>
              </>
            ) : (
              <Stack spacing={2}>
                <Skeleton variant="rectangular" width='100%' height={30} />
                <Skeleton variant="rectangular" width='100%' height={20} />
                <Skeleton variant="rectangular" width='100%' height={300} />
              </Stack>
            )}
          </div>
          <div className="movie-content__right">
            {isDetailsLoaded ? (
              <>
                <div className="movie-content__top">
                  <h1 className="movie-content__title">
                    {title}
                    <span className="movie-content__date">
                      {new Date(release_date).getFullYear()}
                    </span>
                  </h1>
                  {alreadyInList ? (
                    <button
                    onClick={() => removeFromList(id)} 
                    className="movie-content__btn add">
                    <RemoveIcon className="movie-content__btn-icon" />
                    Delete from list
                  </button>
                  ) : (
                    <button
                    onClick={addToList} 
                    className="movie-content__btn add">
                    <AddIcon className="movie-content__btn-icon" />
                    Add to list
                  </button>
                  )}
                </div>
                <div className="movie-content__middle">
                  <p>[ {genresList?.join(", ").toLowerCase()} ]</p>
                  <p className="movie-content__description">{overview}</p>
                  <h3>Language:</h3>
                  {spoken_languages.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
                </div>
              </>
            ) : (
              <Skeleton
                sx={{minHeight: '320px'}} 
                variant="rectangular" 
                width="100%" />
            )}
            <div className="movie-content__bottom">
              {isMediaLoaded ? (
                <iframe
                  title={movieMedia.name}
                  frameBorder={0}
                  width="80%"
                  height="315"
                  src={`https://www.youtube.com/embed/${movieMedia?.key}`}
                />
              ) : (
                <Skeleton variant="rectangular" width='100%' height='100%' />
              )}
            </div>
          </div>
        </div>
        {/* Similar movies */}
        {isSimilarLoaded ? (
          <div className="list">
            <span className="list__title">Similar movies</span>
            <div className="list__wrapper">
              <Swiper
                breakpoints={{
                  0: {
                    slidesPerView: 2
                  },
                  576: {
                    slidesPerView: 2
                  },
                  768: {
                    slidesPerView: 3
                  },
                  1024: {
                    slidesPerView: 4
                  }
                }}
                modules={Navigation}
                spaceBetween={10}
                slidesPerView={5}
                navigation
              >
                {similarMovies.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListItem
                      variant={"similar"}
                      overview={item.overview}
                      id={item.id}
                      backdropPath={item.backdrop_path}
                      posterPath={item.poster_path}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Snackbar 
          open={isAlertOpen} 
          autoHideDuration={3000} 
          onClose={() => setIsAlertOpen(false)}>
          <Alert 
            onClose={() => setIsAlertOpen(false)} 
            severity='success' 
            sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
};

export default MovieDetails;
