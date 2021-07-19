import Rating from '@material-ui/lab/Rating';
import { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import PetsIcon from '@material-ui/icons/Pets';
import API from '../APIClient';
import TotalRating from './TotalRating';
import { FoodContext } from '../contexts/FoodContext';
import { RatingContext } from '../contexts/RatingContext';

export default function Avis() {
  const {
    submitAdvice,
    selle,
    setSelle,
    digestion,
    setDigestion,
    appetance,
    setAppetance,
    reviews,
    setReviews,
  } = useContext(RatingContext);
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);

  const { handleSubmit } = useForm();

  // eslint-disable-next-line no-console
  useEffect(() => {
    API.get(`/foods/${id}`)
      .then((res) => {
        setFoodDetails(res.data);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-wrap pt-5 px-3 md:flex md:flex-wrap md:px-56 md:pt-10 lg:flex lg:flex-wrap lg:px-56 lg:pt-10 xl:flex xl:flex-wrap xl:px-56 xl:pt-10">
      <div className=" flex flex-col md:flex md:w-full md:flex-row md:justify-between lg:flex lg:flex-row lg:w-full lg:justify-between xl:flex xl:flex-row xl:w-full xl:justify-between">
        <div className="h-40 flex justify-center md:h-60 lg:h-96 xl:h-96">
          <img
            src={foodDetails.image_aws_url}
            alt={foodDetails.name}
            className="h-full rounded border-2 border-black"
          />
        </div>
        <div className="flex font-bold mt-3 text-sm md:flex md:items-center md:text-md lg:flex lg:items-center lg:text-lg  xl:flex xl:items-center xl:text-lg ">
          <h5>{foodDetails.name}</h5>
        </div>
        <div className="flex flex-col mt-3 justify-center items-center text-xs md:items-center md:justify-center md:text-md lg:items-center lg:justify-center lg:text-lg">
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
        <div className="flex flex-col text-xs px-3 md:flex md-flex-row md:justify-between md:mt-5 md:text-md lg:flex lg:flex-row lg:justify-between lg:mt-10 lg:text-lg xl:flex xl:flex-row xl:justify-between xl:mt-10 xl:text-lg ">
          <div className="pl-3 flex  flex-col mt-3">
            <h1 className="font-bold mb-3">Rédiger un avis</h1>
            <ul className="list-disc">
              <li>Vous ne pouvez donner qu’un seul avis par produit</li>
              <li>
                Si vous laissez un second avis, votre avis précédent sera
                remplacé
              </li>
              <li>
                Assurez-vous d’avoir personnellement testé ou utilisé le produit
              </li>
            </ul>
            <p className="text-opaque">Merci pour votre contribution !</p>
          </div>
          <div className="flex flex-col mt-3 md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col">
            <div className="mb-3 flex">
              <div className="font-bold w-3/4 pr-3">
                <h4>Appetance </h4>
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
                icon={<PetsIcon fontSize="inherit" />}
              />
            </div>
            <div className="mb-3 flex">
              <div className="font-bold w-3/4 pr-3">
                <h4>Qualitée des selles </h4>
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
            <div>
              <h1 className="text-xs italic">
                Votre évaluation du produit (5 = meilleure note){' '}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex mt-10">
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
