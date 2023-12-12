import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useSlideInFromLeft from "../hooks/useSlideInFromLeft.js";
import Typography from "@mui/material/Typography";

// Define initial state outside of the component for clarity and reusability
const initialContactInfo = {
    name: '',
    telephone: '',
    email: '',
    message: '',
};

export const ContactForm = () => {
    // State for managing the contact info
    const [contactInfo, setContactInfo] = useState(initialContactInfo);
    const slideRef = useSlideInFromLeft();

    // Handle change in text fields and update state accordingly
    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactInfo(prevState => ({...prevState, [name]: value}));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit action
        // Here, you would usually send the data to a server or another handler
        console.log(contactInfo);
        // Optionally reset the form to initial state after submission
        setContactInfo(initialContactInfo);
    };

    // Render the contact form
    return (
        <div ref={slideRef}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: "70vh" }}>
                <Typography sx={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "40px",
                    marginBottom: "30px",
                    fontWeight: "200px"
                }}>
                    Contact us
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 2,
                        borderRadius: "0.5em",
                        p: 4,
                        width: "80%"
                    }}
                >
                    {/* Name input field */}
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="off" // Disables browser autocomplete
                        autoFocus
                        value={contactInfo.name}
                        onChange={handleChange}
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#437256",
                                },
                            },
                        }}
                    />
                    {/* Telephone input field */}
                    <TextField
                        required
                        fullWidth
                        id="telephone"
                        label="Telephone"
                        name="telephone"
                        autoComplete="off"
                        value={contactInfo.telephone}
                        onChange={handleChange}
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#437256",
                                },
                            },
                        }}
                    />
                    {/* Email input field */}
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="off"
                        value={contactInfo.email}
                        onChange={handleChange}
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#437256",
                                },
                            },
                        }}
                    />
                    {/* Message textarea field */}
                    <TextField
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        multiline // Makes the TextField a textarea for longer messages
                        rows={4} // Sets the number of rows the textarea initially displays
                        autoComplete="off"
                        value={contactInfo.message}
                        onChange={handleChange}
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#437256",
                                },
                            },
                        }}
                    />
                    {/* Submit button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, background: "#437256", color: "#fffff",
                            '&:hover': {
                                backgroundColor: '#2f4f3e',
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </div>
    );
};
