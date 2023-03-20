import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ItemSingle = ({id, name, alco, image}) => {
  return (
    <Wrapper>
        <Link to={`/drinks/${id}`}>
        <img src={image} alt='' />
            <div className='item-information'>
                <p>{name}</p>
                <p>{alco}</p>
            </div>
        </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
flex: 1 0 0;
width: 22vw;
min-width: 150px;
height: 150px;
overflow: hidden;

a {
    width: 100%;
    position: relative;

    :hover {
    img {
        transform: scale(1.3);
        filter: grayscale(0%);
    }
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 150px;
        transition: .2s ease-out;
        filter: grayscale(60%);
    }

    .item-information {
    position: absolute;
    bottom: 0;
    color: white;
    left: 10px;
    bottom: 10px;

    p {
        font-size: .8rem;
        text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
    }
}
}
`

export default ItemSingle