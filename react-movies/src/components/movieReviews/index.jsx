import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const reviews = data.results;

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#cc0000" }}>
            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Author</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="center">
              Excerpt
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
              More
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow
              key={r.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#ffe6e6", 
                },
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {r.author}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{excerpt(r.content)}</TableCell>
              <TableCell align="right">
                <Link
                  to={`/reviews/${r.id}`}
                  state={{ review: r, movie: movie }}
                  style={{ color: "#cc0000", fontWeight: 600, textDecoration: "none" }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
