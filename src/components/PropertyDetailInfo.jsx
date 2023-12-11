import {Typography, Card, CardContent, Grid} from '@mui/material';

const PropertyDetailInfo = ({property}) => {
    const infoColor = "black";

    return (
        <Card sx={{margin: "30px"}}>
            <CardContent sx={{padding: "30px"}}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h6" component="span" sx={{fontWeight: 'bold', color: infoColor}}>
                            Type:
                        </Typography>
                        {' '}
                        <Typography variant="h6" component="span" sx={{color: infoColor}}>
                            {property.type}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor}}>
                            Address:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor}}>
                            {property.location}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor}}>
                            Price:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor}}>
                            {property.price} $
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="span" sx={{fontWeight: 'bold', color: infoColor}}>
                            Description:
                        </Typography>
                        {' '}
                        <Typography variant="body1" component="span" sx={{color: infoColor}}>
                            {property.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PropertyDetailInfo;
