import './DeleteTestModal.css';

import { useNavigate } from 'react-router-dom';

import { API } from '../../services/API';
import Palette from '../../styles/Palette';
import Button from '../../ui/Button';
import { Heading_3, Heading_4 } from '../../ui/Headings';

const DeleteTestModal = ({ test, showDeleteModal, setShowDeleteModal }) => {
  const testType = test.test_type == 'generic' ? 'generictests' : 'featuredtests';
  const navigate = useNavigate();
  const deleteModal = () => {
    API.delete(`/${testType}/${test._id}`).then((res) => navigate('/tests'));
  };
  return (
    <>
      {showDeleteModal ? (
        <div className="delete-test-modal">
          <div className="delete-test">
            <Heading_3
              text={`Are you sure to delete "${test.title}"?`}
              size="22px"
              weigth="600"
            />
            <Heading_4 text="You won't be able to undo this action." size="14px" />
            <div className="delete-test-buttons">
              <Button
                background={Palette.color_highlight_primary}
                color={Palette.color_bg}
                textBefore="Cancel"
                size="4"
                fixed_width="90px"
                action={() => setShowDeleteModal(false)}
              />
              <Button
                variant="border"
                background="transparent"
                color={Palette.color_primary}
                textBefore="Delete"
                size="4"
                fixed_width="90px"
                action={() => deleteModal()}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteTestModal;
