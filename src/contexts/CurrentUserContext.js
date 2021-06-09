import qs from 'query-string';
import { createContext, useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
import history from '../history';

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const isLoggedIn = !!profile;

  // ------------------------------------------ //
  const getProfile = useCallback(async () => {
    setLoadingProfile(true);
    let data = null;
    try {
      data = await API.get('/currentUser').then((res) => res.data);
      setProfile(data);
    } catch (err) {
      window.console.error(err);
    } finally {
      setLoadingProfile(false);
    }
    return data;
  }, []);

  // ------------------------------------------ //
  const login = useCallback(async ({ email, password }) => {
    try {
      await API.post('/auth/login', { email, password });
      const { redirectUrl } = qs.parse(window.location.search);
      if (redirectUrl) history.push(redirectUrl);
      addToast('Connexion réussie !', {
        appearance: 'success',
      });
      getProfile();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        addToast('Email ou mot de passe incorrect !', {
          appearance: 'error',
        });
      } else window.console.error(err);
    }
  });

  // ------------------------------------------ //
  const createProfile = useCallback(async (form) => {
    try {
      API.post('/users', form);
      addToast('La création de votre compte a été un succès !', {
        appearance: 'success',
      });
    } catch (err) {
      addToast('Il y a eu une erreur lors de la création de votre compte.', {
        appearance: 'error',
      });
    }
  });

  // ------------------------------------------ //
  const updateProfile = useCallback(
    async (attributes) => {
      setSavingProfile(true);
      const formData = new FormData();
      Object.keys(attributes).forEach((prop) => {
        formData.append(prop, attributes[prop]);
      });
      try {
        const updatedProfile = await API.patch(
          `/users/${profile.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then((res) => res.data);
        setProfile(updatedProfile);
        addToast('Profile successfully updated', {
          appearance: 'success',
        });
      } catch (err) {
        window.console.error(err);
      } finally {
        setSavingProfile(false);
      }
    },
    [profile]
  );

  // ------------------------------------------ //
  const logout = useCallback(async () => {
    try {
      await API.get('/auth/logout');
      addToast('Vous vous êtes déconnecté !', {
        appearance: 'success',
      });
      setProfile(undefined);
      history.push('/');
    } catch (err) {
      addToast('Impossible de se déconnecter !', {
        appearance: 'error',
      });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        profile,
        loadingProfile,
        savingProfile,
        getProfile,
        updateProfile,
        isLoggedIn,
        logout,
        login,
        createProfile,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
