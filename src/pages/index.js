import { useRouter } from "next/router";
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typewriter from "typewriter-effect";
import * as React from 'react';
import { SignUp } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';
import { useUser } from "@clerk/nextjs";
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
  const { user, isSignedIn } = useUser();
  const pages = ["Pricing", "Contact", "About", "Sign In", "Sign Up"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { openSignUp } = useClerk();
  const handleCreateRoom = () => {
    
      if (!isSignedIn) {
        openSignUp();
      } 
      else {
        router.push("/create-room");
      }
    
  };  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ margin: 0, padding: 0, height: "100%" }}>
      <AppBar position="fixed" sx = {{bgcolor: "black"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box>
              <Avatar
                alt="SunSpace"
                src="/logos/sunspace_logo.png"
                sx={{ width: 30, height: 30, mr: 1 }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SunSpace
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'right' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ paddingTop: "80px", bgcolor: "background.paper", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <Typewriter
            options={{
              strings: ["SunSpace", "Workspace for All", "Used by teams in"],
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>
        <Box sx={{ display: "flex", gap: 4, overflow: "hidden", width: "140%", position: "relative", border: "2px solid #ccc" }}>
          <Box sx={{ display: "flex", width: "200%", animation: "scroll 14s linear infinite" }}>
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
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCreateRoom}
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
    </Box>
  );
}
