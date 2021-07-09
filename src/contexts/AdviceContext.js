import { createContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
import history from '../history';

export const AdviceContext = createContext();

export default function AdviceContextProvider({ children }) {
  const { addToast } = useToasts();

  const submitAdvice = async (form) => {
    try {
      await API.post('/rating', form);
      addToast('Votre avis à bien été pris en compte', {
        appearance: 'success',
      });
      history.push('/');
    } catch (err) {
      if (err) {
        addToast("Il y a un problème lors de l'envoie de votre avis", {
          appearance: 'error',
        });
      }
    }
  };
  return (
    <AdviceContext.Provider
      value={{
        submitAdvice,
      }}
    >
      {children}
    </AdviceContext.Provider>
  );
}
