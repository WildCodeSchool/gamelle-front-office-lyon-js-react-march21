import { createContext, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';

export const CurrentPetProfileContext = createContext();

export default function CurrentPetProfileContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profilePet, setProfilePet] = useState();
  const [loadingProfilePet, setLoadingProfilePet] = useState(false);

  // ------------------------------------------ //

  const getProfilePet = useCallback(async () => {
    setLoadingProfilePet(true);
    let data = null;

    try {
      data = await API.get('/currentUser').then((res) => res.data);
      setProfilePet(data);
    } catch (err) {
      window.console.error(err);
    } finally {
      setLoadingProfilePet(false);
    }
    return data;
  }, []);

  // ------------------------------------------ //

  useEffect(() => {
    getProfilePet();
  }, []);

  // ------------------------------------------ //

  const createPetProfile = useCallback(async (form) => {
    try {
      await API.post('/pets', form);
      addToast('Votre animal a bien été ajouté', {
        appearance: 'success',
      });
    } catch (err) {
      addToast('Il y a eu une erreur lors de la création de votre animal.', {
        appearance: 'error',
      });
    }
  });

  // ------------------------------------------ //

  return (
    <CurrentPetProfileContext.Provider
      value={{
        profilePet,
        loadingProfilePet,
        getProfilePet,
        createPetProfile,
      }}
    >
      {children}
    </CurrentPetProfileContext.Provider>
  );
}
