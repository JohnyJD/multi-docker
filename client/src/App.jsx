import { Route, Routes } from 'react-router'
import './App.css'
import Fib from "./pages/Fib.jsx"
import OtherPage from './pages/OtherPage.jsx'

function App() {

  return (
    <Routes>
      <Route exact path='/' Component={Fib}/>
      <Route exact path='/other' Component={OtherPage}/>
    </Routes>
  )
}

export default App
