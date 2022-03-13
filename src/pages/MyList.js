import { useSelector } from "react-redux";
import ListItem from "../components/listItem/ListItem";
import "./MyList.scss";

const MyList = () => {
  const myList = useSelector((state) => state.profile.movieList);
  document.body.style.background = "#adababd2";

  return (
    <main>
      <div className="container">
        <h1>My list</h1>
        <div className="my-list">
          {myList.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.title}
              posterPath={item.backdrop_path}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyList;