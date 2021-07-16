/* eslint-disable no-console */
import { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import API from '../APIClient';
import history from '../history';

export const RatingContext = createContext();

export default function RatingContextProvider({ children }) {
  const { addToast } = useToasts();
  const { id } = qs.parse(window.location.search);
  const [digestion, setDigestion] = useState(null);
  const [selle, setSelle] = useState(null);
  const [appetance, setAppetance] = useState(null);
  const [global, setGlobal] = useState([]);
  const [reviews, setReviews] = useState(null);

  const submitAdvice = async () => {
    try {
      await API.post(`/ratings/${id}`, {
        selle,
        digestion,
        appetance,
        reviews,
        postedAt: new Date(),
      });
      setTimeout(() => {
        history.push('/');

        addToast('Votre avis à bien été pris en compte', {
          appearance: 'success',
        });
      }, 500);
    } catch (err) {
      if (err) {
        addToast("Il y a un problème lors de l'envoi de votre avis", {
          appearance: 'error',
        });
      }
    }
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
        global,
        setGlobal,
        reviews,
        setReviews,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}
