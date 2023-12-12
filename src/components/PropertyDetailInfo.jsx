import {Typography, Card, CardContent, Grid} from '@mui/material';

const PropertyDetailInfo = ({property}) => {
    const infoColor = "black";

    return (
        <Card sx={{margin: "30px"}}>
            <CardContent sx={{padding: "30px"}}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h6" component="span" sx={{fontWeight: 'bold', color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            Type:
                        </Typography>
                        {' '}
                        <Typography variant="h6" component="span" sx={{color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            {property.type}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            Address:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            {property.location}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            Price:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            {property.price} $
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            Description:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor, fontFamily: "'OpenSans-SemiBold', serif",
                            letterSpacing: "1px"}}>
                            {property.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PropertyDetailInfo;
