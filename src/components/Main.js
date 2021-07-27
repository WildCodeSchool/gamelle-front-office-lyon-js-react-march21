import { Switch, Route, useLocation } from 'react-router-dom';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import PetFormPage from '../screens/PetFormPage';
import HistoryPage from '../screens/HistoryPage';
import SignUp from './SignUp';
import GetResetPasswordMailPage from '../screens/GetResetPasswordMailPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import ConfirmEmail from '../screens/ConfirmEmail';
import Favorites from '../screens/FavoritesPage';
import Dashboard from '../screens/DashboardPage';
import ProductInfoPage from '../screens/ProductInfoPage';
import UsersManagementPage from '../screens/UsersManagementPage';
import RatingPage from '../screens/RatingPage';
import HomePage from '../screens/HomePage';

export default function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <main>
      <Switch location={background || location}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/result-product" component={SearchPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route
          exact
          path="/forgot-password"
          component={GetResetPasswordMailPage}
        />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/confirm-email" component={ConfirmEmail} />
        <Route path="/favoris" component={Favorites} />
        <Route path="/petform" component={PetFormPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/product-info-page" component={ProductInfoPage} />
        <Route exact path="/users" component={UsersManagementPage} />
        <Route exact path="/give-advice" component={RatingPage} />
      </Switch>
    </main>
  );
}
