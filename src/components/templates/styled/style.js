import BusImg from '../assets/bus.webp';
import offer from '../assets/2651.webp';
import metro from '../assets/metro.webp';
import phone from '../assets/regions/2584.jpg';

export const Stylescss = (theme) => ({
  logoImg: {
    width: 40
  },
  logoIconMenu: {
    width: 30
  },
  menuMobile: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    background: '#ffffff',
    zIndex: 1000,
    width: 250,
    '@media (max-width: 480px)': {
      display: 'block'
    }
  },
  menuMobileBack: {
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    width:'100%',
    background:'#000000cc',
    zIndex:999,
  },
  inputNavFixed: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 0 12px 1px rgba(0,0,0,0.05)',
    height: 65,
    '& .MuiBottomNavigationAction-label': {
      fontFamily: `'Quicksand', sans-serif`,
    },
    '@media (min-width: 480px)': {
      display: 'none'
    }
  },
  NavbarContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '3px 30px',
    zIndex: 10,
    background: '#ffffff',
    '@media (max-width: 480px)': {
      display: 'none'
    }
  },
  nav1: {
    position: 'relative',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 30,
  },
  nav2: {
    position: 'relative',
    padding: 5,
    '@media (max-width: 680px)': {
      display: 'none'
    }
  },
  nav2Container: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    marginLeft: 25,
    padding: '10px 10px 0px 10px',
    '@media (max-width: 998px)': {
      width: '100%',
      marginLeft: 0,
    }
  },
  logoDiv: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  navAuth: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: '1%'
  },
  navAuthContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginRight: 18,
    cursor: 'pointer',
    '&:nth-child(1)': {
      marginRight: 30,
    }
  },
  iconDiv: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& .MuiSvgIcon-root': {
      fontSize: 30,
      color: '#4f4f4f',
      marginTop: -5,
      marginLeft: -11
    }
  },
  textAuth: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 14,
    color: '#4f4f4f',
    textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
    marginLeft: 23
  },
  iconSvgSize: {
    width: 20,
  },
  menuI: {
    padding: '1%'
  },
  iconContainer: {
    padding: 1,
  },
  iconNavMenu: {
    textAlign: 'center',
  },
  textNavMenu: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 15,
    color: '#4f4f4f',
    textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    cursor: 'pointer'
  },
  lineMenu: {
    border: '.5px solid rgba(66, 130, 226, 0.69)',
    position: 'absolute',
    width: 65,
    marginTop: 4,
    marginLeft: -3
  },
  principalContainerSearch: {
    position: 'relative',
    height: '80vh',
  },
  principalImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: `url(${BusImg})`,
    width: '100%',
    height: '70%',
    zIndex: -1,
    backgroundSize: 'cover',
    backgroundPositionY: '70%',
    backgroundRepeat: 'no-repeat',
    '@media (max-width: 1200px)': {
      backgroundPositionY: '70%'
    },
    '@media (max-width: 480px)': {
      backgroundImage: `url(${phone})`,
      backgroundPositionY: 0,
      backgroundSize: 'cover',
    }
  },
  searchMenuContainer: {
    position: 'relative',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: '61%',
    width: '100%',
    height: 100,
    zIndex: 100,
    '@media (max-width: 480px)': {
      top: '25%',
      height: 200,
    }
  },
  containerSearching: {
    position: 'relative',
    height: '100%',
    width: '75%',
    margin: '0 auto',
    '@media (max-width: 480px)': {
      width: '90%',
    }
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'wrap',
    height: 60,
    transform: 'translate(0, 20px)',
    background: '#ffffff',
    borderRadius: 18,
    boxShadow: '0 1px 12px 1px rgba(0, 0, 0, 0.25)',
    '@media (max-width: 480px)': {
      height: 290,
      borderRadius: 5
    }
  },
  boxOrigin: {
    position: 'relative',
    width: '23%',
    '@media (max-width: 480px)': {
      margin: 5,
      width: '100%',
    }
  },
  boxDestiny: {
    position: 'relative',
    width: '23%',
    '@media (max-width: 480px)': {
      margin: 5,
      width: '100%',
    }
  },
  boxDate: {
    position: 'relative',
    width: '23%',
    '@media (max-width: 480px)': {
      margin: 5,
      width: '100%',
    }
  },
  boxPassenger: {
    position: 'relative',
    width: '23%',
    '@media (max-width: 480px)': {
      margin: 5,
      width: '100%',
    }
  },
  boxButton: {
    width: '8%',
    position: 'relative',
    borderRadius: '0 18px 18px 0',
    background: '#282C34',
    cursor: 'pointer',
    '@media (max-width: 480px)': {
      width: '100%',
      borderRadius: 15,
    }
  },
  boxInput: {
    display: 'flex',
    alignItems: 'center',
    margin: '4px 14px',
    height: 50,
    width: '95%',
    cursor: 'pointer',
    borderRight: '2px solid #bcbcbc',
    '@media (max-width: 480px)': {
      width: '90%',
      borderRight: 'none',
      margin: 5
    }
  },
  iconBox: {
    position: 'relative',
    margin: '3px 9px 0px 2px',
    '& .MuiSvgIcon-root': {
      fontSize: 27,
      color: '#4f4f4f',
    }
  },
  spanFontBox: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 17,
    color: '#4f4f4f',
    textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
    '@media (max-width: 480px)': {
      marginLeft: 10
    }
  },
  inputBox: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 17,
    textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
    color: '#4f4f4f',
    width: '92%',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    '&::placeholder': {
      fontFamily: `'Open Sans', sans-serif`,
      fontSize: 17,
      textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
      color: '#4f4f4f'
    },
    '@media (max-width: 480px)': {
      width: '75%'
    }
  },
  btnBox: {
    textAlign: 'center',
    marginTop: 15
  },
  selecteRadioContainer: {
    position: 'absolute',
    bottom: -40,
    left: 10,
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: '#3bb509'
    },
    '& .MuiTypography-body1': {
      fontFamily: `'Open Sans', sans-serif`,
      fontSize: 14,
      color: '#4f4f4f'
    }
  },
  textTitle: {
    position: 'absolute',
    top: 100,
    left: '13%',
    '& h6': {
      color: '#000000ad',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: `'Quicksand', sans-serif`,
      textShadow: '0px 2px 7px rgba(0, 0, 0, 0.25)',
      background: 'linear-gradient(rgb(0 0 0) 50%, rgb(190, 190, 190) 95%)',
      '-webkitBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
    },
    '@media (max-width: 1195px)': {
      top: 0,
      left: 20,
      '& h6': {
        color: '#000000ad',
        fontSize: 22,
      }
    },
    '@media (max-width: 750px)': {
      display: 'none'
    }
  },
  boxPassengerModal: {
    position: 'absolute',
    left: 10,
    top: 60,
    width: '92%',
    borderRadius: 7,
    minHeight: 50,
    '@media (max-width: 480px)': {
      top: 160,
    }
  },
  boxProfileModal: {
    position: 'absolute',
    left: -40,
    top: 35,
    width: 130,
    borderRadius: 7,
    minHeight: 50,
    background: '#ffffff',
    boxShadow: '0 4px 12px 1px rgba(0, 0, 0, 0.25)',
    zIndex: 12,
  },
  boxModalProfileItem: {
    position: 'relative',
    paddingTop: 7,
    margin: 12,
    cursor: 'pointer',
    zIndex: 10,
    fontWeight: 700,
    fontFamily: `'Quicksand', sans-serif`,
  },
  boxModalPassenger: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderRadius: 10,
    boxShadow: '-1px 12px 20px 0px rgba(0, 0, 0, 0.15)',
  },
  boxModalOrigin: {
    minHeight: 60,
    borderRadius: 10,
    boxShadow: '-1px 12px 20px 0px rgba(0, 0, 0, 0.15)',
    zIndex: 1,
    textAlign: 'center'
  },
  cityInModal: {
    margin: 5,
    padding: 10,
    fontWeight: 700,
    fontFamily: `'Quicksand', sans-serif`,
    fontSize: 18,
    cursor: 'pointer',
    borderTop: '1px solid #bcbcbc',
    zIndex: 1000,
    color: '#4f4f4f',
  },
  calendarModal: {
    position: 'absolute',
    top: 70,
    borderRadius: 12,
    background: '#ffffff',
    zIndex: 1000
  },
  tripContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexFlow: 'wrap',
    margin: '50px 6%',
    '@media (max-width: 800px)': {
      flexDirection: 'column-reverse'
    }
  },
  tripBox: {
    display: 'flex',
    width: '30%',
    height: 563,
    justifyContent: 'center',
    '@media (max-width: 800px)': {
      width: '100%',
    }
  },
  tripSearch: {
    width: '68%',
    '@media (max-width: 800px)': {
      width: '100%',
    }
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    borderRadius: 30,
    boxShadow: '0 3px 12px 0 rgba(0, 0, 0, 0.25)',
    fontFamily: `'Open Sans', sans-serif`,
  },
  titleSearch: {
    width: '60%',
    marginLeft: 20,
    '& h1': {
      fontSize: 20
    }
  },
  radioControlSearch: {
    width: '60%',
    marginLeft: 20,
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: '#3bb509'
    },
    '& .MuiTypography-body1': {
      fontSize: 16,
      color: '#4f4f4f'
    }
  },
  filterBox: {
    width: '85%',
    marginLeft: 20,
  },
  filterTitleSearch: {
    margin: '10px 0px 10px 0px'
  },
  buttonSearchFilter: {
    position: 'relative',
    display:'flex',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0 20px 20px',
    borderRadius: 12,
    background: 'linear-gradient(180deg, #346784 30%, rgba(20, 39, 102, 0.91) 90%)',
    color: '#ffffff'
  },
  dateTime: {
    position: 'absolute',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    width: 168,
    left: 0,
    top: 0,
    borderRadius: '10px 0px 0px 0px',
    background: '#dcdcdc',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  resultsBox: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-around',
    background: '#FFFFFF',
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    minHeight: 130,
    marginBottom: 40,
    transition: 'all 0.6s ease-in-out',
    '&:hover': {
      position: 'relative',
      '& #bottomMsg': {
        display: 'block',
        transform: 'translate(0, 30px)',
        opacity: 1,
        zIndex: -100
      },
    },
    '& #bottomMsg': {
      position: 'absolute',
      opacity: 0,
      left: 0,
      bottom: 0,
      zIndex: -1,
      background: '#bebebe',
      padding: 5,
      width: '70%',
      color: '#000000',
      fontFamily: `'Open Sans', sans-serif`,
      borderRadius: 10,
      transition: 'all 0.4s ease-in-out',
    },
  },
  dateTimeIconBus: {
    position: 'relative',
    width: '15%',
    fontFamily: `'Open Sans', sans-serif`,
  },
  dateTimeText: {
    position: 'relative',
    width: '80%',
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 5
  },
  dateTimeDate: {
    position: 'relative',
    width: '100%',
    textTransform: 'capitalize',
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 13
  },
  resultImage: {
    width: '30%',
    alignSelf: 'flex-end',
    '@media (max-width: 480px)': {
      width: '100%',
      textAlign: 'right',
      margin: 5
    }
  },
  imgCompany: {
    width: 120,
    paddingLeft: 30,
    paddingBottom: 5
  },
  resultTimeInit: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    justifyContent: 'center',
    '@media (max-width: 480px)': {
      width: '40%',
      margin: 10
    }
  },
  resultPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
    fontFamily: `'Open Sans', sans-serif`,
    width: '30%',
    padding: '10px 0 1px 0',
    '@media (max-width: 480px)': {
      width: '100%',
      margin: 10
    }
  },
  timeResult: {
    padding: 4,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: `'Open Sans', sans-serif`,
    textShadow: '0 0 1px #000000'
  },
  cityResult: {
    padding: '8px 4px',
    fontSize: 20,
    fontWeight: 700,
    fontFamily: `'Open Sans', sans-serif`,
  },
  terminal: {
    fontSize: 13,
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 500,
    marginTop: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '90%'
  },
  buttomChoose: {
    position: 'relative',
    borderRadius: 12,
    background: 'linear-gradient(180deg, #346784 30%, rgba(20, 39, 102, 0.91) 90%)',
    color: '#ffffff',
    fontSize: 12,
    height: 30,
    '@media (max-width: 480px)': {
      width: '100%',
      margin: 20
    }
  },
  leftTime: {
    boxShadow: '0 1px 25px 2px #ffd119'
  },
  resultWarningMsg: {
    fontSize: 19,
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 700,
  },
  Checkoutcontainer: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBox: {
    width: '64%',
    fontFamily: `'Quicksand', sans-serif`,
    '@media (max-width: 480px)': {
      width: '100%'
    }
  },
  errorDiv: {
    textAlign:'right',
    width:'97%',
    fontSize:'12px',
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 600,
  },
  errorSpan: {
    color: '#ff0000'
  },
  priceContaineProcess: {
    width: '34%',
    fontFamily: `'Open Sans', sans-serif`,
    alignSelf: 'flex-start',
    '@media (max-width: 480px)': {
      width: '100%'
    }
  },
  boxCheckout: {
    minHeight: 300,
    margin: '50px 10px 20px 80px',
    boxShadow: '0 1px 12px #e2e2e2',
    borderRadius: 15,
    padding: 20,
    '@media (max-width: 480px)': {
      margin: 10
    }
  },
  boxCheckoutDiv: {
    display: 'flex',
    position: 'fixed',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    minHeight: 300,
    margin: '90px 50px 20px 5px',
    padding: '10px 20px',
    '@media (max-width: 480px)': {
      position: 'relative',
      margin: '10px 5px 50px 5px',
    }
  },
  buttonProcess: {
    width: '100%',
    position: 'relative',
    borderRadius: 5,
    background: 'linear-gradient(180deg, #346784 30%, rgba(20, 39, 102, 0.91) 90%)',
    color: '#ffffff',
    fontSize: 14,
  },
  datosBasic: {
    marginTop: 10
  },
  formControl: {
    width: '100%',
  },
  gridRoutes: {
    width: '100%',
    margin: '120px 0px',
  },
  regions: {
    position: 'relative',
    width: '100%',
    borderRadius: 35,
    '& img': {
      width: '100%',
      height: 350,
      borderRadius: 35,
      objectFit: 'cover'
    }
  },
  regionsTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    background: '#bebebe',
    borderRadius: '0 35px 0 20px',
    width: '60%'
  },
  regionTopTitle: {
    fontSize: 11,
    fontFamily: `'Quicksand', sans-serif`,
    fontWeight: 700,
    color: '#356092',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    margin: '3px 5px'
  },
  fontTopBottom: {
    fontSize: 18,
    fontFamily: `'Open Sans', sans-serif`,
    color: '#4f4f4f',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    margin: '3px 10px',
    textAlign: 'right'
  },
  titleWeb: {
    position: 'relative',
    fontFamily: `'Quicksand', sans-serif`,
    fontWeight: 700,
    textShadow: '0px 0px 4px rgba(0, 0, 0, 0.58)',
    fontSize: 30,
    marginBottom: 40
  },
  fontTitleRoutes: {
    position: 'relative',
    fontFamily: `'Open-Sans', sans-serif`,
    fontWeight: 700,
    fontSize: 15,
    color: '#7c7c7c',
    textShadow: '0px 0px 4px rgba(124, 124, 124, 0.58)',
    margin: '5px 10px'
  },
  fontSubRoutes: {
    position: 'relative',
    fontFamily: `'Quicksand', sans-serif`,
    fontSize: 25,
    color: '#3a3a3a',
    margin: '15px 10px',
    textAlign: 'center',
  },
  sectionFourContainer: {
    width: '100%',
    padding: '10px 0 0 40px',
    minHeight: 500
  },
  infoSection4: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: `'Open-Sans', sans-serif`,
  },
  fontInfoS4: {
    fontSize: 16,
    color: '#00A3FF',
    textAlign: 'center',
    margin: '15px 0 3px 0',
    textShadow: '0 0 1px #00A3FF'
  },
  fontSubInfoS4: {
    fontSize: 13,
    color: '#5b5b5b',
    textAlign: 'center',
    margin: '1px 0 3px 0',
    textShadow: '0 0 1px #5b5b5b'
  },
  titleWebAdvice: {
    position: 'relative',
    fontFamily: `'Quicksand', sans-serif`,
    fontWeight: 700,
    fontSize: 20,
    color: '#346784',
    paddingBottom: 30,
  },
  securities: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    fontFamily: `'Open-Sans', sans-serif`,
    lineHeight: 1.7,
    borderRadius: 10,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
    background: 'white'
  },
  securityBtn: {
    color: '#00A3FF',
    textTransform: 'capitalize',
    borderColor: '#00A3FF99',
    borderRadius: 10,
    height: 25
  },
  advisingOne: {
    position: 'relative',
    backgroundImage: `url(${metro})`,
    height: 440,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    borderRadius: 5
  },
  advisingSecond: {
    position: 'relative',
    backgroundImage: `url(${offer})`,
    height: 440,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    borderRadius: 5
  },
  bottomAd: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: '#ffffff',
    width: '100%',
    height: 43,
    boxSizing: 'border-box'
  },
  cardHolders: {
    marginTop: '15%',
    boxShadow: '0 1px 12px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: 20
  },
  travelFont: {
    position:'absolute',
    top:4,
    right:4,
    background: '#ffffff',
    padding: 15,
    borderRadius: '0 0 0 20px',
    width: '30%',
    textAlign: 'center',
    fontFamily: `'Quicksand', sans-serif`,
    fontWeight: 700,
    fontSize: 20
  },
  companiesImg: {
    borderRadius: 20,
    boxShadow: '0 1px 12px 1px rgba(0,0,0,0.25)',
    height: 100,
    marginTop: '40%',
    padding: '4%'
  },
  btnSelectCard: {
    background: 'linear-gradient(45deg, #1b3f80d9 30%, #00657c 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 35,
    padding: '0 10px',
    textTransform: 'capitalize',
    fontSize: 14,
  },
  cardPending: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100000,
    width: '100%',
    height: 35,
    background: '#ffd357fa',
    lineHeight: 2,
    padding: '1px 30px',
    color: '#6c6c6c',
    fontFamily: `'Quicksand', sans-serif`,
    fontWeight: 700,
    fontSize: 16
  }
});