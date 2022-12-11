import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { API_KEY } from "../constants/urls";

import React from 'react'

function Recipe() {
    let param = useParams()
    const [recipe, setRecipe] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const getDetails = async () => {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${param.id}/information?apiKey=${API_KEY}`
        )
        const data = await response.json()
        setRecipe(data)
        console.log(data)
    }

    useEffect(() => {
        getDetails();
    }, [param.id])
    return (
        <DetailWrapper>
            <div>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt="" />
            </div>
            <Info>
                <Button 
                    className={activeTab === 'instructions' ? 'active' : ''} 
                    onClick={() => setActiveTab('instructions')}>
                        Instructions
                </Button>
                <Button 
                    className={activeTab === 'ingredients' ? 'active' : ''} 
                    onClick={() => setActiveTab('ingredients')}>
                        Ingredients
                </Button>
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: recipe.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}></h3>
                </div>
                {/* <div>
                    <ul>
                        {recipe.extendedIngredients?.map((item) => {
                            return (
                                <li key={item?.id}>{item?.original}</li>
                            )
                        })}
                    </ul>
                </div> */}
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 100.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`

const Info = styled.div`
    margin-left: 10rem;
`

export default Recipe