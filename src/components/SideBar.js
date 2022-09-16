import React, { useEffect } from 'react'
import styled from 'styled-components'

//router
import { Link } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'
import { selectPath } from '../app/appSlice'

//icons
import { Home } from '@styled-icons/heroicons-outline/Home'
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt'
import { Heart } from '@styled-icons/fa-regular/Heart'

const SideBar = () => {
//path from redux state
const path = useSelector(selectPath);

useEffect(() => {
    const home = document.querySelector('.home');
    const browse = document.querySelector('.browse');
    const saved = document.querySelector('.saved');

    if(path === '/'){
        home.classList.add('active');
        browse.classList.remove('active');
        saved.classList.remove('active');
    } else if (path === '/browse'){
        home.classList.remove('active');
        browse.classList.add('active');
        saved.classList.remove('active');
    } else if (path === '/saved'){
        home.classList.remove('active');
        browse.classList.remove('active');
        saved.classList.add('active');
    }
    }, [path])

  return (
    <Wrapper>
        <h3>Rumalicious</h3>

        <p className='discover'>DISCOVER</p>

        <div className='side-menu'>
        <Link to='/' className='home'><Home className='icon' /><p>Home</p></Link>
        <Link to='/browse' className='browse'><SearchAlt className='icon' /><p>Browse</p></Link>
        <Link to='/saved' className='saved'><Heart className='icon' /><p>Saved</p></Link>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 20%;
  min-width: 180px;
  position: sticky;
  top: 10px;
  height: 100%;
  align-items: flex-start;

  @media(max-width: 780px){
    display: none;
  }


  h3 {
    font-size: 1.4rem;
    padding-left: 10px;
  }

  .discover {
    margin-top: 80px;
    font-weight: bold;
    color: lightgray;
    font-size: 1rem;
    padding-left: 10px;
  }

  .side-menu {
    margin-top: 30px;

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

    .active {
      background: #111101;
      color: white;
    }
  }
`

export default SideBar