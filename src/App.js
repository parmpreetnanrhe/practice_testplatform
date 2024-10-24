 import './css/main.css';
import { MainHeader } from './components/MainHeader'; 
import UserInfoContextProvider from './contexts/UserInfoContext';  
import Pallet from './components/Pallet';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <UserInfoContextProvider>  
      <MainHeader />
      <Pallet/> 
    </UserInfoContextProvider>
      </Router>

  );
}

export default App;
