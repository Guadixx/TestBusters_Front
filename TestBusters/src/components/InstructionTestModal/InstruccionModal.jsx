import './InstruccionModal.css';

const CreateTestModal = ({ setShowInstruccionModal }) => {
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
                <p>4th: Topic. What is your test about? Enter your chosen topic.</p>
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
              You choose either if your question would be a written question (text) or an
              image{' '}
            </h4>
            <h4>On the right side you can chose to upload an extra picture</h4>
            <h4>
              The + sign is to upload another answer option, you can add as many as you
              like
            </h4>
            <h4> The trashcan is to delete the whole test, be careful!</h4>
            <h4>
              + Add question button, is to add another question. Again add as many as you
              like!
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

export default CreateTestModal;
