 import './css/main.css';
import { MainHeader } from './components/MainHeader'; 
import UserInfoContextProvider from './contexts/UserInfoContext'; 
import { PracticeQuesPalletContextProvider } from './contexts/PracticeQuesPalletContext';
import Pallet from './components/Pallet';

function App() {
  return (
    <UserInfoContextProvider> 
      <MainHeader />
      <Pallet/> 
    </UserInfoContextProvider>

  );
}

export default App;
