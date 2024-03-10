import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:'linear-gradient(180deg, #faa957, #FFF)'   ,
        backgroundSize: '100% 35%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: { xs: 14, sm: 20 },
     
        }}
      >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection:  'column',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Find whatever articles you're
            <Typography
              component="span"
              variant="h1"
              sx={{
                color:'#faa957',
                display: 'inline',
              }}
            >
              interested in
            </Typography>
          </Typography>
      </Container>
    </Box>
  );
}