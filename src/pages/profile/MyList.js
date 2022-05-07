import { useSelector } from "react-redux";
import ListItem from "../../components/listItem/ListItem";
import "../profile/MyList.scss";

const MyList = () => {
  const myList = useSelector((state) => state.profile.movieList);
  
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
