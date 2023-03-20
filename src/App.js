import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//redux
import { Provider } from 'react-redux'
import { store } from './app/store'

//pages
import HomeFeed from './pages/HomeFeed'
import Browse from './pages/Browse'
import Saved from './pages/Saved'
import Drink from './pages/Drink'

//components
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import Hamburger from 'hamburger-react'

//icons
import { Home } from '@styled-icons/heroicons-outline/Home'
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt'
import { Heart } from '@styled-icons/fa-regular/Heart'

function App() {

  const [isOpen, setOpen] = useState(false);

  //localstorage
  const storage = window.localStorage;
  const verified = storage.getItem('verified');
  const [verify, setVerify] = useState(false);

  const checkVerify = (action) => {
    if(action === true){
      setVerify(true);
      storage.setItem('verified', true);
    } else {
      window.location.replace("https://www.google.com/");
    }
  }

  useEffect(() => {
    if(verified){
      setVerify(true);
    }

    //eslint-disable-next-line
  }, [])

  return (
    <Provider store={store}>
    <BrowserRouter>
      {verify ? <>
        <MobileMenu>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px'}}>
          <h3>Rumalicious</h3>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </MobileMenu>
  
        {isOpen && 
        <MobileMenuContent>
          <a href='/'><Home className='icon' /><p>Home</p></a>
          <a href='/browse'><SearchAlt className='icon' /><p>Browse</p></a>
          <a href='/saved'><Heart className='icon' /><p>Saved</p></a>
        </MobileMenuContent>}
  
        <Wrapper>
          <SideBar />
          <Content>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/drinks/:id" element={<Drink />} />
            </Routes>
          </Content>
        </Wrapper>
  
        <Footer /> </> : <>

        <VerifiedWrapper>
          <VerifiedContent>
            <h3>You must be over 21 years old to visit this website.</h3>
            <div className='buttons'>
              <Button onClick={() => checkVerify(true)}><p>I'm over 21</p></Button>
              <Button onClick={() => checkVerify(false)} style={{backgroundColor: '#93939330'}}><p>I'm under 21</p></Button>
            </div>
          </VerifiedContent>
        </VerifiedWrapper>
      
      </>}
    </BrowserRouter>
    </Provider>
  );
}

const Button = styled.div`
background-color: #505050;
padding: 10px 20px;
cursor: pointer;
transition: .3s ease-in-out;
border-radius: 10px;

:hover {
  opacity: .8;
}
`

const VerifiedContent = styled.div`
max-width: 300px;
text-align: center;

.buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
`

const VerifiedWrapper = styled.div`
background-color: #292929;
height: 100vh;
width: 100vw;
color: white;
display: flex;
justify-content: center;
align-items: center;
`

const MobileMenuContent = styled.div`

    padding: 10px;
    position: sticky;
    top: 48px;
    background: white!important;
    z-index: 100;

    a {
      display: flex;
      align-items: center;
      color: black;
      text-decoration: none;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 30px;
      transition: .2s ease-out;
      font-size: .9rem;

      :hover {
        background: #111101;
        color: white;
      }

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
`

const MobileMenu = styled.div`
position: sticky;
top: 0!important;
width: 100%;
background: white;
display: none;
z-index: 100;


.hamburger-react {
  position: relative;
  left: 10px;
}

@media(max-width: 780px){
  display: block;
}

`

const Wrapper = styled.div`
max-width: 1000px;
margin: 40px auto 0;
padding: 0 20px;
display: flex;
`

const Content = styled.div`
  padding: 0 0 0 20px;
  width: 80%;

  @media(max-width: 780px){
    width: 100%;
    padding: 0;
  }
`

export default App;
