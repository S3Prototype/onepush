import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#414242',
            main: '#414242',
            dark: '#737475',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            main: '#F4F6F8'
        },
        white: {
            main: '#FFFFFF'
        },
    },
});
// const theme = responsiveFontSizes(basicTheme)

export default theme