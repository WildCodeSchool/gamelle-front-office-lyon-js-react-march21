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
    rating &&
    rating.length >= 5 && (
      <>
        <Rating
          name="ratingMean"
          value={rating.ratingMean}
          readOnly
          icon={<PetsIcon fontSize="inherit" />}
        />
      </>
    )
  );
}
