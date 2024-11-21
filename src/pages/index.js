import { useRouter } from 'next/router';
import { Container, Typography, Button, Box } from '@mui/material';
import Typewriter from 'typewriter-effect';
export default function Home() {
  const router = useRouter(); 
  return (

    <Container
      maxWidth="sm"
      sx={{
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
      <Typewriter
        options={{
          strings: ['SunSpace', 'Workspace for All','Used by teams in'],
          autoStart: true,
          loop: true,
          }}
      />
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/create-room')}
        >
          Create New Room
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
        >
          Join a Room
        </Button>
      </Box>
    </Container>
  );
}
