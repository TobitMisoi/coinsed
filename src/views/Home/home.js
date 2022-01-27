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

function Home() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 12,
  });

  const [payload, setPayload] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [pricePerformanceStats, setPricePerformanceStats] = React.useState([]);

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
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const tr = [];

  Object.values(pricePerformanceStats).map((i) => tr.push(i));

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
            // width: "100%",
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
                {/* <Card sx={{ ml: 2 }}>
                  <CardContent sx={{ margin: "0 auto" }}>
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
                </Card> */}
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
                rowsPerPageOptions={[4]}
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
      </Box>
    </>
  );
}

export default Home;
