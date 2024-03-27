import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import logo from '../../logo.svg'
import myLogo from '../../images/Gemini_Generated_Image-removebg-preview.png'
import { Outlet, Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import GitHubIcon from '@mui/icons-material/GitHub'
import TuneIcon from '@mui/icons-material/Tune'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { useAuthContext } from '../hooks/useAuthContext'
import Footer from './Footer'
import { useLogout } from '../hooks/useLogout'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

const drawerWidth = 240

function Sidebar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const { user } = useAuthContext()
  const { logout } = useLogout()

  // if (user) {
  //   console.log(user);
  // }

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <div>
      <div className='flex justify-center items-center mb-3'>
        <img src={myLogo} className='App-logo w-[10vw] ' alt='logo' />
      </div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {['Home', 'Repo', 'About', 'Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            {text === 'Home' && (
              <Link to='/' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {text === 'Repo' && (
              <Link to='/repo' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {text === 'About' && (
              <Link to='/about' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {text === 'Contact' && (
              <Link to='/contact' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <PermContactCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Profile', 'SignUp', 'SignIn', 'SignOut'].map((text, index) => (
          <ListItem key={text} disablePadding>
            {user && text === 'Profile' && (
              <Link to='/profile' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {!user && text === 'SignUp' && (
              <Link to='/signup' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {!user && text === 'SignIn' && (
              <Link to='/signin' className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
            {user && text === 'SignOut' && (
              <Link to='' onClick={logout} className='w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <div className='flex justify-between items-center w-full h-full'>
              <div className=''>
                <Link
                  to='https://facebook.com'
                  className='block sm:hidden md:hidden lg:hidden'
                >
                  <FacebookIcon />
                </Link>
                <Link
                  to='https://facebook.com'
                  className='hidden sm:inline-block md:inline-block lg:inline-block'
                >
                  Facebook
                </Link>
              </div>
              <div>
                <Link
                  to='https://github.com'
                  className='block sm:hidden md:hidden lg:hidden'
                >
                  <GitHubIcon />
                </Link>
                <Link
                  to='https://github.com'
                  className='hidden sm:inline-block md:inline-block lg:inline-block'
                >
                  Github
                </Link>
              </div>
              <div>
                <Link
                  to='https://linkedin.com'
                  className='block sm:hidden md:hidden lg:hidden'
                >
                  <LinkedInIcon />
                </Link>
                <Link
                  to='https://linkedin.com'
                  className='hidden sm:inline-block md:inline-block lg:inline-block'
                >
                  LinkedIn
                </Link>
              </div>
              <div>
                <Link
                  to='https://instagram.com'
                  className='block sm:hidden md:hidden lg:hidden'
                >
                  <InstagramIcon />
                </Link>
                <Link
                  to='https://instagram.com'
                  className='hidden sm:inline-block md:inline-block lg:inline-block'
                >
                  Instagram
                </Link>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // minHeight: '200vh',
          // backgroundColor: 'green',
          // paddingBottom: `${drawerWidth}px`
          overflow: 'auto',
          marginBottom: '4rem',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Sidebar
