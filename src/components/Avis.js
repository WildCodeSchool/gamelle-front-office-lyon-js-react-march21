import Rating from '@material-ui/lab/Rating';
import { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import PetsIcon from '@material-ui/icons/Pets';
import API from '../APIClient';
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
    <div className="flex flex-wrap">
      <br />
      <div className="flex inline-block">
        <div className="h-96 px-10">
          <img
            src={foodDetails.image_aws_url}
            alt={foodDetails.name}
            className="h-full rounded border-2 border-black"
          />
        </div>
        <div className="flex flex-row items-center justify-center font-bold">
          <h5>{foodDetails.name}</h5>
        </div>
        <br />
      </div>
      <form
        onSubmit={handleSubmit(submitAdvice)}
        className="mt-3 flex flex-col w-screen"
        action="send"
        method="POST"
      >
        <div className="ml-3 flex justify-evenly mt-10">
          <div className="pl-3 flex flex-col items-center">
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
          <div className="flex flex-col">
            <div className="mb-3 flex">
              <div className="w-1/2 font-bold">
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
              <div className="w-1/2 font-bold">
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
              <div className="w-1/2 font-bold">
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
        <div className="pl-3 flex mt-10">
          <label
            htmlFor="reviews"
            className="w-screen flex justify-center items-center flex-col"
          >
            <div className="flex justify-start w-2/3 mb-3">
              Vos commentaires sur le produit
            </div>

            <textarea
              value={reviews}
              onChange={(event) => {
                setReviews(event.target.value);
              }}
              className="w-2/3 h-40 border border-black"
              name="reviews"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="btn btn-primary hover:btn-secondary flex justify-end mt-3"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
