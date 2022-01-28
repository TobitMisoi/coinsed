import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import data from "./dummyData";
import { useWeb3 } from "@3rdweb/hooks";

function Account() {
  const { user } = useAuth0();

  const {
    connectWallet,
    address,
    balance,
    getNetworkMetadata,
    chainId,
  } = useWeb3();

  const theme = useTheme();

  const networkMeta = getNetworkMetadata(chainId);

  return (
    <>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Grid container sx={{ p: 1 }} alignItems='center'>
          <Grid item>
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8),
              }}
              variant='rounded'
              alt={user.name}
              src={user.picture}
            />
          </Grid>
          <Grid item>
            <Typography variant='h3' component='h3' gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant='subtitle2'>
              Today is a good day to start trading crypto assets!
            </Typography>
          </Grid>
        </Grid>
        <Card elevation={5} sx={{ m: 2 }}>
          <Grid spacing={0} container>
            <Grid item xs={12} md={12}>
              <Box p={4}>
                <Typography sx={{ pb: 3 }} variant='h4'>
                  Account Balance
                </Typography>
                {address ? (
                  <>
                    {" "}
                    <Box>
                      <Typography variant='h3' gutterBottom>
                        {balance.formatted}
                      </Typography>
                      <Typography variant='body1'>
                        <strong>Address:</strong> <br />
                        {address}
                      </Typography>
                      <Typography
                        variant='h4'
                        fontWeight='normal'
                        color='text.secondary'
                      >
                        <strong>Network:</strong> {data.map((i) => i.network)}{" "}
                        <br />
                        {data.map((i, index) => (
                          <Typography key={index} component='code'>
                            {networkMeta.chainName} {networkMeta.symbol}
                            {""}
                          </Typography>
                        ))}
                      </Typography>
                    </Box>
                    <br />
                    <Grid container spacing={3}>
                      <Grid sm item>
                        <Button
                          disabled={networkMeta.isTestnet}
                          fullWidth
                          variant='outlined'
                        >
                          Send
                        </Button>
                      </Grid>
                      <Grid sm item>
                        <Button
                          fullWidth
                          variant='contained'
                          disabled={networkMeta.isTestnet}
                        >
                          Receive
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Box>
                    <Typography variant='caption'>
                      Connect your wallet to be able to access your balance
                    </Typography>
                    <br />

                    <Button
                      variant='outlined'
                      sx={{ mt: 2 }}
                      onClick={() => connectWallet("injected")}
                    >
                      Connect Wallet
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}

export default Account;
