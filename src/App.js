import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


//Components
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import AllMovies from './pages/AllMovies';
import MyList from './pages/MyList';
import Navbar from './ui/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const isLogged = useSelector(state => state.profile.isLogged)
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:movieId' element={<MovieDetails/>}/>
        <Route path='/movies/:category' element={<AllMovies/>}/>
        <Route path='/my-list' element={ isLogged ? <MyList /> : <Navigate to='/signin'/> }/>
        <Route path='/signin' element={ isLogged ? <Home/> : <SignIn />}/>
        <Route path='/signup' element={ isLogged ? <Home/> : <SignUp />}/>
      </Routes>
    </>
  );
}

export default App;
