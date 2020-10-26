import {createMuiTheme} from '@material-ui/core/styles';
import * as COLORS from './colors'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: COLORS.primary,
          dark: COLORS.primaryDark,
            contrastText: '#fff',

        },
        secondary: {
            main: COLORS.secondary,
            dark: COLORS.secondaryDark,
            contrastText: '#fff',

        },
        background: {
            default: COLORS.background,
            paper: COLORS.paper,

        }
    },
});

export default theme;
