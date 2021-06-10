import { Switch, Route } from 'react-router-dom';
import SearchPage from '../screens/SearchPage';
import ProfilePage from '../screens/ProfilePage';
import HistoryPage from '../screens/HistoryPage';
import ResultsPage from '../screens/ResultsPage';
import FichePage from '../screens/FichePage';
import SignUp from './SignUp';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/recherche" component={SearchPage} />
        <Route exact path="/profil" component={ProfilePage} />
        <Route exact path="/historique" component={HistoryPage} />
        <Route exact path="/resultats" component={ResultsPage} />
        <Route exact path="/ficheproduit" component={FichePage} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </main>
  );
}
