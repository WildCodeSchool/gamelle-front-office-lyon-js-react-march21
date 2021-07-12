import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useContext } from 'react';
import { AdviceContext } from '../contexts/AdviceContext';

export default function TotalRating() {
  // eslint-disable-next-line no-unused-vars
  const { global, generalRating } = useContext(AdviceContext);
  return (
    <>
      <Rating
        name="global"
        value={generalRating}
        readOnly
        icon={<PetsIcon fontSize="inherit" />}
      />
    </>
  );
}
