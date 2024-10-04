 import './css/main.css';
import { MainHeader } from './components/MainHeader'; 
import UserInfoContextProvider from './contexts/UserInfoContext'; 
import { PracticeQuesPalletContextProvider } from './contexts/PracticeQuesPalletContext';

function App() {
  return (
    <UserInfoContextProvider> 
      <MainHeader />
      <PracticeQuesPalletContextProvider>
        {/* <Footer /> */}
      </PracticeQuesPalletContextProvider>
    </UserInfoContextProvider>

  );
}

export default App;
