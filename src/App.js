import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LOGIN from './pages/login';


import SECUREPAGE from './pages/securepage';
import LOGINJAVA from './components/loginjava';

const el = document.querySelector("#root");
var csrfToken =el.dataset.csrfToken;

function App() {
  const config = require('./config.json');
  console.log("Config: ", config);
  const serverType = config.serverType.server;
  console.log("Server Type: ", serverType);
  const environment = process.env.REACT_APP_ENVIRONMENT;
  const url = process.env.REACT_APP_JAVA_URL;
  console.log("Url: ", url);
  const path = process.env.REACT_APP_PATH;
  const baseUrl = (environment==="production" ? process.env.REACT_APP_HOMEPAGE + path : process.env.REACT_APP_HOMEPAGE);
  console.log("Base URL: ", baseUrl);
  return (
    <>
      <div className='App'> 
          <Router>
            <Routes>
              <Route path={
                `${baseUrl}/login`} element={serverType === "NodeJS" ? <LOGIN/> : <LOGINJAVA javaUrl={url} csrfToken={csrfToken}/>}/>
              <Route path={`${baseUrl}/loginNode`} element={<LOGIN/>}/>
              <Route path={`${baseUrl}/private/home`} element={<SECUREPAGE/>}/>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
