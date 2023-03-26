import React from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import UUID from '../UUID/UUID';

const DUMMY_MEALS = [
    {
        id: UUID(),
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: UUID(),
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: UUID(),
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: UUID(),
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];


const AvailableMeals = () => {


    let mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} meal={meal} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>

        </section>
    )
}

export default AvailableMeals