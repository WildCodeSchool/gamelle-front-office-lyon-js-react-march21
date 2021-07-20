import { createContext, useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';

export const CurrentPetProfileContext = createContext();

export default function CurrentPetProfileContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profilePet, setProfilePet] = useState();
  const [savingProfilePet, setSavingProfilePet] = useState(false);
  // const [loadingProfilePet, setLoadingProfilePet] = useState(false);

  // ------------------------------------------ //

  // const getProfilePet = useCallback(async () => {
  //   setLoadingProfilePet(true);
  //   let data = null;

  //   try {
  //     data = await API.get('/currentUser').then((res) => res.data);
  //     setProfilePet(data);
  //   } catch (err) {
  //     window.console.error(err);
  //   } finally {
  //     setLoadingProfilePet(false);
  //   }
  //   return data;
  // }, []);

  // ------------------------------------------ //

  // useEffect(() => {
  //   getProfilePet();
  // }, []);

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

  const updatePet = useCallback(
    async (attributes) => {
      setSavingProfilePet(true);
      const formData = new FormData();
      Object.keys(attributes).forEach((prop) => {
        if (prop !== 'Animals') {
          formData.append(prop, attributes[prop]);
        }
      });

      try {
        const updatedProfile = await API.patch(
          `/pets/${profilePet.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then((res) => res.data);

        setProfilePet({ ...updatedProfile, Animals: profilePet.Animals });
        addToast('Votre animal a bien été mis à jour !', {
          appearance: 'success',
        });
      } catch (err) {
        window.console.error(err);
        addToast('Il ya eu un problème lors de la mise à jour', {
          appearance: 'error',
        });
      } finally {
        setSavingProfilePet(false);
      }
    },
    [profilePet]
  );

  // ------------------------------------------ //

  return (
    <CurrentPetProfileContext.Provider
      value={{
        profilePet,
        setProfilePet,
        // loadingProfilePet,
        // getProfilePet,
        createPetProfile,
        updatePet,
        savingProfilePet,
        setSavingProfilePet,
      }}
    >
      {children}
    </CurrentPetProfileContext.Provider>
  );
}
