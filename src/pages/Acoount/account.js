import { useAuth0 } from "@auth0/auth0-react";
import { TrendingUp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import data from "./dummyData";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: "#000100";
          color: "#f8f8f8";
          width: 100;
          height: 100;
    `
);

function Account() {
  const { user } = useAuth0();

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Grid container sx={{ p: 1 }} alignItems='center'>
        <Grid item>
          <Avatar
            sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
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
                Account Balances
              </Typography>
              <Box>
                <Typography variant='h3' gutterBottom>
                  {data.map((i) => i.balance)}
                </Typography>
                <Typography variant='body1'>
                  <strong>Address:</strong> <br />
                  {data.map((i) => i.address)}
                </Typography>
                <Typography
                  variant='h4'
                  fontWeight='normal'
                  color='text.secondary'
                >
                  <strong>Network:</strong> {data.map((i) => i.network)} <br />
                  {data.map((i, index) => (
                    <Typography key={index} component='code'>
                      {i.chainName} {i.symbol}
                      {""} {i.isTestnet}
                    </Typography>
                  ))}
                </Typography>
                <Box display='flex' sx={{ py: 4 }} alignItems='center'>
                  <AvatarSuccess sx={{ mr: 2 }} variant='rounded'>
                    <TrendingUp fontSize='large' color='green' />
                  </AvatarSuccess>
                  <Box>
                    <Typography variant='h5'>+ $1.89647</Typography>
                    <Typography variant='subtitle2' noWrap>
                      today
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid sm item>
                  <Button fullWidth variant='outlined'>
                    Send
                  </Button>
                </Grid>
                <Grid sm item>
                  <Button fullWidth variant='contained'>
                    Receive
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Account;
