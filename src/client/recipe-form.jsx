import React from "react";

const RecipeForm = ({ name, link, image, onChange }) => (
    <form>
        <div className="form-row">
            <div>
                <label>Name</label>
                <input
                    value={name}
                    onChange={e => onChange("name", e.target.value)}
                />
            </div>
            <div>
                <label>Link</label>
                <input
                    value={link}
                    onChange={e => onChange("link", e.target.value)}
                />
            </div>
        </div>
        <div className="form-row">
            <div>
                <label>Image</label>
                <input
                    value={image}
                    onChange={e => onChange("image", e.target.value)}
                />
            </div>
        </div>
    </form>
);

export default RecipeForm;
