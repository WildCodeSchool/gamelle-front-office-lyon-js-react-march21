function AvatarPet({ imagePet, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="w-20 h-20 rounded-full flex justify-center items-center cursor-pointer"
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
