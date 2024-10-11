 import './css/main.css';
import { MainHeader } from './components/MainHeader'; 
import UserInfoContextProvider from './contexts/UserInfoContext'; 
import { PracticeQuesPalletContextProvider } from './contexts/PracticeQuesPalletContext';
import Pallet from './components/Pallet';
import Practice from './components/Practice';

function App() {
  return (
    <UserInfoContextProvider> 
      {/* <Practice /> */}
      <MainHeader />
      <Pallet/> 
    </UserInfoContextProvider>

  );
}

export default App;
