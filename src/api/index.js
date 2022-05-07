import axios from "axios"

const BASE_URL = 'https://api.themoviedb.org/3/movie'

export const fetchMovie = (id) => axios.get(`${BASE_URL}/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`)
export const fetchSimilar = (id) => axios.get(`${BASE_URL}/${id}/similar?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`)
export const fetchVideo = (id) => axios.get(`${BASE_URL}/${id}/videos?api_key=${process.env.REACT_APP_API}&language=en-US`)