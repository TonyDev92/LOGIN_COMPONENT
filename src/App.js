import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LOGIN from './pages/login';

import SECUREGATE from './components/secureGate';

function App() {

  return (
    <>
      <div className='App'> 
          <Router>
            <Routes>
              <Route path='/' element={<SECUREGATE/>}/>
              <Route path='/login' element={<LOGIN/>}/>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
