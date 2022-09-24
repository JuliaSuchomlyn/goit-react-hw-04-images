import PropTypes from 'prop-types';
import { useState } from "react";
import { SearchbarComponent, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

    const handleChangeQuery = e => {
        const  query  = e.currentTarget.value;
        setQuery(query);
    };

    const handleSubmit = e => {
        e.preventDefault();
                if
            (query.trim() === '') {
            alert('Enter what you are looking for.');
            return;
        }
            onSubmit(query);
    };

            return (
                <SearchbarComponent>
                    <SearchForm onSubmit={handleSubmit}>
                        
                        <SearchFormButton type="submit">
                            <SearchFormButtonLabel/>
                        </SearchFormButton>
                        
                        <SearchFormInput
                            value={query}
                            onChange={handleChangeQuery}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />

                    </SearchForm>
                </SearchbarComponent>
            )
    }


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
