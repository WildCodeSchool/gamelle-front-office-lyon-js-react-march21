/* eslint-disable no-console */
import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useEffect, useState } from 'react';
import API from '../APIClient';

export default function TotalRating({ foodId }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    API.get(`/ratings/${foodId}`).then((res) => {
      setRating(res.data);
    });
  }, []);

  return (
    <>
      {rating && rating.count >= 10 ? (
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">{rating.ratingMean} / 5</h3>
          <Rating
            name="ratingMean"
            value={rating.ratingMean}
            precision={0.5}
            readOnly
            icon={<PetsIcon fontSize="inherit" />}
          />
          <p className="flex justify-center text-xs italic">
            {rating.count} avis
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Rating
            name="ratingNull"
            value={0}
            readOnly
            icon={<PetsIcon fontSize="inherit" />}
          />
          <p className="text-center text-xs italic">
            Nous n'avons pas reçu assez d'avis
          </p>
        </div>
      )}
    </>
  );
}
