function Avatar({ avatarUrl, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="w-52 h-52 rounded-full flex justify-center items-center"
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
