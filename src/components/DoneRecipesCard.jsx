import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ doneRecipes }) {
  return (
    <div>
      {doneRecipes?.map((element, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${element.nationality} - ${element.category} - ${element.alcoholicOrNot}`}
          </p>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ element.image }
            height={ 250 }
            width={ 250 }
            alt=""
          />
          <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {element.doneDate}
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="shareButton" />
          </button>
          {element.tags?.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  doneRecipes: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    // tags: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.array,
  }.isRequired),
}.isRequired;

export default DoneRecipesCard;
