import { useRouter } from "next/router";
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typewriter from "typewriter-effect";
import * as React from 'react';
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
  const pages = ["Pricing", "Contact", "About"];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { openSignUp, openSignIn } = useClerk();
  
  const handleCreateRoom = () => {
    
      if (!isSignedIn) {
        openSignUp();
      } 
      else {
        router.push("/create-room");
      }
    
  };  
  const handleJoinRoom = () => {
    
    if (!isSignedIn) {
      openSignUp();
    } 
    else {
      router.push("/join-room");
    }
  
  };  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  <MenuItem key={page} onClick={() => {
                    if (page === "Sign In") openSignIn();
                    else if (page === "Sign Up") openSignUp();
                    else handleCloseNavMenu();
                  }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page === "Sign In") openSignIn();
                    else if (page === "Sign Up") openSignUp();
                    else handleCloseNavMenu();
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {isSignedIn ? (
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            ) : (
              <>
              <Button color="inherit" onClick={() => openSignUp()}>Sign Up</Button>
              <Button color="inherit" onClick={() => openSignIn()}>Sign In</Button>
              </>
            )}
          </Toolbar>
        </Container> 
      </AppBar>

      <Container sx={{ paddingTop: "80px", bgcolor: "background.paper", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Typography variant="h2" component="h1" gutterBottom
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "white",
            textAlign: "center",
            textShadow: "0 0 20px rgba(60, 60, 50, 1)",
          }}
        >
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
            onClick={handleJoinRoom}
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
