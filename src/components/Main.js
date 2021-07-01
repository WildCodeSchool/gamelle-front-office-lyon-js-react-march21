import { Switch, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import PetFormPage from '../screens/PetFormPage';
import HistoryPage from '../screens/HistoryPage';
import ResultsPage from '../screens/ResultsPage';
import FichePage from '../screens/FichePage';
import SignUp from './SignUp';
import GetResetPasswordMailPage from '../screens/GetResetPasswordMailPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import ConfirmEmail from '../screens/ConfirmEmail';
import Favorites from '../screens/FavoritesPage';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/recherche" component={SearchPage} />
        <Route path="/profil" component={ProfilePage} />
        <Route path="/petform" component={PetFormPage} />
        <Route path="/historique" component={HistoryPage} />
        <Route path="/resultats" component={ResultsPage} />
        <Route path="/inscription" component={SignUp} />
        <Route path="/ficheproduit" component={FichePage} />
        <Route path="/signUp" component={SignUp} />
        <Route
          path="/mot-de-passe-oublie"
          component={GetResetPasswordMailPage}
        />
        <Route
          path="/reinitialisation-mot-de-passe"
          component={ResetPasswordPage}
        />
        <Route exact path="/confirm-email" component={ConfirmEmail} />
        <Route path="/favoris" component={Favorites} />
      </Switch>
    </main>
  );
}
