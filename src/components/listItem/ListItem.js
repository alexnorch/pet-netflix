import './ListItem.scss'
import { useNavigate } from 'react-router-dom';

export default function ListItem({ posterPath, id, title, average, variant }) {

  const navigate = useNavigate()
  const noImage = 'https://images.unsplash.com/photo-1637946175559-22c4fe13fc54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'

  const switchItem = () => {
    navigate(`/movie/${id}`)
    window.scrollTo(0, 0)
  }
  return (
    <div
      onClick={switchItem}
      className={`list-item ${variant}`}>
      <img src={
        posterPath ?
          `https://image.tmdb.org/t/p/w500${posterPath}` :
          noImage
      } alt={title} />
      <div className="list-item__info">
        <h3>{title}</h3>
        <span>{average}</span>
      </div>
    </div>
  )
}
