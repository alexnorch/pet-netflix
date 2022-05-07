import { useEffect, useState } from "react";

const Iframe = ({ id, title }) => {
  const [movieMedia, setMovieMedia] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API}&language=en-US`);
      const data = await response.json();

      setMovieMedia(data.results[0]);
    };

    getVideo();
  }, [id]);

  return (
    <iframe
      title={title}
      frameBorder="0"
      height="100%"
      width="100%"
      src={`https://youtube.com/embed/${movieMedia?.key}?autoplay=1&controls=0&showinfo=0&autohide=1`}
    />
  );
};

export default Iframe;
