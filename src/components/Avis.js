import Rating from '@material-ui/lab/Rating';
import { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import PetsIcon from '@material-ui/icons/Pets';
import API from '../APIClient';
import history from '../history';
import TotalRating from './TotalRating';
import { FoodContext } from '../contexts/FoodContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Avis() {
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { profile, getProfile } = useContext(CurrentUserContext);
  const { id } = qs.parse(window.location.search);
  const { addToast } = useToasts();
  const [digestion, setDigestion] = useState(null);
  const [selle, setSelle] = useState(null);
  const [appetance, setAppetance] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { handleSubmit } = useForm();

  useEffect(() => {
    if (profile && profile.Rating) {
      const currentRating = profile.Rating.filter(
        (rating) => rating.foodId === parseInt(id, 10)
      );
      if (currentRating && currentRating[0]) {
        setSelle(currentRating[0].selle);
        setDigestion(currentRating[0].digestion);
        setAppetance(currentRating[0].appetance);
        setReviews(currentRating[0].reviews);
      }
    }
  }, [profile]);

  useEffect(() => {
    API.get(`/foods/${id}`)
      .then((res) => {
        setFoodDetails(res.data);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const submitAdvice = async () => {
    try {
      await API.post(`/ratings/${id}`, {
        selle,
        digestion,
        appetance,
        reviews,
        postedAt: new Date(),
      });
      getProfile();
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
    <div className="flex flex-wrap  justify-center items-center pt-5 px-5 md:flex md:flex-wrap md:pt-10 lg:flex lg:flex-wrap lg:px-56 lg:pt-10 xl:flex xl:flex-wrap xl:px-56 xl:pt-10">
      <div className="flex flex-col justify-center items-center md:w-full lg:flex lg:flex-row lg:w-full lg:justify-between xl:flex xl:flex-row xl:w-full xl:justify-between">
        <div className="py-3  md:max-h-60 lg:max-h-96 md:py-0">
          <img
            src={foodDetails.image_aws_url}
            alt={foodDetails.name}
            className=" rounded shadow-xl max-w-lg max-h-96"
          />
        </div>
        <div className="flex font-bold mt-3 text-center md:flex md:items-center text-md md:p-5 md:text-center lg:flex lg:items-center lg:text-lg  xl:flex xl:items-center xl:text-lg ">
          <h5>{foodDetails.name}</h5>
        </div>
        <div className="flex flex-col mt-3 justify-center items-center  md:items-center md:justify-center text-md lg:items-center lg:justify-center lg:text-lg">
          <div className="mb-0.5 font-bold">
            <h1>Note globale</h1>
          </div>
          <TotalRating foodId={id} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitAdvice)}
        className="flex flex-col md:mt-3 md:flex md:w-screen lg:mt-3 lg:flex lg:w-screen xl:mt-3 xl:flex xl:w-screen"
        action="send"
        method="POST"
      >
        <div className="flex flex-col px-3 md:flex md-flex-row md:justify-between md:mt-5 text-md lg:flex lg:flex-row lg:justify-between lg:mt-10 lg:text-lg xl:flex xl:flex-row xl:justify-between xl:mt-10 xl:text-lg ">
          <div className="pl-3 flex  flex-col mt-3">
            <h1 className="font-bold mb-3">Rédiger un avis</h1>
            <ul className="list-disc pl-3">
              <li>Vous ne pouvez donner qu’un seul avis par produit</li>
              <li>
                Si vous laissez un second avis, votre avis précédent sera
                remplacé
              </li>
              <li>
                Assurez-vous d’avoir personnellement testé ou utilisé le produit
              </li>
            </ul>
          </div>
          <div className="flex flex-col mt-5 md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col">
            <div className="mb-3 flex">
              <div className="font-bold w-3/4 pr-3">
                <h4>Appétance </h4>
              </div>

              <Rating
                name="Appetance"
                value={appetance}
                onChange={(event, value) => {
                  setAppetance(value);
                }}
                icon={<PetsIcon fontSize="inherit" />}
              />
            </div>
            <div className="mb-3 flex">
              <div className="font-bold w-3/4 pr-3">
                <h4>Digestion </h4>
              </div>
              <Rating
                name="Digestion"
                value={digestion}
                onChange={(event, value) => {
                  setDigestion(value);
                }}
                defaultValue={5}
                icon={<PetsIcon fontSize="inherit" />}
              />
            </div>
            <div className="mb-3 flex">
              <div className="font-bold w-3/4 pr-3">
                <h4>Qualité des selles </h4>
              </div>
              <Rating
                name="selle"
                value={selle}
                onChange={(event, value) => {
                  setSelle(value);
                }}
                icon={<PetsIcon fontSize="inherit" />}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-10 px-3">
          <label htmlFor="reviews" className="flex w-full flex-col">
            <div className="flex mb-3">Votre commentaire sur le produit</div>

            <textarea
              value={reviews || ''}
              onChange={(event) => {
                setReviews(event.target.value);
              }}
              className="h-28 border border-black md:h-40 md:border md:border-black lg:h-40 lg:border lg:border-black xl:h-40 xl:border xl:border-black"
              name="reviews"
            />
          </label>
        </div>
        <div className="flex mt-1.5 mb-1.5 justify-center md:justify-end md:mt-5 md:pb-3 lg:mt-5 lg:pb-3 lg:justify-end xl:mt-5 xl:pb-3 xl:justify-end">
          <button
            type="submit"
            className="btn btn-primary hover:btn-secondary flex mt-3"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
