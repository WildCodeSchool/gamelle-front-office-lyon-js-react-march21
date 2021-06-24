import { Switch, Route } from 'react-router-dom';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import HistoryPage from '../screens/HistoryPage';
import ResultsPage from '../screens/ResultsPage';
import ProductInfo from '../screens/ProductInfoPage';
import SignUp from './SignUp';
import GetResetPasswordMailPage from '../screens/GetResetPasswordMailPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import ConfirmEmail from '../screens/ConfirmEmail';

export default function Main() {
  return (
    <main>
      <Switch>
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
      </Switch>
    </main>
  );
}
