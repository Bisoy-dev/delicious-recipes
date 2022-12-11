import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { API_KEY } from '../constants/urls'
import { Link } from 'react-router-dom'

import React, { useEffect, useState } from 'react'

function Searched() {
    let param = useParams()
    const [searchedRecipes, setSearchedRecipes] = useState([])
    useEffect(() => {
        getSearched(param.term)
    }, [param.term])

    const getSearched = async (term) => {
        const repsonse = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=9&query=${term}`
        )
        const data = await repsonse.json()
        setSearchedRecipes(data.results)
    }
    return (
        <Grid>
            {searchedRecipes.map((recipe) => {
                return <Card key={recipe.id}>
                    <Link to={'/recipe/' + recipe.id}>
                        <img src={recipe.image} alt="" />
                        <h4>{recipe.title}</h4>
                    </Link>
                </Card>
            })}
            { searchedRecipes.length === 0 ? <NotFoundMessage><h4>Items not found!</h4></NotFoundMessage> : <></> }
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

const NotFoundMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 15rem;
    h4{
        font-size: 2rem;
        text-align: center;
        
    }
`

export default Searched