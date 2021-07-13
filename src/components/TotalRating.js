/* eslint-disable no-console */
import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useContext, useEffect, useState, Fragment } from 'react';
import { RatingContext } from '../contexts/RatingContext';
import API from '../APIClient';

export default function TotalRating({ foodId }) {
  const { global } = useContext(RatingContext);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    API.get(`/ratings/${foodId}`).then((res) => {
      setRating(res.data);
    });
  }, []);

  return (
    rating && (
      <>
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
