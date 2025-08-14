import React from "react";

function Favorites({ favorites, onSelect }) {
  return (
    <div className="favorites">
      <h3>⭐ Favorite Cities</h3>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <button onClick={() => onSelect(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
