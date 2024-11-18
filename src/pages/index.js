import { useRouter } from 'next/router';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5', // Light background color
      }}
    >
      {/* Title */}
      <Typography variant="h2" component="h1" gutterBottom>
        SunSpace
      </Typography>

      {/* Buttons */}
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
