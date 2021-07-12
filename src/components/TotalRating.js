import Rating from '@material-ui/lab/Rating';
import { useState } from 'react';
import PetsIcon from '@material-ui/icons/Pets';

export default function TotalRating() {
  // eslint-disable-next-line no-unused-vars
  const [global, setGlobal] = useState(null);

  return (
    <>
      <Rating
        name="global"
        value={global}
        readOnly
        icon={<PetsIcon fontSize="inherit" />}
      />
    </>
  );
}
