/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './FollowersModal.css';

import { Link, useNavigate } from 'react-router-dom';

import { API } from '../../services/API';
import Avatar from '../../ui/Avatar';
import { Heading_3, Heading_4, Heading_5 } from '../../ui/Headings';

const FollowersModal = ({ userFollowers, setShowFollowersModal }) => {
  const navigate = useNavigate();

  const getFollower = (id) => {
    API.get(`/users/${id}`).then((res) => {
      localStorage.setItem('communityUser', res.data.user);
    });
  };
  return (
    <div className="followers-modal">
      <div className="followers-modal-content">
        <div className="followers-modal-header">
          <Heading_3 text="Followers" weigth="600" size="18px" />
          <button onClick={() => setShowFollowersModal(false)}>X</button>
        </div>
        <div className="profile-followers-list">
          {userFollowers.length > 0 ? (
            userFollowers.reverse().map((follower) => (
              <div
                className="profile-followers-card"
                key={follower._id}
                onClick={() => {
                  navigate(`/profile/statistics/${follower._id}`);
                  setShowFollowersModal(false);
                  getFollower(follower._id);
                  window.location.reload();
                }}
              >
                <Avatar src={follower.avatar} alt="user avatar" width="m" height="m" />
                <div className="profile-followers-info">
                  <Heading_4 text={follower.username} weigth="700" />
                  <Heading_5 text={`Level ${follower.level[0]}`} />
                </div>
                <Link to={`/profile/statistics/${follower._id}`}>Details</Link>
              </div>
            ))
          ) : (
            <Heading_4 text="No followers yet" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
