import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//redux
import { useDispatch } from 'react-redux'
import { updatePath } from '../app/appSlice'

//components
import ItemSingle from '../components/ItemSingle'

const Saved = () => {

  const dispatch = useDispatch();
  const storage = window.localStorage;
  const [data, setData] = useState([]);

  //get liked drinks
  useEffect(() => {
    const currentLikedDrinks = storage.getItem('likedDrinks');
    const parsed = JSON.parse(currentLikedDrinks);
    setData(parsed);
  }, [storage])

  //update path
  useEffect(() => {
    dispatch(updatePath('/saved'))
  }, [dispatch])

  return (
    <Wrapper style={{marginBottom: data?.length > 0 ? '20vh' : '60vh'}}>
      <h3>Your liked drinks</h3>

      <div className='item-list'>
      {data?.length === 0 && <p>The list is empty</p>}
      {data === null && <p>The list is empty</p>}
      {data?.length > 0 && data?.map(drink => (
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

const Wrapper = styled.div`

h3 {
  margin-bottom: 30px;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
`

export default Saved