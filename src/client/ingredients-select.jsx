import React from "react";

const IngredientsSelect = ({ ingredients, value, onChange }) => (
    <select
        placeholder="Select"
        value={value}
        onChange={onChange}
    >
        <option id="">--Please choose an option--</option>
        {
            ingredients.map(ingredient => (
                <option value={ingredient.id} key={ingredient.id}>{ingredient.name}</option>
            ))
        }
    </select>
);

export default IngredientsSelect;
