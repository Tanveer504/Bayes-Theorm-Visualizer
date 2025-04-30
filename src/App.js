import React, { useState } from 'react';
import {
  Slider,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Divider,
  CssBaseline,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function App() {
  const [prior, setPrior] = useState(0.5);
  const [likelihoodH, setLikelihoodH] = useState(0.8);
  const [likelihoodNotH, setLikelihoodNotH] = useState(0.2);

  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#000000',
      },
    },
    typography: {
      allVariants: {
        color: '#000000',
      },
    },
  });

  const computePosterior = () => {
    const numerator = likelihoodH * prior;
    const denominator = numerator + likelihoodNotH * (1 - prior);
    return denominator === 0 ? 0 : numerator / denominator;
  };

  const posterior = computePosterior();
  const notH = 1 - prior;
  const numerator = likelihoodH * prior;
  const denominator = numerator + likelihoodNotH * notH;

  const pieChartData = {
    labels: ['Prior (P(H))', 'Posterior (P(H|E))'],
    datasets: [
      {
        data: [prior * 100, posterior * 100],
        backgroundColor: ['#42a5f5', '#ef5350'],
        hoverBackgroundColor: ['#2196f3', '#e53935'],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#000', py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center">
            {/* Visualizer Card */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  backgroundColor: '#fff',
                  padding: '20px',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Bayes' Theorem Visualizer
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {/* Sliders */}
                  <Box mb={2}>
                    <Typography gutterBottom>P(H) - Prior: {prior.toFixed(2)}</Typography>
                    <Slider
                      value={prior}
                      onChange={(e, val) => setPrior(val)}
                      step={0.01}
                      min={0}
                      max={1}
                      valueLabelDisplay="auto"
                      sx={{ color: '#1976d2' }}
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography gutterBottom>P(E|H) - Likelihood: {likelihoodH.toFixed(2)}</Typography>
                    <Slider
                      value={likelihoodH}
                      onChange={(e, val) => setLikelihoodH(val)}
                      step={0.01}
                      min={0}
                      max={1}
                      valueLabelDisplay="auto"
                      sx={{ color: '#43a047' }}
                    />
                  </Box>

                  <Box mb={3}>
                    <Typography gutterBottom>P(E|~H): {likelihoodNotH.toFixed(2)}</Typography>
                    <Slider
                      value={likelihoodNotH}
                      onChange={(e, val) => setLikelihoodNotH(val)}
                      step={0.01}
                      min={0}
                      max={1}
                      valueLabelDisplay="auto"
                      sx={{ color: '#f44336' }}
                    />
                  </Box>

                  {/* Posterior Bar */}
                  <Typography variant="h6" align="center">
                    Posterior: P(H|E) = {posterior.toFixed(3)}
                  </Typography>
                  <Box
                    sx={{
                      height: '16px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '10px',
                      my: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${posterior * 100}%`,
                        backgroundColor: '#ef5350',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </Box>

                  {/* Chart */}
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Box sx={{ width: '70%', maxWidth: 400 }}>
                      <Doughnut data={pieChartData} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Calculation Section */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  backgroundColor: '#ffffff',
                  p: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📘 Bayes’ Theorem Formula
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>
                      P(H|E) = [P(E|H) × P(H)] / [P(E|H) × P(H) + P(E|~H) × P(~H)]
                    </strong>
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">P(H):</Typography>
                      <Typography variant="body2">{prior.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">P(~H):</Typography>
                      <Typography variant="body2">{notH.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">P(E|H):</Typography>
                      <Typography variant="body2">{likelihoodH.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">P(E|~H):</Typography>
                      <Typography variant="body2">{likelihoodNotH.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Numerator:</Typography>
                      <Typography variant="body2">
                        {likelihoodH.toFixed(2)} × {prior.toFixed(2)} = {numerator.toFixed(4)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Denominator:</Typography>
                      <Typography variant="body2">
                        {numerator.toFixed(4)} + {likelihoodNotH.toFixed(2)} × {notH.toFixed(2)} = {denominator.toFixed(4)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight="bold">Posterior P(H|E):</Typography>
                      <Typography variant="body2" fontWeight="bold">{posterior.toFixed(4)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
