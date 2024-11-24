import { useRouter } from "next/router";
import { Container, Typography, Button, Box } from "@mui/material";
import Typewriter from "typewriter-effect";

export default function Home() {
  const logos = [
    "/logos/meta.png",
    "/logos/microsoft.png",
    "/logos/reddit.webp",
    "/logos/amazon.png",
    "/logos/netflix.png",
    "/logos/notion.png",
    "/logos/openai.jpeg",
    "/logos/spotify.png",
  ];
  const router = useRouter();

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        <Typewriter
          options={{
            strings: ["SunSpace", "Workspace for All", "Used by teams in"],
            autoStart: true,
            loop: true,
          }}
        />
      </Typography>
      {/* TESTING AREA */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          overflow: "hidden",
          width: "140%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "200%", 
            animation: "scroll 14s linear infinite",
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <Box
              key={index}
              component="img"
              src={logo}
              alt="Company logo"
              sx={{
                width: "10%",
                height: "auto",
                flexShrink: 0,
                margin: "40px"
              }}
              
            />
          ))}
        </Box>
      </Box>
      {/* TESTING AREA */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push("/create-room")}
          sx={{
            padding: "15px 20px",
            border: "2px solid #fff",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0, 0, 255, 0.5)",
            cursor: "pointer",
          }}
        >
          Create a Room
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => router.push("/join-room")}
          sx={{
            color: "black",
            padding: "15px 20px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0, 0, 255, 0.5)",
            cursor: "pointer",
          }}
        >
          Join a Room
        </Button>
      </Box>
    </Container>
  );
}
