import React, { useEffect, useState} from 'react'
import styled from 'styled-components'

//router
import { useParams, Link } from 'react-router-dom'

//icons
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import { Bookmark } from '@styled-icons/bootstrap/Bookmark'

const Drink = () => {

    const params = useParams();
    const [data, setData] = useState([]);
    const [ingredients, setIngredients] = useState([]);


    
    //get data
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`)
        .then(response => response.json())
        .then(data => {
            let drink = Object.fromEntries(Object.entries(data.drinks[0]).filter(([_, v]) => v != null));
            setData(drink);
          })
    }, [params.id])

  return (
    <Wrapper>
        <Top><Link to='/'><LeftArrowAlt className ='icon' /> Go back</Link><Bookmark className='icon' /></Top>

        <Information>
            <div className='left'>
                <img src={data?.strDrinkThumb} alt='' />
            </div>
            <div className='right'>
                <h3>{data?.strDrink}</h3>
                <p style={{color: 'gray', fontSize: '.8rem'}}>{data?.strAlcoholic} • {data?.strCategory}</p>
                <p style={{color: 'gray', fontSize: '.8rem'}}>Served in: {data?.strGlass}</p>
                <h4>Ingredients</h4>
                <p style={{fontSize: '.6', color: 'gray'}}>Development process</p>

                <h4>How to make it?</h4>
                <p>{data?.strInstructions}</p>
            </div>
        </Information>
        
    </Wrapper>
  )
}

const Information = styled.div`
display: flex;
gap: 20px;
margin: 20px 0 20px 0;
@media(max-width: 850px){
    flex-direction: column;
    align-items: center;
}

.right {
h4 {
    margin: 20px 0 10px 0;
    padding: 0;
}
}

.left {
    width: 60%;
    img {
    height: 300px;
    object-fit: cover;
    width: 100%;
    }
}
`

const Top = styled.div`
display: flex;
justify-content: space-between;

.icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;

    :hover {
        opacity: .7;
    }
}

a {
    color: black;
    text-decoration: none;

    .icon {
        width: 24px;
        height: 24px;
    }
}
`

const Wrapper = styled.div``

export default Drink