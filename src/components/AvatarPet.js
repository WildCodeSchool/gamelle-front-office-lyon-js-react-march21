function AvatarPet({ imagePet, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="h-20 w-20 rounded-full object-cover md:h-32 md:w-32 lg:h-40 lg:w-40 m-5 "
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
