import { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';

import API from '../APIClient';
// import history from '../history';

export const AdviceContext = createContext();

export default function AdviceContextProvider({ children }) {
  const { addToast } = useToasts();
  const { id } = qs.parse(window.location.search);
  const [digestion, setDigestion] = useState(3);
  const [selle, setSelle] = useState(3);
  const [appetance, setAppetance] = useState(3);
  const [global, setGlobal] = useState(null);
  const submitAdvice = async () => {
    try {
      await API.post(`/ratings/${id}`, { selle, digestion, appetance });
      addToast('Votre avis à bien été pris en compte', {
        appearance: 'success',
      });
    } catch (err) {
      if (err) {
        addToast("Il y a un problème lors de l'envoi de votre avis", {
          appearance: 'error',
        });
      }
    }
  };

  const generalRating = () => {
    return (digestion + selle + appetance) / 3;
  };

  return (
    <AdviceContext.Provider
      value={{
        submitAdvice,
        selle,
        setSelle,
        setDigestion,
        setAppetance,
        digestion,
        appetance,
        generalRating,
        global,
        setGlobal,
      }}
    >
      {children}
    </AdviceContext.Provider>
  );
}
