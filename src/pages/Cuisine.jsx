import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { API_KEY } from '../constants/urls'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let param = useParams()
    useEffect(() => {

        getCuisine(param.type)
        console.log(param.type)
    }, [param.type])

    const getCuisine = async (name) => {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=9&cuisine=${name}`
            );
        const data = await response.json();
        console.log(data)
        setCuisine(data.results)
    }

    return (
        <Grid
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            >
            {cuisine?.map((item) => {
                return (
                    <Card key={item.id}>
                        <img src={item.image} alt={"image"} />
                        <h4>{item.title}</h4>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled(motion.div)`
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

export default Cuisine