import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//components
import ItemSingle from '../components/ItemSingle'

//redux
import { useDispatch } from 'react-redux'
import { updatePath } from '../app/appSlice'

//router
import { Link } from 'react-router-dom'

const HomeFeed = () => {

  const dispatch = useDispatch();
  const [randomDrinks, setRandomDrinks] = useState([]);
  const [vodkaDrinks, setVodkaDrinks] = useState([]);
  const [ginDrinks, setGinDrinks] = useState([]);

  const fetchDataRandom = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then(data => {
      let drink = Object.fromEntries(Object.entries(data.drinks[0]).filter(([_, v]) => v != null));
      setRandomDrinks(current => [...current, drink]);
    })
  }

  const fetchDataVodka = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
    .then((response) => response.json())
    .then(data => {
     setVodkaDrinks(data?.drinks)
    })
  }
  
  const fetchDataGin = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then((response) => response.json())
    .then(data => {
      setGinDrinks(data?.drinks)
    })
  }

  useEffect(() => {
    //get 10 random items
    for(let i = 0; i < 10; i++){
      fetchDataRandom();
    }

    //fetch vodka drinks
    fetchDataVodka();

    //fetch gin drinks
    fetchDataGin();

    //eslint-disable-next-line
  }, [])

  //update path
  useEffect(() => {
    dispatch(updatePath('/'))
  }, [dispatch])

  return (
    <Wrapper>
      <h3>Daily popular drinks</h3>
      <div className='item-carousel'>
        {randomDrinks?.map(drink => (
        <Link to={`/drinks/${drink?.idDrink}`} key={drink?.idDrink}>
          <Item>
            <img src={drink?.strDrinkThumb} alt='' />
            <div className='item-information'>
              <p>{drink?.strDrink}</p>
              <p>{drink?.strCategory}</p>
              <p>{drink?.strAlcoholic}</p>
            </div>
          </Item>
        </Link>
        ))}
      </div>

      <h3 style={{marginTop: 20}}>Top Cocktails - Vodka</h3>
      <div className='item-list'>
        {vodkaDrinks.slice(0, 15)?.map(drink => (
          <ItemSingle 
            id={drink?.idDrink}
            name={drink?.strDrink}
            alco={'Alcoholic'}
            image={drink?.strDrinkThumb}
        />
        ))}
      </div>

      <h3 style={{marginTop: 50}}>Top Cocktails - Gin</h3>
      <div className='item-list' style={{marginBottom: 20}}>
        {ginDrinks.slice(0, 15)?.map(drink => (
          <ItemSingle 
            id={drink?.idDrink}
            name={drink?.strDrink}
            alco={'Alcoholic'}
            image={drink?.strDrinkThumb}
        />
        ))}
      </div>
    </Wrapper>
  )
}

const Item = styled.div`
height: 120px;
width: 20vw;
position: relative;
border-radius: 10px;
overflow: hidden;

@media(max-width: 610px){
width: 30vw;
}

:hover {
  img {
    transform: scale(1.3);
  }
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

img {
  height: 120px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: .2s ease-out;
}
`

const Wrapper = styled.div`
width: 100%;

h3 {
  margin-bottom: 20px;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.item-carousel {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 20px;

  a {
    height: 120px;
    text-decoration: none;
    margin-right: 20px;
  }

  ::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #000000;
  border: 0px none #ffffff;
  border-radius: 18px;
}
::-webkit-scrollbar-thumb:hover {
  background: #000000;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border: 0px none #ffffff;
  border-radius: 100px;
}
::-webkit-scrollbar-track:hover {
  background: #ffffff;
}
::-webkit-scrollbar-track:active {
  background: #ffffff;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
}
`

export default HomeFeed