import { Switch, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import HistoryPage from '../screens/HistoryPage';
import ResultsPage from '../screens/ResultsPage';
import FichePage from '../screens/FichePage';
import SignUp from './SignUp';
import GetResetPasswordMailPage from '../screens/GetResetPasswordMailPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import ConfirmEmail from '../screens/ConfirmEmail';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/recherche" component={SearchPage} />
        <Route exact path="/profil" component={ProfilePage} />
        <Route exact path="/historique" component={HistoryPage} />
        <Route path="/resultats" component={ResultsPage} />
        <Route exact path="/inscription" component={SignUp} />
        <Route path="/ficheproduit" component={FichePage} />
        <Route exact path="/signUp" component={SignUp} />
        <Route
          exact
          path="/mot-de-passe-oublie"
          component={GetResetPasswordMailPage}
        />
        <Route
          exact
          path="/reinitialisation-mot-de-passe"
          component={ResetPasswordPage}
        />
        <Route exact path="/confirm-email" component={ConfirmEmail} />
      </Switch>
    </main>
  );
}
