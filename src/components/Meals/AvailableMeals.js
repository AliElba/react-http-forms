import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect, useState} from "react";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const AvailableMeals = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://react-test-ee55b-default-rtdb.firebaseio.com/meals.json')
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true)
                    console.log('original: ', results)

                    const itemsTransformed = [];
                    for (const key in results) {
                        itemsTransformed.push({id: key, ...results[key]})
                    }

                    console.log('itemsTransformed: ', itemsTransformed)
                    setItems(itemsTransformed)
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }, []);

    if (error) {
        return <div className={classes.error}>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div className={classes.loading}>Loading...</div>;
    }

    if (!isLoaded) {
        return <div> still Loading...</div>;
    }

    const mealsList = items.map((meal) => (
        <MealItem key={meal.id}
            {...meal}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
