import './ListItem.scss'
import { useNavigate } from 'react-router-dom';

export default function ListItem({posterPath, id, title, average, variant}) {

  const navigate = useNavigate()

  const switchItem = () => {
      navigate(`/movie/${id}`)
      window.scrollTo(0,0)
  }
  return (
    <div
        onClick={switchItem} 
        className={`list-item ${variant}`}>
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
        <div className="list-item__info">
            <h3>{title}</h3>
            <span>{average}</span>
        </div>
    </div>
  )
}
