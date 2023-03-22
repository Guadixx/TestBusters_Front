import './TestCard.css';

//le entra por prop el test, todavía falta poner

const TestCard = () => {
  return (
    <div className="testcard">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
        alt="test thumbnail"
        className="test-thumbnail"
      />
      <div className="test-info">
        <div className="test-info-first">
          <h4>Guess the flag</h4>
          <div className="test-info-played">
            <img
              src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679431586/achievements%20icons/tocar_uha26c.png"
              alt="play icon"
              className="play-icon"
            />
            <h5>78294</h5>
          </div>
        </div>
        <div className="test-info-user">
          <img
            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679405347/testbuster/byb4gfgoub2ayosybg1f.png"
            alt="user avatar"
          />
          <h5>Rgrivas9</h5>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
