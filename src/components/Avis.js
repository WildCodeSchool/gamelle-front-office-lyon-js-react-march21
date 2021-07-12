import Rating from '@material-ui/lab/Rating';
import { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import PetsIcon from '@material-ui/icons/Pets';
import API from '../APIClient';
import { FoodContext } from '../contexts/FoodContext';
import { AdviceContext } from '../contexts/AdviceContext';

export default function Avis() {
  const {
    submitAdvice,
    selle,
    setSelle,
    digestion,
    setDigestion,
    appetance,
    setAppetance,
  } = useContext(AdviceContext);
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);

  const { handleSubmit } = useForm();
  console.log(selle);
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
    <div>
      <div>
        <h1>Rédiger un avis</h1>
        <ul className="list-disc">
          <li>- Vous ne pouvez donner qu’un seul avis par produit</li>
          <li>
            - Assurez-vous d’avoir personnellement testé ou utilisé le produit
            ou service
          </li>
        </ul>
        <p>- Merci pour votre contribution !</p>
      </div>
      <br />
      <div className="flex inline-block justify-center">
        <div className="h-96 px-24">
          <img
            src={foodDetails.image_aws_url}
            alt={foodDetails.name}
            className="h-full rounded"
          />
        </div>
        <div className="flex flex-row items-center justify-center font-bold ">
          <h5>{foodDetails.name}</h5>
        </div>
        <br />
      </div>
      <form
        onSubmit={handleSubmit(submitAdvice)}
        className="mt-8 space-y-6"
        action="send"
        method="POST"
      >
        <div className="ml-3">
          <h4>Appetance :</h4>
          <Rating
            name="Appetance"
            value={appetance}
            onChange={(event, value) => {
              setAppetance(value);
            }}
            size="large"
            icon={<PetsIcon fontSize="inherit" />}
          />
          <br />

          <h4>Digestion :</h4>

          <Rating
            name="Digestion"
            value={digestion}
            onChange={(event, value) => {
              setDigestion(value);
            }}
            icon={<PetsIcon fontSize="inherit" />}
          />

          <br />

          <h4>Qualitée des selles :</h4>

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
          <button type="submit" className="btn btn-primary hover:btn-secondary">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
