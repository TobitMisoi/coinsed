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
  IconButton,
  ListSubheader,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomNoRowsOverlay from "./components/CustomNoRowsOverlay";

import { useDemoData } from "@mui/x-data-grid-generator";
import getData from "../../api/getData";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HighchartsReact from "highcharts-react-official";
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
  const [gMetricsData, setGMetricsData] = React.useState([]);

  let gMetrics = [];
  let labels = new Set();
  React.useEffect(() => {
    const fetchData = async () => {
      let resp;
      try {
        resp = await getData(`/currencies`);
        const trendingData = await getData(
          `/v1/cryptocurrency/trending/latest?limit=20`
        );

        const pricePerformanceStatsId = trendingData.data["data"].data.map(
          (i) => i.id
        );

        const pricePerformanceStats = await getData(
          `/v1/exchange/info?id=${pricePerformanceStatsId}`
        );

        var tsYesterday = new Date(Date.now() - 86400 * 1000).toISOString();

        const globalMetricsData = await getData(
          `/v1/global-metrics/quotes/historical?time_start=${tsYesterday}&interval=30m`
        );

        globalMetricsData.data["data"].quotes.map((i) => {
          gMetrics.push(i.btc_dominance);
          return { gMetrics };
        });

        setGMetricsData(gMetrics);

        setPricePerformanceStats(pricePerformanceStats.data["data"]);

        setTrending(trendingData.data["data"].data);
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
      enabled: false,
    },
    series: [
      {
        type: "area",
        name: "USD to EUR",
        data: gMetricsData,
      },
    ],
  };

  Object.values(pricePerformanceStats).map((i) => tr.push(i));

  const chart = React.useRef(null);

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
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid
              sx={{ position: "relative" }}
              display='flex'
              alignItems='center'
              item
              xs={12}
              md={6}
            >
              {/* <Hidden mdDown> */}
              <Divider orientation='vertical' />
              {/* </Hidden> */}
              <Box m={2} pt={4} sx={{ width: "100%" }}>
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
                        maxWidth: 360,
                      }}
                      subheader={
                        <ListSubheader
                          component='div'
                          aria-labelledby='trending-sub-header'
                          id='trending-sub-header'
                        >
                          Trending
                        </ListSubheader>
                      }
                    >
                      {trending.length &&
                        trending.slice(0, 3).map((i) => (
                          <ListItem key={i.id}>
                            <Typography>{i.name}</Typography>
                            <Typography variant='code'>{i.cmc_rank}</Typography>
                          </ListItem>
                        ))}
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        {trending.length &&
                          trending.slice(3, 5).map((i) => (
                            <ListItem key={i.id}>
                              <Typography>{i.name}</Typography>
                            </ListItem>
                          ))}
                      </Collapse>
                      <IconButton onClick={handleOpen}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid item lg={6} width={"100%"}>
            <Box sx={{ height: 620, width: "100%" }}>
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
                  },
                  {
                    field: "maker_fee",
                    headerName: "Maker Fee",
                    width: 137,
                  },
                  {
                    field: "spot_volume_usd",
                    headerName: "Volume",
                    width: 162,
                  },
                  // {
                  //   field: "slug",
                  //   headerName: "Title",
                  //   width: 123,
                  //   renderCell: () => <div>Chart</div>,
                  // },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item lg>
            <Box>
              <HighchartsReact
                ref={chart}
                options={options}
                highcharts={Highcharts}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
