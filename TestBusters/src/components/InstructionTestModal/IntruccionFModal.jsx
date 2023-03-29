const CreateFTestModal = ({ setShowInstruccionModal }) => {
  return (
    <div className="createtest-modal">
      <div className="createtest-modal-content">
        <h1>Instructions</h1>
        <div className="textintruccion_container">
          <h4>On the left side of the page you have 4 filters you set on your likings</h4>
          <div className="list_container">
            <ul>
              <li>
                <p>1st: Time. You set how long the test will last </p>
              </li>
              <li>
                <p>
                  2nd: The order. Will your questions have an order or do you want them to
                  show up randomly?
                </p>
              </li>
              <li>
                <p>
                  3rd: Comments. You can choose if you want the comment section to be
                  available in your test or not
                </p>
              </li>
              <li>
                <p>
                  4th: Data Type. What is your test about? Choose from our data base what
                  your test will be about!.
                </p>
              </li>
            </ul>
          </div>
          <div className="middleh4title_container">
            <h4> On the right side of the page you have two sections</h4>
          </div>
          <div className="middleh4_container">
            <h4>
              First two options is to upload a Thumbnail and a Banner, this will show in
              the main page as a thumbnail for your test
            </h4>
            <h4>
              Then you choose a Title and description for your test, so the audience knows
              what is about!
            </h4>
          </div>
          <div className="middleh4title_container">
            <h4>On the bottom have of the page you have the last part</h4>
          </div>
          <div className="bottomh4_container">
            <h4>
              You choose any data base from our collection, choosing the topic you like
              the most for your test!
            </h4>
          </div>
        </div>
        <div className="btnclose_container">
          <button className="btn_close" onClick={() => setShowInstruccionModal(false)}>
            <img
              src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680035378/cruzar_qylnva.png"
              alt="close icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFTestModal;
