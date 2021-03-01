import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    root: {
      maxWidth: '100%',
      margin: '20px',

    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    typography: {
      fontSize: '20px'
    }
}));