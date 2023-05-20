import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    useGetDataFinalistsQuery,
    useGetCreateDataFinalistMutation,
    useGetUpdateDataFinalistMutation,
    useGetDeleteDataFinalistMutation,
} from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Delete, Edit, Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const DataFinalists = () => {
    const theme = useTheme();

    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetDataFinalistsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    
    const [createDataFinalist] = useGetCreateDataFinalistMutation();
    const [updateDataFinalist] = useGetUpdateDataFinalistMutation();
    const [deleteDataFinalist] = useGetDeleteDataFinalistMutation();

    console.log("data", data);
    const columns = [
        {
            field: "_id",
            headerName: "Event ID",
            flex: 1,
        },
        {
            field: "attendeeId",
            headerName: "Attendee ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "feedbacks",
            headerName: "# of FeedBacks",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (params.value ?? "").length, //error fixed
        },
        {
            field: "cost",
            headerName: "Ticket Cost",
            flex: 1,
            renderCell: (params) => `Rs.${Number(params.value).toFixed(2)}`,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row)}
                    >
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    const onChangeHandler = (e) => {
        setSearchInput(e.target.value);
    };

    const handleCreate = async () => {
        try {
            const newDataFinalist = {
                attendeeId: "New Attendee",
                cost: "0.00",
            };
            await createDataFinalist(newDataFinalist);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (rowData) => {
        try {
            const { _id, ...rest } = rowData;
            await updateDataFinalist(_id, rest);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (rowData) => {
        try {
            const { _id } = rowData;
            await deleteDataFinalist(_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title="DATA-FINALISTS"
                subtitle="Entire list of Previours of Events"
            />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.dataFinalists) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) =>
                        setSort(...newSortModel)
                    }
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                    onChangeHandler={onChangeHandler}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </Box>
        </Box>
    );
};

export default DataFinalists;
