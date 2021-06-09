export default function UserProfile() {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold">Mon profil</h1>
      </div>
      <br />

      <div className="flex items-center bg-primary rounded shadow shadow-lg p-3">
        <img
          className="w-300 mr-4 rounded-full p-3"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv"
          alt="imageprofil"
        />
        <br />

        <div className="flex items-center w-auto m-4">
          <ul className="listeDetail">
            <li className="bg-grey w-auto  text-center p-10">
              <p>user.name</p>
            </li>
            <li className="bg-white w-auto text-center p-10">
              <p>user.username</p>
            </li>
            <li className="bg-grey w-auto text-center p-10">
              <p>user.email</p>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div className="text-gray-700">
        <p>Modifier Profil</p>
        <p>Ajouter un animal</p>
      </div>
    </div>
  );
}
