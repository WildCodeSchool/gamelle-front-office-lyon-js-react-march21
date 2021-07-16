function Avatar({ avatarUrl, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="w-40 h-40 md:w-52 md:h-52 filter drop-shadow-xl object-cover rounded-full"
        src={
          avatarUrl ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv'
        }
        alt={alt}
      />
    </div>
  );
}
export default Avatar;
