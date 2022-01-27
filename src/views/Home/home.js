import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomNoRowsOverlay from "./components/CustomNoRowsOverlay";

import { useDemoData } from "@mui/x-data-grid-generator";
import axios from "axios";

function Home() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 8,
  });

  const [payload, setPayload] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let resp;
      try {
        resp = await axios.get(
          `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/historical?date=${new Date()}`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
            },
          }
        );

        // setPayload(resp.data);
      } catch (error) {
        console.log(error);
      }

      if (resp.data) {
        setPayload(resp.data["data"]);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Box sx={{ border: "1px solid" }}>
        <Grid
          container
          spacing={2}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // width: "100%",
            alignItems: "center",
            border: "1px solid",
          }}
        >
          <Grid item lg={9}>
            <Typography variant='h3'>
              Today's Cryptocurrency Prices by Market cap
            </Typography>
            <Typography variant='body1'>
              The global crypto market cap is $1.71T, a 1.13% increase over the
              last 7 days
            </Typography>
          </Grid>
          <Grid item lg={6} sx={{ width: "100%" }}>
            <Card elevation={3} sx={{ width: "100%" }}>
              <CardHeader title='Trending' />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary='BTC' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <br />
          <Grid item lg={6} width={"100%"}>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                // {...data}
                rows={payload}
                columns={[
                  { field: "id", field: "name", headerName: "Name" },
                  {
                    field: "num_market_pairs",
                    headerName: "Market pairs",
                    width: 117,
                  },
                  {
                    field: "circulating_supply",
                    headerName: "Circulating Supply",
                    width: 130,
                  },
                  {
                    field: "total_supply",
                    headerName: "Total Supply",
                    width: 123,
                  },
                  {
                    field: "max_supply",
                    headerName: "Max Supply",
                    width: 123,
                  },
                  {
                    field: "last_updated",
                    width: 124,
                    headerName: "Updated",
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
