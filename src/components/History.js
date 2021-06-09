export default function History() {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold">
          Mon historique
        </h1>
      </div>
      <br />

      <div className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5">
        <img
          className="w-40 h-40 bg-auto rounded-xl mr-5"
          src="https://static.openpetfoodfacts.org/images/products/356/007/100/1605/front_fr.4.400.jpg"
          alt="imageproduit"
        />

        <div>
          <p className="font-bold text-xl">
            Carrefour Multicroquettes Lapin, Dinde, Carottes, Pois, Céréales
            pour chats
          </p>
          <p className="text-base">Carrefour</p>
          <p className="text-sm">chats</p>
        </div>
      </div>
    </div>
  );
}
