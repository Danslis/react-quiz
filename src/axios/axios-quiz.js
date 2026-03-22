import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-a964c-default-rtdb.firebaseio.com/'
})