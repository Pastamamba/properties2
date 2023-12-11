import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    Typography,
    Grid,
    IconButton
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ResultsList = ({ properties, favourites, toggleFavorite }) => {
    const navigate = useNavigate();

    const handleListItemClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    const renderFavoriteIcon = (propertyId) => {
        return favourites.includes(propertyId) ? <StarIcon color="secondary" /> : <StarOutlineIcon />;
    };

    return (
        <List component="nav" aria-label="search results">
            <Grid container spacing={2} wrap="wrap">
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property.id} sx={{
                        padding: "1em",
                        '&:hover': {
                            cursor: "pointer",
                        }
                    }}>
                        <ListItem onClick={() => handleListItemClick(property.id)} style={{
                            padding: '20px',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginBottom: '10px',
                            minHeight: "380px",
                            borderRadius: "0.5em"
                        }}>
                            <img
                                alt={`Image of ${property.type}`}
                                src={property.imgs[0]}
                                style={{ width: '100%', maxWidth: '250px', height: 'auto', borderRadius: '8px', flexShrink: 1 }}
                            />
                            <div style={{ padding: '0 20px', flexGrow: 1 }}>
                                <Typography variant="subtitle1">{property.type}</Typography>
                                <Typography variant="body2">{property.location}</Typography>
                                <Typography variant="h6" style={{ color: 'green', fontWeight: 'bold' }}>
                                    {property.price} €
                                </Typography>
                                <Typography variant="body2" style={{ color: 'green' }}>
                                    Price
                                </Typography>
                            </div>
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(property.id);
                            }}>
                                {renderFavoriteIcon(property.id)}
                            </IconButton>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </List>
    );
};

export default ResultsList;
