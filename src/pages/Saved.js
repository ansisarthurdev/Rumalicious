import React, { useEffect } from 'react'
import styled from 'styled-components'

//redux
import { useDispatch } from 'react-redux'
import { updatePath } from '../app/appSlice'

//components

const Saved = () => {

  const dispatch = useDispatch();

  //update path
  useEffect(() => {
    dispatch(updatePath('/saved'))
  }, [dispatch])

  return (
    <Wrapper>
      Saved
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default Saved