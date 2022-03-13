import ListItem from "../listItem/ListItem";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const displayType = (type) => {
  switch (type) {
    case "upcoming":
      return "Upcoming movies";
    case "now_playing":
      return "New movies";
    case "popular":
      return "Popular movies";
    default:
      return 'Other movies'
  }
};

const List = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [isListLoaded, setIsListLoaded] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetch(`
            https://api.themoviedb.org/3/movie/${type}?api_key=b5734930c9753019953c02e83f2a0d0b&language=en-US&page=1`);
      const movieData = await data.json();

      setMovies(movieData.results);
      setIsListLoaded(true)
    };
    fetchMovies();
  }, [type]);

  return (
    <div className="list">
      <div className="list__header">
        {isListLoaded ? (
          <>
            <h3 className="list__title">{displayType(type)}</h3>
            <Link className="list__all-movies" to={`/movies/${type}`}>
              View all
            </Link>
          </>
        ) : (
          <Skeleton variant="rectangular" width="100%" height={30} />
        )}
      </div>
        {isListLoaded ? (
          <>
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2
                },
                576: {
                  slidesPerView: 3
                },
                1024: {
                  slidesPerView: 4
                }
              }}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 2500
              }}
              spaceBetween={10}
              slidesPerView={4}
              navigation={true}
            >
              {movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <ListItem
                    average={item.vote_average}
                    title={item.title}
                    overview={item.overview}
                    id={item.id}
                    backdropPath={item.backdrop_path}
                    posterPath={item.backdrop_path}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Stack
            marginTop={2} 
            direction="row" 
            spacing={2}>
              <Skeleton variant="rectangular" height={160} width='100%'/>
              <Skeleton variant="rectangular" height={160} width='100%'/>
              <Skeleton variant="rectangular" height={160} width='100%'/>
              <Skeleton variant="rectangular" height={160} width='100%'/>
          </Stack>
        )}
      </div>
  );
};

export default List;
