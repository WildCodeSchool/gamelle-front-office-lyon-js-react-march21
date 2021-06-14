// import qs from 'query-string';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import API from '../APIClient';
import history from '../history';

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  // const [confirmedPassword, setConfirmedPassword] = useState('');
  const isLoggedIn = !!profile;
  const [showModal, setShowModal] = useState(false);

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
      // const { redirectUrl } = qs.parse(window.location.search);
      // if (redirectUrl) history.push(redirectUrl);
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
  useEffect(() => {
    getProfile();
  }, []);

  // ------------------------------------------ //

  const createProfile = useCallback(async (form) => {
    try {
      await API.post('/users', form);
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
        addToast('Votre profil a bien été mis à jour !', {
          appearance: 'success',
        });
      } catch (err) {
        window.console.error(err);
        addToast('Il ya eu un problème lors de la mise à jour', {
          appearance: 'error',
        });
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

  // ------------------------------------------ //
  const kick = useCallback(async () => {
    try {
      await API.get('/auth/logout');
      setProfile(undefined);
      history.push('/');
    } catch (err) {
      window.console.error(err);
    }
  }, []);

  // ------------------------------------------ //
  const deleteUser = (id) => {
    // eslint-disable-next-line
    if (window.confirm('Are you sure ?')) {
      setLoadingProfile(true);
      API.delete(`/users/${id}`)
        .then(() => {
          setProfile(
            Object.values((profil) => profil.filter((n) => n.id !== id))
          );
          addToast('Votre compte a bien été supprimé !', {
            appearance: 'success',
          });
        })
        .catch((err) => {
          window.console.error(err);
          addToast(
            'Il u a eu une erreur lors de la supression de votre compte !',
            {
              appearance: 'error',
            }
          );
        })
        .finally(() => {
          setLoadingProfile(false);
          kick();
        });
    }
  };

  // ------------------------------------------ //
  const resetPassword = useCallback(async (data) => {
    const { userId, token } = qs.parse(window.location.search);
    try {
      await API.post('/users/reset-password', {
        password: data.password,
        token,
        userId,
      });
      addToast('Votre mot de passe a bien été mis à jour !', {
        appearance: 'success',
      });
      history.push('/');
    } catch {
      addToast(
        'Un problème est survenu lors de la mise à jour de votre mot de passe, veuillez réessayer !',
        { appearance: 'error' }
      );
    }
  });

  // ------------------------------------------ //
  const resetPasswordEmail = (data) => {
    API.post('/users/reset-password-email', data).then(() => {
      addToast(
        'Un email a été envoyé afin de réinitialiser votre mot de passe, veuillez vérifier votre boîte mail !',
        { appearance: 'success' }
      );
    });
  };

  /* const checkedEmail = useCallback(async (data) => {
    const { userId, token } = qs.parse(window.location.search);
    try {
      await API.post('/users/confirmed-email', {
        email: data.email,
        token,
        userId,
      });
      addToast('La création de votre compte est un succès !', {
        appearance: 'success',
      });
    } catch {
      addToast(
        'Un problème est survenu lors de la création de votre compte, veuillez réessayer !',
        { appearance: 'error' }
      );
    }
  }); */

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
        deleteUser,
        kick,
        resetPassword,
        resetPasswordEmail,
        showModal,
        setShowModal,
        // checkedEmail,
        // confirmedPassword,
        // setConfirmedPassword,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
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
