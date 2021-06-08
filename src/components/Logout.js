import { useContext } from 'react';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
import ConnectedContext from '../contexts/ConnectedContext';

function Logout() {
  const { setConnected } = useContext(ConnectedContext);
  const history = useHistory();
  const { addToast } = useToasts();
  const logout = () => {
    API.get('auth/logout').then(() =>
      addToast(
        'Vous vous êtes déconnecté !',
        {
          appearance: 'success',
        },
        setConnected(false),
        history.push('/inscription')
      )
    );
  };
  return (
    <div>
      <button
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
        type="button"
        onClick={() => logout()}
      >
        Se déconnecter
      </button>
    </div>
  );
}
export default Logout;
