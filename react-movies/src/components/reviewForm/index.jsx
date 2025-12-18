
import { useForm, Controller } from "react-hook-form";
import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router";
import { Box, Typography, TextField, MenuItem, Button, Snackbar, Alert } from "@mui/material";



const ratings = [
    {
        value: 5,
        label: "Excellent",
    },
    {
        value: 4,
        label: "Good",
    },
    {
        value: 3,
        label: "Average",
    },
    {
        value: 2,
        label: "Poor",
    },
    {
        value: 0,
        label: "Terrible",
    },
];

const styles = {
    root: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
    },
    form: {
        width: "100%",
        "& > * ": {
            marginTop: 2,
        },
    },
    textField: {
        width: "40ch",
    },
    submit: {
        marginRight: 2,
    },
    snack: {
        width: "50%",
        "& > * ": {
            width: "100%",
        },
    },
};

const ReviewForm = ({ movie }) => {
    const context = useContext(MoviesContext);
    const [rating, setRating] = useState(3);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const defaultValues = {
        author: "",
        review: "",
        agree: false,
        rating: "3",
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm(defaultValues);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const onSubmit = (review) => {
        review.movieId = movie.id;
        review.rating = rating;
        console.log(review);
        context.addReview(movie, review);
        setOpen(true);
    };


    const handleSnackClose = (event) => {
        setOpen(false);
        navigate("/movies/favorites");
    };



    return (<Box
        sx={{
            maxWidth: 700,
            mx: "auto",
            mt: 4,
            mb: 4,
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#fafafa",
            display: "flex",
            flexDirection: "column",
            gap: 3,
        }}
    >
        <Typography variant="h4" component="h2" textAlign="center" fontWeight={700}>
            Write a Review
        </Typography>

        <Snackbar
            open={open}
            onClose={handleSnackClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={4000}
        >
            <Alert onClose={handleSnackClose} severity="success" variant="filled">
                Thank you for submitting a review!
            </Alert>
        </Snackbar>

        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Controller
                name="author"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Author's Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.author}
                        helperText={errors.author?.message}
                    />
                )}
            />

            <Controller
                name="review"
                control={control}
                rules={{
                    required: "Review cannot be empty",
                    minLength: { value: 10, message: "Review is too short" },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Review Text"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={6}
                        error={!!errors.review}
                        helperText={errors.review?.message}
                    />
                )}
            />

            <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        label="Rating"
                        value={rating}
                        onChange={handleRatingChange}
                        fullWidth
                    >
                        {ratings.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                    onClick={() => reset({ author: "", review: "", rating: 3 })}
                >
                    Reset
                </Button>
            </Box>
        </form>
    </Box>
    );
};

export default ReviewForm;
