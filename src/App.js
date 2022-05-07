import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import Navbar from './ui/Navbar';

// Pages
import Home from './pages/home/Home';
import Details from './pages/details/MovieDetails'
import Profile from './pages/profile/MyList'
import Movies from './pages/movies/AllMovies'
import Auth from './pages/auth/Auth';

function App() {
  const isLogged = useSelector(state => state.profile.isLogged)
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:movieId' element={<Details/>}/>
        <Route path='/movies/:category' element={<Movies/>}/>
        <Route path='/my-list' element={ isLogged ? <Profile /> : <Navigate to='/signin'/> }/>
        <Route path='/auth' element={ isLogged ? <Home/> : <Auth/> }/>
      </Routes>
    </>
  );
}

export default App;
