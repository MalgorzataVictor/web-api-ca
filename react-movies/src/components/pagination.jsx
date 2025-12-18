import React from "react";
import MuiPagination from "@mui/material/Pagination";

const Pagination = ({ page, onChange }) => {
    return (
        <MuiPagination
            count={10}
            page={page}
            onChange={onChange}
            size="large"
            sx={{
                "& .MuiPaginationItem-root": {
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                },
                "& .Mui-selected": {
                    backgroundColor: "#cc0000ea",
                    color: "white",
                    fontWeight: "bold",
                },
                "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "rgba(204,0,0,0.3)",
                },
            }}

        />
    );
};

export default Pagination;
