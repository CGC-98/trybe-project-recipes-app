import { useContext, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';
import {
  INIT_SEARCH,
  INGREDIENT_LABEL,
  NAME_LABEL,
  LETTER_LABEL,
} from '../helpers/strings';
import '../css/SearchBar.css';

function SearchBar() {
  const { setSearchBar } = useContext(SearchBarContext);
  const [search, setSearch] = useState(INIT_SEARCH);
  const labels = [INGREDIENT_LABEL, NAME_LABEL, LETTER_LABEL];

  const textInput = (
    <input
      type="text"
      className="searchBarInput"
      onChange={ ({ target }) => setSearch({ ...search, text: target.value }) }
      data-testid="search-input"
    />
  );

  const alterRadioInput = (
    <>
      {labels.map((label) => (
        <label key={ label } htmlFor={ `${label}Radio` }>
          <input
            type="radio"
            id={ `${label}Radio` }
            name="labelRadio"
            value={ label }
            onChange={ ({ target }) => setSearch({ ...search, radio: target.value }) }
            checked={ search.radio === label }
            data-testid={ `${label}-search-radio` }
          />
          <span>{`${label} `}</span>
        </label>
      ))}
    </>
  );

  const button = (
    <button
      type="button"
      className="searchBarButton"
      onClick={ () => setSearchBar(search) }
      disabled={ !search.text }
      data-testid="exec-search-btn"
    >
      Search
    </button>
  );

  return (
    <>
      {textInput}
      <div className="searchBarRadio">
        {alterRadioInput}
        {button}
      </div>
    </>
  );
}

export default SearchBar;
