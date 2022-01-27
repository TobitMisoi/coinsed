import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Divider,
  Typography,
  Collapse,
  Button,
  ListSubheader,
  CardActions,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomNoRowsOverlay from "./components/CustomNoRowsOverlay";

import { useDemoData } from "@mui/x-data-grid-generator";
import getData from "../../api/getData";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Highcharts from "highcharts";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

function Home() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 12,
  });

  // eslint-disable-next-line no-unused-vars
  const [payload, setPayload] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [pricePerformanceStats, setPricePerformanceStats] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let resp;
      try {
        resp = await getData(`/currencies`);
        const trendingData = await getData(
          `/v1/cryptocurrency/quotes/latest?id=1,1027,825,1839,3408,2010,52,5426,4172,74`
        );

        const pricePerformanceStats = await getData(
          `/v1/cryptocurrency/listings/latest`
        );

        setPricePerformanceStats(pricePerformanceStats.data["data"]);

        setTrending(trendingData.data["data"]);
      } catch (error) {
        console.log(error);
      }

      if (resp.data) {
        setPayload(resp.data);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const tr = [];

  Object.values(pricePerformanceStats).map((i) => tr.push(i));

  // const chart = React.useRef(null);

  return (
    <>
      <Box sx={{ mt: "78px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <br />
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={6}>
              <Box
                pt={4}
                sx={{
                  margin: "0 auto",
                }}
                alignItems='center'
                maxWidth={310}
                p={1}
              >
                <Typography variant='code'>0% commision</Typography>
                <Typography variant='h2' maxWidth={310} p={1}>
                  Join the best Crypto currency exchange
                </Typography>
                <Typography mb={5}>
                  Start trading with over 740 different cryptocurrency and fiat
                  currency pairs, including Bitcoin, Ethereum and BNB pairs
                </Typography>
                <Button sx={{ background: "#94FBAB", color: "#000100" }}>
                  Start Trading
                </Button>
              </Box>
            </Grid> */}
            <Grid
              sx={{ position: "relative" }}
              display='flex'
              alignItems='center'
              item
              lg={12}
              // md={6}
            >
              {/* <Hidden mdDown> */}
              <Divider orientation='vertical' />
              {/* </Hidden> */}
              <Box m={2} pt={4} sx={{ width: "100%", textAlign: "center" }}>
                <Typography variant='code'>0% commision</Typography>
                <Typography variant='h2' p={1}>
                  Join the best Crypto currency exchange
                </Typography>
                <Typography mb={5}>
                  Start trading with over 740 different cryptocurrency and fiat
                  currency pairs, including Bitcoin, Ethereum and BNB pairs
                </Typography>
                <Card
                  elevation={2}
                  sx={{
                    width: "100%",
                    margin: "0 auto",
                  }}
                >
                  <CardContent>
                    <List
                      sx={{
                        width: "100%",
                      }}
                      subheader={
                        <ListSubheader
                          component='div'
                          aria-labelledby='trending-sub-header'
                          id='trending-sub-header'
                          sx={{ fontWeight: "bold" }}
                        >
                          Top picks
                        </ListSubheader>
                      }
                    >
                      {Object.values(trending).length > 0 ? (
                        Object.values(trending)
                          .slice(0, 3)
                          .map((i) => (
                            <ListItem
                              key={i.id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography component='div'>{i.name} </Typography>
                              <Typography variant='code'>
                                USD {i.quote["USD"].price}
                              </Typography>
                            </ListItem>
                          ))
                      ) : (
                        <Skeleton variant='rectangular' height={118} />
                      )}
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        {trending.length > 0 &&
                          trending.slice(3, 5).map((i) => (
                            <ListItem
                              key={i.id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Typography>{i.name}</Typography>
                              <Typography variant='code'>
                                {/* {USDPrice.shift((i) => i).toFixed(4)} */}
                              </Typography>
                            </ListItem>
                          ))}
                      </Collapse>
                    </List>
                  </CardContent>
                  <CardActions>
                    {trending.length > 0 ? (
                      <Button onClick={handleOpen} size='small' color='primary'>
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                    ) : (
                      <Button
                        disabled
                        onClick={handleOpen}
                        size='small'
                        color='primary'
                      >
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid item lg={12} width={"100%"}>
            <Box sx={{ height: 526, width: "100%" }}>
              <Typography variant='h3' p={1} sx={{ textAlign: "center" }}>
                Exchange Info
              </Typography>

              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={tr}
                disableSelectionOnClick
                loading={data.rows.length === 0}
                pageSize={9}
                rowsPerPageOptions={[9]}
                columns={[
                  {
                    field: "name",
                    headerName: "Name",
                    width: 123,
                    flex: 1,
                  },
                  {
                    field: "total_supply",
                    headerName: "Total Supply",
                    width: 137,
                    flex: 1,
                  },
                  {
                    field: "circulating_supply",
                    headerName: "Circulating Supply",
                    width: 112,
                    flex: 1,
                  },
                  {
                    field: "price",
                    headerName: "Price(USD)",
                    width: 123,
                    flex: 1,
                    valueGetter: (params) => {
                      const price = params.row.quote["USD"].price;
                      return Number(price).toFixed(5);
                    },
                  },
                  {
                    field: "market_cap",
                    headerName: "Market Cap",
                    valueGetter: (params) => {
                      const marketCap = params.row.quote["USD"].market_cap;
                      return Number(marketCap).toFixed(5);
                    },
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />

        {/* <Grid container spacing={4}>
          <Grid item lg>
            <Box>
              <Typography variant='h3' p={1} sx={{ textAlign: "center" }}>
                BTC Dominance
              </Typography>
              <HighchartsReact
                ref={chart}
                options={options}
                highcharts={Highcharts}
              />
            </Box>
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
}

export default Home;
