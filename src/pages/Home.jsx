import {useState, useEffect, useCallback} from 'react';
import {SearchForm} from '../components/SearchForm.jsx';
import ResultsList from '../components/ResultsList.jsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../styles/home.css";
import useSlideInFromLeft from "../hooks/useSlideInFromLeft.js";

const Home = ({favourites, toggleFavorite}) => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const slideRef = useSlideInFromLeft();


    // Function to convert a date object to milliseconds
    const convertDateToMillis = (dateObj) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        const monthNumber = monthNames.indexOf(dateObj.month) + 1;
        const dateString = `${dateObj.year}-${String(monthNumber).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
        return new Date(dateString).getTime();
    };

    // Load properties data from a JSON file when the component mounts
    useEffect(() => {
        const loadProperties = async () => {
            const propertiesData = await import('../properties/properties.json');
            const convertedProperties = propertiesData.properties.map(property => ({
                ...property,
                addedMillis: convertDateToMillis(property.added),
            }));
            setProperties(convertedProperties);
        };

        loadProperties();
    }, []);

    // Callback function to handle property search based on criteria
    const handleSearch = useCallback((criteria) => {
        // Convert search criteria dates to milliseconds
        const dateAddedStartMillis = criteria.dateAdded ? new Date(criteria.dateAdded).getTime() : null;
        const dateAddedEndMillis = criteria.dateAddedEnd ? new Date(criteria.dateAddedEnd).getTime() : null;

        const results = properties.filter((property) => {
            // Check if the property matches the type criteria
            const typeMatch = criteria.type ? property.type.toLowerCase() === criteria.type.toLowerCase() : true;

            // Check if the property matches the price criteria
            const priceMatch =
                (criteria.minPrice ? property.price >= Number(criteria.minPrice) : true) &&
                (criteria.maxPrice ? property.price <= Number(criteria.maxPrice) : true);

            // Check if the property matches the bedroom criteria
            const bedroomsMatch =
                (criteria.minBedrooms ? property.bedrooms >= Number(criteria.minBedrooms) : true) &&
                (criteria.maxBedrooms ? property.bedrooms <= Number(criteria.maxBedrooms) : true);

            // Check if the property matches the postcode area criteria
            const postcodeAreaMatch = criteria.postcodeArea ? property.postcodeArea === criteria.postcodeArea : true;

            // Date comparison logic
            let dateMatch = true;
            if (dateAddedStartMillis && dateAddedEndMillis) {
                dateMatch = property.addedMillis >= dateAddedStartMillis && property.addedMillis <= dateAddedEndMillis;
            } else if (dateAddedStartMillis) {
                dateMatch = property.addedMillis >= dateAddedStartMillis;
            } else if (dateAddedEndMillis) {
                dateMatch = property.addedMillis <= dateAddedEndMillis;
            }

            // Return true if all criteria match, false otherwise
            return typeMatch && priceMatch && bedroomsMatch && postcodeAreaMatch && dateMatch;
        });

        setFilteredProperties(results);
    }, [properties]);

    // Initialize property search with URL parameters when the component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const criteria = {
            type: searchParams.get('type') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            minBedrooms: searchParams.get('minBedrooms') || '',
            maxBedrooms: searchParams.get('maxBedrooms') || '',
            dateAdded: searchParams.get('dateAdded') || null,
            dateAddedEnd: searchParams.get('dateAddedEnd') || null,
            postcodeArea: searchParams.get('postcodeArea') || ''
        };
        handleSearch(criteria);
    }, [handleSearch]);

    return (
        <>
            <Box ref={slideRef} sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h2 style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "40px",
                    marginBottom: "30px",
                    fontWeight: "200px"
                }}>Welcome to properties.com</h2>
            </Box>

            {/* Display the search form */}
            <SearchForm onSearch={handleSearch}/>

            {/* Display search results count */}
            <Typography variant="h6" sx={
                {
                    margin: '20px 0',
                    fontFamily: "'OpenSans-SemiBold', serif",
                    fontWeight: 600,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"
                }}>
                Search Results: {filteredProperties.length}
            </Typography>

            {/* Display the list of filtered properties */}
            <ResultsList properties={filteredProperties} favourites={favourites} toggleFavorite={toggleFavorite}/>
        </>
    );
};

export default Home;
