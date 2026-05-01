import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Home/Home"
import QuarkAI from './pages/Quark-AI/Chat/QuarkAI';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Verify from './pages/Verifivation-Email/Verify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/QuarkAI' element={<QuarkAI/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Verify' element={<Verify/>}/>
      </Routes>
    </Router>
  )
}

export default App
