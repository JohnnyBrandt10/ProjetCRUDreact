import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Store.jsx'
import './styles/index.scss'
import App from './App.jsx'
import { getUsers } from '../reducers/user.slice.jsx'
import { getPosts } from '../reducers/post.slice.jsx'

store.dispatch(getUsers())
store.dispatch(getPosts())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
