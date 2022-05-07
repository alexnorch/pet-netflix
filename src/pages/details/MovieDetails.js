import * as React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchMovie, fetchSimilar, fetchVideo } from '../../api';

import { addItem, deleteItem } from '../../store/profileSlice';
import { displayAverage } from '../../utils';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// import "../components/list/List.scss";
import "../details/MovieDetails.scss";

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
import ListItem from "../../components/listItem/ListItem";
import Skeleton from '@mui/material/Skeleton';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({})

  const [isLoaded, setIsLoaded] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const movieId = pathname.replace(/[^0-9.]/g, "")
  const isLogged = useSelector(state => state.profile.isLogged)
  const myList = useSelector(state => state.profile.movieList)
  const alreadyInList = myList.some(item => item.id === movieData?.details?.id)

  // Getting movie information
  useEffect(() => {
    const getMovie = async () => {
      const { data: details } = await fetchMovie(movieId)
      const { data: similar } = await fetchSimilar(movieId)
      const { data: videos } = await fetchVideo(movieId)

      setMovieData({
        details,
        similar: similar.results,
        videos: videos.results
      })
      setIsLoaded(true)
    }
    getMovie()
  }, [movieId])

  const addToList = () => {
    if (isLogged) {
      dispatch(addItem(movieData.details))
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
            {isLoaded ? (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData?.details?.poster_path}`}
                  alt=""
                />
                <span className={`movie-content__average ${displayAverage(movieData?.details?.vote_average)}`}>
                  {movieData?.details?.vote_average}
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
            {isLoaded ? (
              <>
                <div className="movie-content__top">
                  <h1 className="movie-content__title">
                    {movieData?.details?.title}
                    <span className="movie-content__date">
                      {new Date(movieData?.details?.release_date).getFullYear()}
                    </span>
                  </h1>
                  {alreadyInList ? (
                    <button
                      onClick={() => removeFromList(movieData?.details?.id)}
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
                  <p>[ {movieData?.details?.genresList?.join(", ").toLowerCase()} ]</p>
                  <p className="movie-content__description">{movieData?.details?.overview}</p>
                  <h3>Language:</h3>
                  {movieData?.details?.spoken_languages.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
                </div>
              </>
            ) : (
              <Skeleton
                sx={{ minHeight: '320px' }}
                variant="rectangular"
                width="100%" />
            )}
            <div className="movie-content__bottom">
              {isLoaded ? (
                <iframe
                  title={movieData?.videos?.name}
                  frameBorder={0}
                  width="80%"
                  height="315"
                  src={`https://www.youtube.com/embed/${movieData?.videos?.key}`}
                />
              ) : (
                <Skeleton variant="rectangular" width='100%' height='100%' />
              )}
            </div>
          </div>
        </div>
        {isLoaded ? (
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
                {movieData?.similar?.map((item) => (
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
