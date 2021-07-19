function AvatarPet({ imagePet, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40 lg:w-52 lg:h-52 m-5 cursor-pointer"
        src={
          imagePet ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv'
        }
        alt={alt}
      />
    </div>
  );
}
export default AvatarPet;
