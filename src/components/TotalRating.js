/* eslint-disable no-console */
import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useContext, useEffect, useState, Fragment } from 'react';
import { RatingContext } from '../contexts/RatingContext';
import API from '../APIClient';

export default function TotalRating({ foodId }) {
  // eslint-disable-next-line no-unused-vars
  const { global, loadRating, generalRating } = useContext(RatingContext);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    API.get(`/ratings/${foodId}`).then((res) => {
      console.log(res.data);
      console.log(foodId);
      setRating(res.data);
    });
  }, []);

  return (
    rating && (
      <>
        {console.log(rating)}
        <Rating
          name="global"
          value={rating.ratingMean}
          readOnly
          icon={<PetsIcon fontSize="inherit" />}
        />
        {global.map((gl) => (
          <Fragment key={gl.id}>
            <h1 className="text-danger">{gl.appetance}</h1>
            <h1 className="text-warning">{gl.selle} </h1>
            <h1 className="text-info">{gl.digestion} </h1>
          </Fragment>
        ))}
      </>
    )
  );
}
