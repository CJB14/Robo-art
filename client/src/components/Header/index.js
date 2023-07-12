import React, { useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const HeaderTop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Perform search logic using the searchTerm
        // Redirect to the search results page or any desired route
        history.push(`/search?term=${searchTerm}`);
    };

    return (
        <Grid.Column width={6}>
            <div className="search-container">
                <Input icon="search" placeholder="Search..." fluid />
                <Button primary className='search-btn'>Submit</Button>
            </div>
        </Grid.Column>
    );
};

export default HeaderTop;
