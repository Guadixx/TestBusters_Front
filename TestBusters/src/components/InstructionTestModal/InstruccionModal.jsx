import './InstruccionModal.css';

const CreateTestModal = ({ setShowInstruccionModal }) => {
  return (
    <div className="createtest-modal">
      <div className="createtest-modal-content">
        <div className="btnclose_container">
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
          <div className="middlelist_container">
            <h4>Custom Section</h4>
            <p>
              You choose either if your question would be a written question (text) or an
              image{' '}
            </p>
            <p>On the right side you can chose to upload an extra picture</p>
            <p>
              The + sign is to upload another answer option, you can add as many as you
              like
            </p>
            <p> The trashcan is to delete the whole test, be careful!</p>
            <p>
              + Add question button, is to add another question. Again add as many as you
              like!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;
