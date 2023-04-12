import { Typography, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function LotteryPage() {
  const columns = [
    { field: "lottery", headerName: "Lottery", width: 150 },
    { field: "issue", headerName: "Issue", width: 130 },
    { field: "draw_time", headerName: "Draw Time", width: 130 },
    {
      field: "result",
      headerName: "Result",
      type: "number",
      width: 200,
    },
    {
      field: "past_result",
      headerName: "Past Result",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
        field: "chart",
        headerName: "Chart",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
      },
      {
        field: "favourite",
        headerName: "Favourite",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 100,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
  ];

  const rows = [
    { id: 1,lottery:'9393947', issue: "Snow", firstName: "Jon", age: 35 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 2,lottery:'9393947', issue: "Lannister", firstName: "Cersei", age: 42 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 3,lottery:'9393947', issue: "Lannister", firstName: "Jaime", age: 45 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 4,lottery:'9393947', issue: "Stark", firstName: "Arya", age: 16 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 5,lottery:'9393947', issue: "Targaryen", firstName: "Daenerys", age: null ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 6,lottery:'9393947', issue: "Melisandre", firstName: null, age: 150 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 7,lottery:'9393947', issue: "Clifford", firstName: "Ferrara", age: 44 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 8,lottery:'9393947', issue: "Frances", firstName: "Rossini", age: 36 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
    { id: 9,lottery:'9393947', issue: "Roxie", firstName: "Harvey", age: 65 ,draw_time:'12:00',result:83,past_result:10,chart:11,favourite:'X'},
  ];
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Lottery
      </Typography>
      <Grid container>
        <Grid style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableColumnMenu
          />
        </Grid>
      </Grid>
    </>
  );
}
