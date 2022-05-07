import { useNavigate } from "react-router-dom";
import './Search.scss'

const Search = (props) => {
  const navigate = useNavigate()
  const noImage = 'https://evroprom.com/wp-content/themes/europrom/assets/img/no-image-icon.png'
  
  return (
    <div className="nav-search">
      <input
        placeholder="Type a title"
        value={props.searchValue}
        onChange={(e) => props.onSearch(e.target.value)}
        className="nav-search__input"
        type="search"
      />

      {props.isTyping && (
          <div className="nav-search__content">
            <ul className="nav-search__list">
                {props.movies?.map((movie) => {
                const { id, title, backdrop_path } = movie;
                return (
                    <li
                    onClick={() => navigate(`/movie/${id}`)}
                    className="nav-search__item"
                    key={id}
                    >
                    <div className="nav-search__img">
                        <img
                        src={
                            backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                            : noImage
                        }
                        alt={title}
                        />
                    </div>
                    <p>{title}</p>
                    </li>
                );
                })}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
