import {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {PropertyImage} from "../styles/styledComponents/PropertyImage.jsx";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "../styles/propertydetail.css";
import {OneImageCarousel} from "../components/OneImageCarousel.jsx";
import Typography from "@mui/material/Typography";
import PropertyDetailInfo from "../components/PropertyDetailInfo.jsx";

const PropertyDetail = () => {
    // Get the 'propertyId' from the URL parameters.
    const {propertyId} = useParams();

    // Define state variables for the property details and the active image index.
    const [property, setProperty] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Create a reference for the container element and a state variable for screen width.
    const containerRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    // Scroll to the top of the page when the component mounts.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update the 'screenWidth' state when the window is resized.
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch property details based on 'propertyId' from a JSON file.
    useEffect(() => {
        const fetchProperty = async () => {
            const propertiesData = await import('../properties/properties.json');
            const selectedProperty = propertiesData.properties.find(p => p.id === propertyId);
            setProperty(selectedProperty);
        };

        fetchProperty();
    }, [propertyId]);

    // If property details are not yet available, display a loading message.
    if (!property) {
        return <div>Loading...</div>;
    }

    // Scroll to a specific image by setting the active image index and using 'scrollTo'.
    const scrollToImage = (index) => {
        setActiveImageIndex(index);
        const imageElement = document.getElementById(`image${index + 1}`);
        if (imageElement && containerRef.current) {
            containerRef.current.scrollTo({
                left: imageElement.offsetLeft,
                behavior: 'smooth',
            });
        }
    };

    // Handle click events to navigate to the previous and next images.
    const handleLeftClick = () => {
        if (activeImageIndex > 0) {
            scrollToImage(activeImageIndex - 1);
        }
    };

    const handleRightClick = () => {
        if (activeImageIndex < property.imgs.length - 1) {
            scrollToImage(activeImageIndex + 1);
        }
    };

    return (
        <div style={{marginTop: "30px"}}>
            <div style={{
                fontFamily: "OpenSans-SemiBold",
                fontStyle: "normal",
                fontWeight: "600",
                padding: "15px",
                margin: "30px"
            }}>
                <Typography
                    onClick={goBack}
                    sx={{
                        color: "#667085",
                        background: "transparent",
                        display: "inline-flex",
                        '&:hover': {
                            cursor: "pointer",
                        }
                    }}> <ArrowBackIcon/>Back</Typography>
            </div>

            <PropertyDetailInfo property={property}/>

            {/* Conditionally render a carousel or image slider based on screen width. */}
            {screenWidth <= 550 ? (
                <OneImageCarousel
                    images={property.imgs}
                />
            ) : (
                <div className={"images-content"}>
                    <div className={`images`} ref={containerRef}>
                        {/* Map and display property images with lazy loading. */}
                        {property.imgs.map((image, index) => (
                            <PropertyImage
                                loading="lazy"
                                alt={"cottage-image"}
                                id={`image${index + 1}`}
                                key={`image${index + 1}`}
                                src={image}
                                onLoad={(e) => e.target.classList.add("loaded")}
                            />
                        ))}
                    </div>
                    {/* Navigation arrows and bottom image sliders. */}
                    <div className={"slide left"} onClick={handleLeftClick}>
                        <ChevronLeftIcon style={{color: 'black'}}/>
                    </div>
                    <div className={"slide right"} onClick={handleRightClick}>
                        <ChevronRightIcon style={{color: 'black'}}/>
                    </div>
                    <div className={"btm-sliders"}>
                        {/* Map and display bottom image sliders. */}
                        {property.imgs.map((_, index) => (
                            <span
                                key={`scroll${index + 1}`}
                                onClick={() => scrollToImage(index)}
                                style={{backgroundColor: activeImageIndex === index ? 'white' : ''}}
                            />
                        ))}
                    </div>
                </div>
            )}
            {/* Display property details, including type, rooms, description, and location image. */}
            <div className={'property-detail-div'}>
                <div className={'location-div'}>
                    <img style={{
                        maxWidth: "500px",
                    }} src={property.locationImg} alt={"location-img"}/>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
