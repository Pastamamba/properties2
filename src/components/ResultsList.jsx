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

    const typographyStyle = {
        fontFamily: "'OpenSans-SemiBold', serif",
        fontSize: "15px",
        letterSpacing: "1px",
        padding: "0.1em"
    }

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
                            borderRadius: "0.5em",
                        }}>
                            <img
                                alt={`${property.id}`}
                                src={property.imgs[0]}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: "350px",
                                    borderRadius: '8px',
                                    flexShrink: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex"
                            }}
                            />
                            <div style={{ marginLeft: "10px", flexGrow: 1 }}>
                                <Typography sx={typographyStyle} variant="subtitle1">{property.type}</Typography>
                                <Typography sx={typographyStyle}  variant="body2">{property.location}</Typography>
                                <Typography sx={typographyStyle}  variant="h6" style={{ color: 'green', fontWeight: 'bold' }}>
                                    {property.price} €
                                </Typography>
                                <Typography sx={typographyStyle}  variant="body2" style={{ color: 'green' }}>
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
