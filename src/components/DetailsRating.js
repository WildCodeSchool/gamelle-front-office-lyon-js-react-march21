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
        <div className="ml-3">
          <h4>Appétance :</h4>
          <Rating
            name="Appetance"
            value={avgRating ? avgRating.appetance : null}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Digestion :</h4>
          <Rating
            name="Digestion"
            value={avgRating ? avgRating.digestion : null}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
          <br />
          <h4>Qualité des selles :</h4>
          <Rating
            name="selle"
            value={avgRating ? avgRating.selle : null}
            icon={<PetsIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      ) : (
        <div>
          <h4>Appétance :</h4>
          <Rating
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
