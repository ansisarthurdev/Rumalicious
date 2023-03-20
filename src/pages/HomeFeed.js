import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//components
import ItemSingle from '../components/ItemSingle'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

//redux
import { useDispatch, useSelector } from 'react-redux'
import { updatePath, updateVodkaDrinks, updateGinDrinks, selectVodka, selectGin, updateWhiskeyDrinks, selectWhiskey } from '../app/appSlice'

//router
import { Link } from 'react-router-dom'

const HomeFeed = () => {

  const dispatch = useDispatch();
  const [randomDrinks, setRandomDrinks] = useState([]);
  const vodkaDrinks = useSelector(selectVodka);
  const ginDrinks = useSelector(selectGin);
  const whiskeyDrinks = useSelector(selectWhiskey);

  //localstorage
  const storage = window.localStorage;
  const dataVodka = storage.getItem('dataVodka');
  const dataGin = storage.getItem('dataGin');
  const dataWhiskey = storage.getItem('dataWhiskey');

  const drinksCount = 40;


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
      storage.setItem('dataVodka', JSON.stringify(data));
      dispatch(updateVodkaDrinks(data?.drinks))
    })
  }
  
  const fetchDataGin = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then((response) => response.json())
    .then(data => {
      storage.setItem('dataGin', JSON.stringify(data));
      dispatch(updateGinDrinks(data?.drinks))
    })
  }

  const fetchDataWhiskey = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey')
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      storage.setItem('dataWhiskey', JSON.stringify(data));
      dispatch(updateWhiskeyDrinks(data?.drinks))
    })
  }


  useEffect(() => {
    //get 10 random items
    for(let i = 0; i < 10; i++){
      fetchDataRandom();
    }

    if(vodkaDrinks?.length === 0){
      //fetch vodka drinks
      if(!dataVodka){
        fetchDataVodka();
      } else {
        const data = JSON.parse(dataVodka);
        dispatch(updateVodkaDrinks(data?.drinks));
      }
    }

    if(ginDrinks?.length === 0){
      //fetch gin drinks
      if(!dataGin){
        fetchDataGin();
      } else {
        const data = JSON.parse(dataGin);
        dispatch(updateGinDrinks(data?.drinks));
      } 
    }

    if(whiskeyDrinks?.length === 0){
      //fetch whiskey drinks
      if(!dataWhiskey){
        fetchDataWhiskey();
      } else {
        const data = JSON.parse(dataWhiskey);
        dispatch(updateWhiskeyDrinks(data?.drinks));
      }
      
    }

    //eslint-disable-next-line
  }, [])

  //update path
  useEffect(() => {
    dispatch(updatePath('/'))
  }, [dispatch])

  return (
    <Wrapper>
      <h3>Daily popular drinks</h3>
      <div className='item-carousel-wrapper'>
      <div className='item-carousel'>
        {randomDrinks?.length > 0 ? <>
          {randomDrinks?.map(drink => (
          <Link to={`/drinks/${drink?.idDrink}`}>
            <Item key={drink?.idDrink}>
              <img src={drink?.strDrinkThumb} alt='' />
              <div className='item-information'>
                <p>{drink?.strDrink}</p>
                <p>{drink?.strCategory}</p>
                <p>{drink?.strAlcoholic}</p>
              </div>
            </Item>
          </Link>
          ))}
        </> : <>
          <Skeleton variant="rounded" width={180} height={120} /><Skeleton variant="rounded" width={180} height={120} /><Skeleton variant="rounded" width={180} height={120} /><Skeleton variant="rounded" width={180} height={120} /><Skeleton variant="rounded" width={180} height={120} />
        </>}
        </div>
        <div className='item-carousel-fade'></div>
      </div>

      <h3 style={{marginTop: 20}}>Top Cocktails - Vodka</h3>
      <div className='item-list'>
        {vodkaDrinks.slice(0, drinksCount)?.map(drink => (
          <ItemSingle 
            key={drink?.idDrink}
            id={drink?.idDrink}
            name={drink?.strDrink}
            alco={'Alcoholic'}
            image={drink?.strDrinkThumb}
        />
        ))}
      </div>

      <h3 style={{marginTop: 50}}>Top Cocktails - Gin</h3>
      <div className='item-list' style={{marginBottom: 20}}>
        {ginDrinks.slice(0, drinksCount)?.map(drink => (
          <ItemSingle 
            key={drink?.idDrink}
            id={drink?.idDrink}
            name={drink?.strDrink}
            alco={'Alcoholic'}
            image={drink?.strDrinkThumb}
        />
        ))}
      </div>

      <h3 style={{marginTop: 50}}>Top Cocktails - Whiskey</h3>
      <div className='item-list' style={{marginBottom: 20}}>
        {whiskeyDrinks.slice(0, drinksCount)?.map(drink => (
          <ItemSingle 
            key={drink?.idDrink}
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
width: 10vw;
min-width: 120px;
position: relative;
border-radius: 10px;
overflow: hidden;

@media(max-width: 610px){
width: 30vw;
}

:hover {
  img {
    transform: scale(1.3);
    filter: grayscale(0);
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
  filter: grayscale(70%);
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

.item-carousel-wrapper {
  position: relative;

  .item-carousel-fade {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(270deg, white, transparent);
    pointer-events: none;
    z-index: 1;
  }
}

.item-carousel {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 20px;
  position: relative;

  .MuiSkeleton-rounded {
    margin-right: 10px;
  }

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