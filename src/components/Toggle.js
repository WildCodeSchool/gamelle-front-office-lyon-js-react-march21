/* eslint-disable */
import { useTheme } from 'react-hook-tailwind-darkmode';
import Switch from '@material-ui/core/Switch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#dbedf3',
    },
    secondary: {
      main: '#155E5F',
    },
  },
});

function Toggle() {
  const { changeTheme } = useTheme();
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div>
        <Switch color="primary" onClick={() => changeTheme()} />
      </div>
    </MuiThemeProvider>
  );
}
export default Toggle;
