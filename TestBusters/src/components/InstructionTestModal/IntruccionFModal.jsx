import './InstruccionFModal.css';
const CreateFTestModal = ({ setShowInstruccionModal }) => {
  return (
    <div className="createtest-modal">
      <div className="createtestF-modal-content">
        <div className="btnclosef_container">
          <button className="btn_close" onClick={() => setShowInstruccionModal(false)}>
            <img
              src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680035378/cruzar_qylnva.png"
              alt="close icon"
            />
          </button>
        </div>
        <h1>Instructions</h1>
        <div className="textintruccion_container">
          <div className="list_container">
            <ul>
              <li>
                <h4>Time</h4>
                <p>Time. You set how long the test will last </p>
              </li>
              <li>
                <h4>Order</h4>
                <p>
                  The order. Will your questions have an order or do you want them to show
                  up randomly?
                </p>
              </li>
              <li>
                <h4>Comment</h4>
                <p>
                  Comments. You can choose if you want the comment section to be available
                  in your test or not
                </p>
              </li>
              <li>

                <h4>Topic</h4>
                <p>Topic. What is your test about? Enter your chosen topic.</p>
              </li>
            </ul>
          </div>
          <div className="middlelist_container">
            <ul>
              <li>
                <h4>Thumbnail and a Banner </h4>
                <p>This will show in the main page as a thumbnail for your test</p>
              </li>
              <li>
                <h4>Title and description</h4>
                <p>
                  Title and description for your test, so the audience knows what is
                  about!
                </p>
              </li>
            </ul>
          </div>
          <div className="h4title_container">
            <h4>On the bottom have of the page you have the last part</h4>
          </div>
          <div className="bottomh4_container">
            <h4>
              You choose any data base from our collection, choosing the topic you like
              the most for your test!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFTestModal;
