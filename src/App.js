import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LOGIN from './pages/login';

import SECUREGATE from './components/secureGate';
import SECUREPAGE from './pages/securepage';

function App() {

  return (
    <>
      <div className='App'> 
          <Router>
            <Routes>
              <Route path='/' element={<SECUREGATE/>}/>
              <Route path='/login' element={<LOGIN/>}/>
              <Route path='/securepage' element={<SECUREPAGE/>}/>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
