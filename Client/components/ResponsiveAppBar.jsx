import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../Auth/AuthContext';

const pagesLoggedOut = ['Login', 'Sign Up', 'About'];
const pagesLoggedIn = ['Search', 'Feed', 'Favorites', 'Art', 'Discover'];
const settings = ['My Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  const history = useHistory();
  const { user, avatarUrl, logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    switch (page) {
      case 'Home':
        history.push('/');
        break;
      case 'Search':
        history.push('/search');
        break;
      case 'Feed':
        history.push('/feed');
        break;
      case 'Favorites':
        history.push('/favorites');
        break;
      case 'Login':
        history.push('/login');
        break;
      case 'Sign Up':
        history.push('/signup');
        break;
      case 'About':
        history.push('/about');
        break;
      case 'Art':
        history.push('/art');
        break;
      case 'Discover':
        history.push('/discover');
        break;
      default:
        console.log('Unknown page:', page);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyAccount = () => {
    handleCloseUserMenu();
    history.push('/myAccount');
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    history.push('/');
  };

  const handleUserMenuClick = (setting) => {
    switch (setting) {
      case 'Logout':
        handleLogout();
        break;
      case 'My Account':
        handleMyAccount();
        break;
      default:
        handleCloseUserMenu();
    }
  };

  const pages = user ? pagesLoggedIn : pagesLoggedOut;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    handleCloseNavMenu(pages[newValue]);
  };

  return (
    <AppBar position="fixed" sx={{ background: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'black' }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="primary"
              sx={{ '& .MuiTab-root': { color: 'black' } }}
            >
              {pages.map((page, index) => (
                <Tab key={page} label={page} />
              ))}
            </Tabs>
          </Box>
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {avatarUrl ? (
                    <Avatar alt={user?.user_metadata?.first_name} src={avatarUrl} />
                  ) : (
                    <Avatar>{user?.user_metadata?.first_name?.charAt(0).toUpperCase()}</Avatar>
                  )}
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
                  <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                    <Typography textAlign="center" sx={{ color: 'black' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'black' }} />
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
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center" sx={{ color: 'black' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
