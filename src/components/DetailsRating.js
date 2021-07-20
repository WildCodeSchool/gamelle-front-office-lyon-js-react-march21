import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import { useEffect, useState } from 'react';
import qs from 'query-string';
import API from '../APIClient';

export default function DetailsRating() {
  const [avgRating, setAvgRating] = useState(null);
  const { id } = qs.parse(window.location.search);

  useEffect(() => {
    API.get(`/ratings/${id}`).then((res) => {
      setAvgRating(res.data);
    });
  }, []);

  return (
    <>
      {avgRating && avgRating.count >= 5 ? (
        <div className="flex flex-col items-center">
          <h4 className="text-center">Appétance :</h4>
          <Rating
            name="Appetance"
            value={avgRating ? avgRating.appetance : null}
            precision={0.5}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Digestion :</h4>
          <Rating
            name="Digestion"
            value={avgRating ? avgRating.digestion : null}
            precision={0.5}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Qualité des selles :</h4>
          <Rating
            name="selle"
            value={avgRating ? avgRating.selle : null}
            precision={0.5}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      ) : (
        <div className="flex flex-col items-center m-2">
          <h4>Appétance :</h4>
          <Rating
            className="toto"
            name="Appetance"
            value={0}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Digestion :</h4>
          <Rating
            name="Digestion"
            value={0}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Qualité des selles :</h4>
          <Rating
            name="selle"
            value={0}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      )}
    </>
  );
}
