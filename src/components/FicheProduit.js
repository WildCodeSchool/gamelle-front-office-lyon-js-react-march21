import axios from 'axios';

import React, { useEffect, useState } from 'react';

export default function FicheProduit() {
  const apiBase = process.env.REACT_APP_API_URL;
  // const apiUrl = process.env.REACT_APP_URL;
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBase}/ficheproduit/`)

      .then((res) => {
        setProduit(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  return (
    produit && (
      <>
        <div className="flex items-center justify-center">
          <div
            key={produit.id}
            className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
          >
            <img
              className="w-300 mr-4 rounded-full p-3"
              src={produit.image}
              alt={produit.name}
            />

            <div>
              <div className="font-bold text-xl">{produit.brand}</div>
              <div className="text-base">{produit.name}</div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
