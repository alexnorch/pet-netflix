import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import '../home/Home.scss'
import '../../App.scss'

const Home = () => {
  document.body.style.background = '#adababd2'
  return (
    <>
      <Featured/>
        <main className="home">
          <div className="container">
              <List type="popular" />
              <List type="now_playing" />
              <List type="upcoming" />
          </div>
        </main>
    </>
  );
};

export default Home;
