import logo from './logo.svg';
import './css/main.css';
import { MainHeader } from './components/MainHeader';
import SubHeader from './components/SubHeader';
import { Footer } from './components/Footer';
import LeftQuestionArea from './components/LeftQuestionArea';
import QuestionArea from './components/QuestionArea';
import UserInfoContextProvider from './contexts/UserInfoContext';
import TestInfoContextProvider from './contexts/TestInfoContext';
import TestStartTimer from './components/TestStartTimer';
import Pallet from './components/Pallet';


function App() {
  return (
    <UserInfoContextProvider>
      <TestInfoContextProvider>
        <MainHeader />
        <TestStartTimer />
        <QuestionArea />
        <Pallet/>
        {/* <Footer /> */}
      </TestInfoContextProvider>
    </UserInfoContextProvider>

  );
}

export default App;
