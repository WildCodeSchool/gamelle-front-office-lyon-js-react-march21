import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useContext, useEffect, Fragment } from 'react';
import { RatingContext } from '../contexts/RatingContext';

export default function TotalRating({ foodId }) {
  // eslint-disable-next-line no-unused-vars
  const { global, loadRating, generalRating } = useContext(RatingContext);

  useEffect(() => {
    loadRating(foodId);
  }, []);

  return (
    <>
      <Rating
        name="global"
        value={generalRating(loadRating)}
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
  );
}
