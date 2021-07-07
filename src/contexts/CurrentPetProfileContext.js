// import qs from 'query-string';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
// import history from '../history';

export const CurrentPetProfileContext = createContext();

export default function CurrentPetProfileContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profilePet, setProfilePet] = useState();
  const [loadingProfilePet, setLoadingProfilePet] = useState(false);
  const [savingProfilePet, setSavingProfilePet] = useState(false);

  const createPetProfile = useCallback(async (form) => {
    try {
      await API.post('/animal', form);
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
  const getProfilePet = useCallback(async () => {
    setLoadingProfilePet(true);
    let data = null;

    try {
      data = await API.get('/currentPet').then((res) => res.data);
      setProfilePet(data);
    } catch (err) {
      window.console.error(err);
    } finally {
      setLoadingProfilePet(false);
    }
    return data;
  }, []);

  useEffect(() => {
    getProfilePet();
  }, []);

  const updateProfilePet = useCallback(
    async (attributes) => {
      setSavingProfilePet(true);
      const formData = new FormData();
      Object.keys(attributes).forEach((prop) => {
        formData.append(prop, attributes[prop]);
      });
      try {
        const updatedProfilePet = await API.patch(
          `/animal/${profilePet.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then((res) => res.data);
        setProfilePet(updatedProfilePet);
        addToast('Votre profil a bien été mis à jour !', {
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
  const deletePet = (id) => {
    // eslint-disable-next-line
    if (window.confirm('Are you sure ?')) {
      setLoadingProfilePet(true);
      API.delete(`/animal/${profilePet.id}`)
        .then(() => {
          setProfilePet(
            Object.values((profilPet) => profilPet.filter((n) => n.id !== id))
          );
          addToast('Votre animal a bien été supprimé !', {
            appearance: 'success',
          });
        })
        .catch((err) => {
          window.console.error(err);
          addToast(
            'Il u a eu une erreur lors de la supression de votre animal !',
            {
              appearance: 'error',
            }
          );
        })
        .finally(() => {
          setLoadingProfilePet(false);
        });
    }
  };

  // ------------------------------------------ //

  // favoritesList = {103: true, 456: false} ici 456 était fav puis a été supprimé
  // const toggleFoodInFavorites = async (foodId) => {
  //   const newList = await ((currentFavorites) => {
  //     return {
  //       ...currentFavorites,
  //       [foodId]: !currentFavorites[foodId],
  //     };
  //   });
  //   setFavoritesIdsList(newList);
  // };

  return (
    <CurrentPetProfileContext.Provider
      value={{
        profilePet,
        loadingProfilePet,
        savingProfilePet,
        getProfilePet,
        updateProfilePet,
        deletePet,
        createPetProfile,
      }}
    >
      {children}
    </CurrentPetProfileContext.Provider>
  );
}

/*   const deleteUser = useCallback(async (id) => {
    // eslint-disable-next-line
    if (window.confirm('Are you sure ?')) {
      setLoadingProfile(true);
      try {
        await API.delete(`/profil/${id}`).then(() => {
          setProfile((profil) => profil.filter((n) => n.id !== id));
          addToast('Votre compte a bien éte supprimé !', {
            appearance: 'error',
          }).finally(() => {
            setLoadingProfile(false);
          });
        });
      } catch (err) {
        addToast('Il y a eu une erreur lors de la création de votre compte !', {
          appearance: 'error',
        });
      }
    }
  });

*/
