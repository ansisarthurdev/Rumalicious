import React from 'react'
import styled from 'styled-components'

//icons
import { Popup } from '@styled-icons/entypo/Popup'

const Footer = () => {
  return (
    <Wrapper>
        code by <a href='https://github.com/ansisarthurdev' target='_blank' rel="noopener noreferrer"> <Popup className='icon' /> Ansis Artūrs Irbe</a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    text-align: center;
    font-size: .6rem;
    border-top: 1px solid white;
    color: white;
    padding: 20px 10px;
    background: black;
    max-width: 1000px;
    margin: 120px auto 0;
    
    a {
        text-decoration: none;
        transition: .2s linear;
        color: white;
        margin-left: 10px;
        :hover {
            color: #FFCB66;
        }
        .icon {
            width: 12px;
            height: 12px;
        }
    }
`

export default Footer