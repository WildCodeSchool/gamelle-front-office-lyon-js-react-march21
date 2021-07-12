import { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';

import API from '../APIClient';
// import history from '../history';

export const RatingContext = createContext();

export default function RatingContextProvider({ children }) {
  const { addToast } = useToasts();
  const { id } = qs.parse(window.location.search);
  const [digestion, setDigestion] = useState(3);
  const [selle, setSelle] = useState(1);
  const [appetance, setAppetance] = useState(1);
  const [global, setGlobal] = useState([]);
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
    return Math.floor((digestion + selle + appetance) / 3);
  };

  const loadRating = () => {
    API.get(`/ratings/${id}`, { selle, digestion, appetance }).then((res) =>
      setGlobal(res.data)
    );
  };

  return (
    <RatingContext.Provider
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
        loadRating,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}
