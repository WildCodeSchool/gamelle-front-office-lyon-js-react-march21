import { Switch, Route, useLocation } from 'react-router-dom';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import HistoryPage from '../screens/HistoryPage';
import ResultsPage from '../screens/ResultsPage';
import ProductInfo from '../screens/ProductInfoPage';
import SignUp from './SignUp';
import GetResetPasswordMailPage from '../screens/GetResetPasswordMailPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import ConfirmEmail from '../screens/ConfirmEmail';
import ModalInfo from './ModalInfo';

export default function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <main>
      <Switch location={background || location}>
        <Route exact path="/" component={SearchPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/results" component={ResultsPage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/product-info" component={ProductInfo} />
        <Route
          exact
          path="/forgot-password"
          component={GetResetPasswordMailPage}
        />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/confirm-email" component={ConfirmEmail} />
        {background && <Route path="/product-info/" component={ModalInfo} />}
      </Switch>
    </main>
  );
}
