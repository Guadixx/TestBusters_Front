import './CreateTestsModal.css';

import { Heading_4, Heading_5 } from '../../ui/Headings';
import Spinner from '../../ui/Spinner';

const CreateTestModal = ({ text1, text2, setShowResultsModal }) => {
  return (
    <div className="createtest-modal">
      <div className="createtest-modal-content">
        <button onClick={() => setShowResultsModal(false)}>X</button>
        <Heading_4 text={text1} weigth="800" size="24px" />
        <Heading_5 text={text2} />
        <Spinner />
      </div>
    </div>
  );
};

export default CreateTestModal;
