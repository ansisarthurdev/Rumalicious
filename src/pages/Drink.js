import React, { useEffect, useState} from 'react'
import styled from 'styled-components'

//router
import { useParams, Link } from 'react-router-dom'

//icons
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import { Bookmark } from '@styled-icons/bootstrap/Bookmark'
import { BookmarkFill } from '@styled-icons/bootstrap/BookmarkFill'

const Drink = () => {

    const params = useParams();
    const [data, setData] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [measure, setMeasure] = useState([]);
    const storage = window.localStorage;
    const [liked, setLiked] = useState(false);
 
    const checkIfLiked = () => {
        const currentLikedDrinks = storage.getItem('likedDrinks');
        const parsed = JSON.parse(currentLikedDrinks);

        if(parsed === null){
            setLiked(false)
        } else {
            setLiked(parsed?.findIndex((like) => like?.idDrink === data?.idDrink) !== -1);
        }
    }

    //add to liked drinks
    const likeDrink = () => {
        const currentLikedDrinks = storage.getItem('likedDrinks');
        const parsed = JSON.parse(currentLikedDrinks);
        let newArr = [];

        
        if(!liked){
            //if drink is not on liked list yet - add
        if(JSON.parse(currentLikedDrinks) !== null){
            newArr = parsed;
            newArr.unshift(data);
            storage.setItem('likedDrinks', JSON.stringify(newArr));
            //update like state
            checkIfLiked();
        } else {
            newArr.push(data);
            storage.setItem('likedDrinks', JSON.stringify(newArr));
            //update like state
            checkIfLiked();
        }} else {
            //if drink is already on liked list - remove
            newArr = parsed;
            const filtered = newArr?.filter((item) => item?.idDrink !== data?.idDrink);
            storage.setItem('likedDrinks', JSON.stringify(filtered));
            //update like state
            checkIfLiked();
        }
        
    }

    useEffect(() => {
        checkIfLiked();
        //eslint-disable-next-line
    }, [data])
    
    //get data
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`)
        .then(response => response.json())
        .then(data => {
            //remove null values
            let drink = Object.fromEntries(Object.entries(data.drinks[0]).filter(([_, v]) => v != null));
            setData(drink);
          })
    }, [params.id])

    //filter ingredients & measure
    useEffect(() => {
        if(data?.length !== 0){
            const drink = Object.entries(data);
            const ingredientsArray = drink.filter(([key, value]) => key.startsWith('strIngredient')).map(([key, value]) => value)
            const measureArray = drink.filter(([key, value]) => key.startsWith('strMeasure')).map(([key, value]) => value)
            setIngredients(ingredientsArray);
            setMeasure(measureArray);
        }
    }, [data])

  return (
    <Wrapper>
        <Top><Link to='/'><LeftArrowAlt className ='icon' /> Go back</Link>
            {!liked ? <Bookmark className='icon bookmark' onClick={() => likeDrink()} /> : <BookmarkFill className='icon bookmark' onClick={() => likeDrink()} />}
        </Top>

        <Information>
            <div className='left'>
                <img src={data?.strDrinkThumb} alt='' />
            </div>
            <div className='right'>
                <h3>{data?.strDrink}</h3>
                <p style={{color: 'gray', fontSize: '.8rem'}}>{data?.strAlcoholic} • {data?.strCategory}</p>
                <p style={{color: 'gray', fontSize: '.8rem'}}>Served in: {data?.strGlass}</p>

                <h4>Ingredients & measure</h4>
                <div className='ingredients-box'>
                    <div className='ingredients'>
                        {ingredients.map(ingredient => <p key={ingredient}>{ingredient}</p>)}
                    </div>
                    <div className='measure'>
                        {measure.map(measure => <p key={measure}>{measure}</p>)}
                    </div>
                </div>

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
max-width: 480px;

    @media(max-width: 850px){
        width: 100%;
        max-width: 650px;
    }

    h4 {
        margin: 20px 0 10px 0;
        padding: 0;
    }

    .ingredients-box {
    display: flex;

    .ingredients {
    margin-right: 30px;
    }
    }

}

.left {
    width: 60%;
    img {
    height: 300px;
    object-fit: cover;
    width: 100%;
    }

    @media(max-width: 850px){
        width: 100%;
    }
}
`

const Top = styled.div`
display: flex;
justify-content: space-between;

.bookmark {
    transition: .2s ease-out;

    :hover {
        transform: scale(1.2);
    }
}

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