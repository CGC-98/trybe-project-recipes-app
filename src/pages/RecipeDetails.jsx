import React from 'react';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import useRecipeAPI from '../hook/useRecipeAPi';
import useRecomendAPI from '../hook/useRecomendAPI';
import useLocalStorage from '../hook/useLocalStorage';
import BtnStartRecipe from '../components/BtnStartRecipe';
import BtnFavorite from '../components/BtnFavorite';
import BtnShare from '../components/BtnShare';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/RecipeDetails.css';
import '../css/BtnShare.css';
import BtnBack from '../components/BtnBack';

function RecipeDetails() {
  const { recipes, typeFood, alertCopy, ingCalc,
    handlerClickCopy } = useRecipeAPI();
  const { recipe, id } = recipes;
  const { recomendation } = useRecomendAPI();
  const history = useHistory();
  const { handlerFavorite, favorite } = useLocalStorage(recipe);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      {
        history.location.pathname.includes('/meals')

          ? (
            <div>
              <img
                data-testid="recipe-photo"
                className="recipe-photo"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <h1
                className="recipe-title"
                data-testid="recipe-title"
              >
                { recipe.strMeal }
              </h1>
              <h4
                className="recipe-category"
                data-testid="recipe-category"
              >
                { recipe.strCategory }
              </h4>
              <BtnBack />
              <div className="ingredients">
                <h4>
                  Ingredients:
                </h4>
                <ul data-testid="ingredients-list">
                  {
                    ingCalc().map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ ingredient }
                      >
                        { ingredient }
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="instructions">
                <h4> Instructions</h4>
                <p
                  data-testid="instructions"
                >
                  { recipe.strInstructions }
                </p>
              </div>
              <div className="video">
                <iframe
                  data-testid="video"
                  title={ recipe.strMeal }
                  src={ recipe.strYoutube }
                  frameBorder="0"
                />
              </div>
              <BtnStartRecipe id={ id } typeFood={ typeFood } />
              <BtnShare
                id={ id }
                typeFood={ typeFood }
                handlerClickCopy={ handlerClickCopy }
              />
              {alertCopy && <p className="alert">Link copied!</p>}
              <BtnFavorite
                handlerFavorite={ handlerFavorite }
                favorite={ favorite }
              />
              {
                recomendation === undefined
                  ? (
                    <p>Loading...</p>
                  )
                  : (
                    <div className="slider-container">
                      <Slider { ...settings } className="slider-container">
                        {
                          recomendation.map((recom, index) => (
                            <button
                              key={ recom.idDrink }
                              onClick={ () => {
                                history
                                  .push(`/drinks/)${recom.idDrink}`);
                              } }
                              className="item"
                              data-testid={ `${recomendation
                                .indexOf(recomendation[index])}-recommendation-card` }
                            >
                              <img
                                src={ recom.strDrinkThumb }
                                alt={ recom.strDrink }
                                data-testid="carousel-image"
                              />
                              <h1
                                data-testid={ `${recomendation
                                  .indexOf(recomendation[index])}-recommendation-title` }
                              >
                                { recom.strDrink }
                              </h1>
                            </button>
                          ))
                        }
                      </Slider>
                    </div>
                  )
              }
            </div>
          )
          : (
            <div>
              <img
                className="recipe-photo"
                data-testid="recipe-photo"
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
              <h1
                className="recipe-title"
                data-testid="recipe-title"
              >
                { recipe.strDrink }
              </h1>
              <div
                className="recipe-category"
                data-testid="recipe-category"
              >
                { `${recipe.strCategory}: ${recipe.strAlcoholic}` }
              </div>
              <BtnBack />
              <div className="ingredients">
                <h4>
                  Ingredients:
                </h4>
                <ul data-testid="ingredients-list">
                  {
                    ingCalc().map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ `${ingredient}-${index}` }
                      >
                        { ingredient }
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="instructions">
                <h4>Instructions</h4>
                <p
                  data-testid="instructions"
                >
                  { recipe.strInstructions }
                </p>
              </div>
              <BtnStartRecipe id={ id } typeFood={ typeFood } />
              <BtnShare
                id={ id }
                typeFood={ typeFood }
                handlerClickCopy={ handlerClickCopy }
              />
              {alertCopy && <p className="alert">Link copied!</p>}
              <BtnFavorite
                handlerFavorite={ handlerFavorite }
                favorite={ favorite }
              />
              {
                recomendation === undefined
                  ? (
                    <p>Loading...</p>
                  )
                  : (
                    <div className="slider-container">
                      <Slider { ...settings }>
                        {
                          recomendation.map((recom, index) => (
                            <button
                              key={ recom.idMeal }
                              onClick={ () => {
                                history
                                  .push(`/meals/)${recom.idMeal}`);
                              } }
                              className="item"
                              data-testid={ `${recomendation
                                .indexOf(recomendation[index])}-recommendation-card` }
                            >
                              <img
                                src={ recom.strMealThumb }
                                alt={ recom.strMeal }
                                data-testid="carousel-image"
                              />
                              <h1
                                data-testid={ `${recomendation
                                  .indexOf(recomendation[index])}-recommendation-title` }
                              >
                                { recom.strMeal }
                              </h1>
                            </button>))
                        }
                      </Slider>
                    </div>
                  )
              }
            </div>
          )
      }
    </div>
  );
}

export default RecipeDetails;
