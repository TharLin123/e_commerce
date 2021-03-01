import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    display: 'flex',
    height: 170,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    marginTop: '20px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));