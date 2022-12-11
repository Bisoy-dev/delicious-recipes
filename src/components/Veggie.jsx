import { useEffect, useState } from "react";
import { API_KEY } from '../constants/urls'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

export default function Veggie() {

    const [veggies, setVeggies] = useState([])

    useEffect(() => {
        getVeggies();
    }, [])

    const getVeggies = async () => {
        const check = localStorage.getItem('veggies')

        if(check){
            setVeggies(JSON.parse(check))
        }else{
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9&tags=vegetarian`
                )
            const data = await response.json();
            setVeggies(data.recipes)
            localStorage.setItem('veggies', JSON.stringify(data.recipes))
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Our Vegetarian Picks</h3>

                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                }}>
                    {veggies.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient/>
                                    </Link>
                                </Card>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 5rem 0rem;
`;
const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    img{
        border-radius: 2rem;
        position: absolute;
        left:0;
        width:100%;
        height:100%;
        object-fit: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 0%);
        color: white;
        width:100%;
        text-align: center;
        font-weight: 600;
        font-size: 1.5rem;
        height:40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0, 0, 0, 0.5));
`;