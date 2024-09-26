import logo from './logo.svg';
import './css/main.css';
import { MainHeader } from './components/MainHeader'; 
import SubHeader from './components/SubHeader';
import { Footer } from './components/Footer';
import LeftQuestionArea from './components/LeftQuestionArea';
import QuestionArea from './components/QuestionArea';
 


function App() {
  return (
    <>
      <MainHeader /> 
      <SubHeader /> 
      <QuestionArea />
      {/* <Footer /> */}
    </>
  );
}

export default App;
