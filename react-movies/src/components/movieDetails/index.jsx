import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import EventIcon from "@mui/icons-material/Event";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link"
import img from '../../images/actor-image-placeholder.png';
import img2 from '../../images/film-poster-placeholder.png';


const MovieDetails = ({ movie, recommendations, credits, videos }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const cardStyle = {
        background: "#f5f5f5",
        borderRadius: "10px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    };

    const chipContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "8px",
    };

    const detailsSection = {
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        alignItems: "center",
        marginBottom: "16px",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
        marginTop: "10px",
    };

    return (
        <>
            <div style={cardStyle}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    Overview
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ maxWidth: "800px", margin: "0 auto" }}
                >
                    {movie.overview}
                </Typography>
            </div>

            {credits && credits.cast && credits.cast.length > 0 && (
                <div style={cardStyle}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis"  }}
                    >
                        Credits
                    </Typography>
                    <div style={gridStyle}>
                        {credits.cast.slice(0, 8).map((member) => (
                            <div
                                key={member.id}
                                style={{
                                    background: "#f5f5f5",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    textAlign: "center",
                                    transition: "transform 0.2s",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                            >
                              <Link to={`/actors/${member.id}`} style={{ textDecoration: "none" }}>  
                                <img
                                    src={
                                        member.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                            : img
                                    }
                                    alt={member.name}
                                    style={{
                                        borderRadius: "8px",
                                        width: "100%",
                                        marginBottom: "8px",
                                    }}
                                />
                                <Typography variant="subtitle2" noWrap>
                                    {member.name}
                                </Typography>
                                <Typography variant="caption" noWrap sx={{ color: "#666" }}>
                                    {member.character || member.job}
                                </Typography>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}




            <div style={cardStyle}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    Details
                </Typography>

                {movie.tagline && (
                    <div style={detailsSection}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Tagline:
                        </Typography>
                        <Typography>{movie.tagline}</Typography>
                    </div>
                )}

                {movie.genres.length > 0 && (
                    <div style={detailsSection}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Genres:
                        </Typography>
                        <div style={chipContainerStyle}>
                            {movie.genres.map((g) => (
                                <Chip key={g.name} label={g.name} />
                            ))}
                        </div>
                    </div>
                )}

                {movie.production_countries?.length > 0 && (
                    <div style={detailsSection}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Production Countries:
                        </Typography>
                        <div style={chipContainerStyle}>
                            {movie.production_countries.map((c) => (
                                <Chip key={c.name} label={c.name} />
                            ))}
                        </div>
                    </div>
                )}

                {movie.production_companies?.length > 0 && (
                    <div style={detailsSection}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Production Companies:
                        </Typography>
                        <div style={chipContainerStyle}>
                            {movie.production_companies.map((pc) => (
                                <Chip key={pc.id} label={pc.name} />
                            ))}
                        </div>
                    </div>
                )}

                {movie.spoken_languages?.length > 0 && (
                    <div style={detailsSection}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Languages:
                        </Typography>
                        <div style={chipContainerStyle}>
                            {movie.spoken_languages.map((lang) => (
                                <Chip key={lang.iso_639_1} label={lang.english_name} />
                            ))}
                        </div>
                    </div>
                )}

                <div style={detailsSection}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Stats:
                    </Typography>
                    <div style={chipContainerStyle}>
                        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                        <Chip icon={<MonetizationIcon />} label={`Budget: $${movie.budget?.toLocaleString() || 0}`} />
                        <Chip icon={<MonetizationIcon />} label={`Revenue: $${movie.revenue?.toLocaleString() || 0}`} />
                        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
                        <Chip icon={<LanguageIcon />} label={movie.original_language} />
                        <Chip icon={<EventIcon />} label={`Released: ${movie.release_date}`} />
                        <Chip icon={<InfoIcon />} label={`Status: ${movie.status}`} />
                        {movie.homepage && (
                            <Chip
                                icon={<LinkIcon />}
                                label="Official Site"
                                component="a"
                                href={movie.homepage}
                                target="_blank"
                                clickable
                            />
                        )}
                    </div>
                </div>
            </div>

            {recommendations && recommendations.length > 0 && (
                <div style={cardStyle}>
                    <Typography
                        variant="h4"
                        component="h3"
                        align="center"
                        sx={{ fontWeight: 600 }}
                    >
                        Recommended Movies
                    </Typography>
                    <div style={gridStyle}>
                        {recommendations.slice(0, 8).map((recMovie) => (
                            <Link
                                key={recMovie.id}
                                to={`/movies/${recMovie.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    style={{
                                        background: "#f5f5f5",
                                        borderRadius: "10px",
                                        padding: "8px",
                                        textAlign: "center",
                                        transition: "transform 0.2s",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <img
                                        src={
                                            recMovie.poster_path
                                                ? `https://image.tmdb.org/t/p/w200${recMovie.poster_path}`
                                                : img2
                                        }
                                        alt={recMovie.title}
                                        style={{
                                            borderRadius: "8px",
                                            width: "100%",
                                            marginBottom: "8px",
                                        }}
                                    />
                                    <Typography variant="subtitle1" noWrap>
                                        {recMovie.title}
                                    </Typography>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {videos && videos.results && videos.results.length > 0 && (
                <div style={cardStyle}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                    >
                        Videos
                    </Typography>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px",
                        marginTop: "10px"
                    }}>
                        {videos.results.slice(0, 4).map((video) => (
                            video.site === "YouTube" && (
                                <div key={video.id} style={{
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                }}>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <Typography variant="subtitle1" align="center" sx={{ p: 1 }}>
                                        {video.name}
                                    </Typography>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            <Fab
                color="primary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <MovieReviews movie={movie} />
            </Drawer>
        </>
    );
};

export default MovieDetails;
