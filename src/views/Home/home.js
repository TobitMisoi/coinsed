import React from "react";
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
import CustomNoRowsOverlay from "./components/CustomNoRowsOverlay";

import getData from "../../api/getData";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

function Home() {
  const [payload, setPayload] = React.useState([]);
  const [topPicks, setTopPicks] = React.useState([]);
  const [pricePerformanceStats, setPricePerformanceStats] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  let labels = new Set();
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // BTC dominance
        const btcDominance = await getData(
          `/v1/cryptocurrency/listings/latest`
        );

        // my top picks
        const topPicks = await getData(
          `/v1/cryptocurrency/quotes/latest?id=1,1027,825,1839,3408,2010,52,5426,4172,74`
        );

        // Listings
        const pricePerformanceStats = await getData(
          `/v1/cryptocurrency/listings/latest`
        );
        setLoading(false);

        setPricePerformanceStats(pricePerformanceStats.data["data"]);
        setTopPicks(topPicks.data["data"]);
        setPayload(
          btcDominance.data["data"].map(
            (i) => i.quote["USD"].market_cap_dominance
          )
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // chart configs
  const chart = React.useRef(null);
  const dataRows = [];
  Object.values(pricePerformanceStats).map((i) => dataRows.push(i));
  const options = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      categories: [...labels],
      visible: false,
    },
    yAxis: {
      title: {
        text: "dominance",
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[10])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    tooltip: {
      headerFormat: null,
    },
    series: [
      {
        type: "area",
        name: "Market Cap dominance",
        data: payload,
      },
    ],
  };

  let skeleton;

  if (loading) {
    skeleton = <Skeleton variant='rectangular' height={118} />;
  }

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
                          aria-labelledby='topPicks-sub-header'
                          id='topPicks-sub-header'
                          sx={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Top Picks
                        </ListSubheader>
                      }
                    >
                      {Object.values(topPicks).length > 0 ? (
                        Object.values(topPicks)
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
                                USD <strong>{i.quote["USD"].price}</strong>
                              </Typography>
                            </ListItem>
                          ))
                      ) : (
                        <> {skeleton}</>
                      )}
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        {Object.values(topPicks).length > 0 &&
                          Object.values(topPicks)
                            .slice(3, 5)
                            .map((i) => (
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
                                  USD <strong>{i.quote["USD"].price}</strong>
                                </Typography>
                              </ListItem>
                            ))}
                      </Collapse>
                    </List>
                  </CardContent>
                  <CardActions>
                    {Object.values(topPicks).length > 0 ? (
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
          <Grid item lg={10} width={"100%"}>
            <Box sx={{ height: 500, width: "100%" }}>
              <Typography variant='h3' p={1} sx={{ textAlign: "center" }}>
                Exchange Info
              </Typography>

              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={dataRows}
                disableSelectionOnClick
                loading={loading}
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

        <Grid container spacing={4}>
          <Grid item lg>
            <Box>
              <Typography variant='h3' p={1} sx={{ textAlign: "center" }}>
                Market Cap dominance
              </Typography>
              <HighchartsReact
                ref={chart}
                options={options}
                highcharts={Highcharts}
              />
              {skeleton}
              {skeleton}
              <br />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
