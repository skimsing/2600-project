// import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

//components
import Header from "./Components/Header/Header";
import LoginModal from "./Components/LoginModal/LoginModal";
import RenderStory from './Components/RenderStory/RenderStory';

//pages
import Main from './Pages/Main/Main';
import UserHome from './Pages/UserHome/UserHome'
import CreateUser from "./Pages/CreateUser/CreateUser";
import Stories from "./Pages/Stories/Stories";
import { useState } from 'react';
import StoryInput from './Components/StoryInput/StoryInput';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const renderStory = (story) => (
    <RenderStory
      story={story}
    />
  );
  // const userLogin = (user) =>(

  // )
  return (
    <div className="App">
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} user={user}/>
      <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} user={user}/>}/>
          <Route path="/UserHome" element={<UserHome isLoggedIn={isLoggedIn} user={user} renderStory={renderStory}/>}/>
          <Route path="/CreateUser" element={<CreateUser isLoggedIn={isLoggedIn}/>}/>
          <Route path="/Login" element={<LoginModal setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/Stories" element={<Stories renderStory={renderStory}/>}/>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
