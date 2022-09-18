import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//redux
import { useDispatch } from 'react-redux'
import { updatePath } from '../app/appSlice'

//components
import ItemSingle from '../components/ItemSingle'


const Browse = () => {

  const [active, setActive] = useState('cocktail');
  const [searchTxt, setSearchTxt] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(searchTxt?.length > 0){
      if(active === 'cocktail'){
        const getData = setTimeout(() => {
          setLoading(true);
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTxt}`)
          .then(result => result.json())
          .then(data => setResults(data.drinks))
          .then(() => setLoading(false))
        }, 1000)
    
        return () => clearTimeout(getData)
      } else if (active === 'ingredient'){
        const getData = setTimeout(() => {
          setLoading(true);
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchTxt}`)
          .then(result => result.json())
          .then(data => setResults(data.ingredients))
          .then(() => setLoading(false))
        }, 1000)
    
        return () => clearTimeout(getData)
      }
    }

  }, [searchTxt, active])

  //update path
  useEffect(() => {
    dispatch(updatePath('/browse'))
  }, [dispatch])

  useEffect(() => {
    const cocktail = document.querySelector('.cocktail');
    const ingredient = document.querySelector('.ingredient');

    if(active === 'cocktail'){
      cocktail.classList.add('active')
      ingredient.classList.remove('active')
      setSearchTxt('');
    } else if (active === 'ingredient'){
      cocktail.classList.remove('active')
      ingredient.classList.add('active')
      setSearchTxt('');
    }
    //eslint-disable-next-line
  }, [active])

  return (
    <Wrapper style={{marginBottom: results?.length > 0 ? '0' : '60vh'}}>
      {loading ? <p style={{color: 'gray', fontSize: '1.2rem'}}>Searching...</p> : results?.length > 0 ? <p style={{color: 'gray', fontSize: '1.2rem'}}>Here is what we found,</p> : <p style={{color: 'gray', fontSize: '1.2rem'}}>What are you looking for?</p>}

      <ul>
        <li className='cocktail' onClick={() => {setActive('cocktail'); setResults([])}}>Cocktail by name</li>
        <li className='ingredient' onClick={() => {setActive('ingredient'); setResults([])}}>Ingredient by name</li>
      </ul>

      <div className='search'>
        <div className='input-box'>
          <input type='text' placeholder={`Search ${active} by name...`} value={searchTxt} onChange={e => setSearchTxt(e.target.value)}/>
        </div>
      </div>

      {results?.length > 0 && active === 'ingredient' &&
      <div className='item-list-ingredients'>
        {results.slice(0, 20)?.map(item => (
          <div className='ingredients-list' style={{marginTop: 40, marginBottom: 40}}>
            <div className='ingredient'>
              <h3 style={{fontSize: '2rem'}}>{item?.strIngredient}</h3>
              {item?.strDescription?.length > 0 ? <p>{item?.strDescription}</p> : <p style={{color: 'gray', fontSize: '.8rem'}}>No description available</p>}
            </div>
          </div>  
        ))}
      </div>}

      {results?.length > 0 && active === 'cocktail' &&
      <div className='item-list'>
      {results.slice(0, 20)?.map(drink => (
        <ItemSingle 
          id={drink?.idDrink}
          name={drink?.strDrink}
          alco={'Alcoholic'}
          image={drink?.strDrinkThumb}
      />
      ))}
    </div>}

    </Wrapper>
  )
}

const Wrapper = styled.div`

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 40px;
}

.search {
  width: 100%;
  margin-top: 20px;

  .input-box {
    width: 100%;

    input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 1rem;
    }
  }
}

ul {
  list-style-type: none;
  display: flex;
  margin: 10px 0 0 0;
  padding: 0;

  li {
    margin-right: 10px;
    font-size: .9rem;
    cursor: pointer;

    :hover {
      border-bottom: 2px solid black;
    }
  }

  .active {
    border-bottom: 2px solid black;
  }
}
`

export default Browse