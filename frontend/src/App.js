import Home from './Components/Home/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Note from './Components/CreateNote/Note';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/note' element={<Note />} />
        </Routes>
      </Router>
  );
}

export default App;
 
