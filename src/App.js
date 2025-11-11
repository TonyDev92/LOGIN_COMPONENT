import logo from './logo.svg';
import './App.css';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LOGIN from './pages/login';
import INITIALCOMPONENT from './components/principalComponent';

function App() {

  return (
    <>
      <div className='App'> 
          <Router>
            <Routes>
              <Route path='/' element={<INITIALCOMPONENT/>}/>
              <Route path='/login' element={<LOGIN/>}/>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
