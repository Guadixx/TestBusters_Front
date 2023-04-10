/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './FollowersModal.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../../services/API';
import Avatar from '../../ui/Avatar';
import { Heading_3, Heading_4, Heading_5 } from '../../ui/Headings';
import Spinner from '../../ui/Spinner';

const FollowersModal = ({ keyword, setShowFollowersModal }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('communityUser'));
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getFollower = (id) => {
    API.get(`/users/${id}`).then((res) => {
      setFollowers(res.data.user.followed_users);
      setFollowing(res.data.user.following_users);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getFollower(user._id);
  }, []);
  return (
    <div className="followers-modal">
      <div className="followers-modal-content">
        <div className="followers-modal-header">
          <Heading_3
            text={keyword == 'follower' ? 'Followers' : 'Following'}
            weigth="600"
            size="18px"
          />
          <button onClick={() => setShowFollowersModal(false)}>X</button>
        </div>
        {loaded ? (
          <div className="profile-followers-list">
            {keyword == 'follower' ? (
              <>
                {followers != [] ? (
                  followers.reverse().map((follower) => (
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
                      <Avatar
                        src={follower.avatar}
                        alt="user avatar"
                        width="m"
                        height="m"
                      />
                      <div className="profile-followers-info">
                        <Heading_4 text={follower.username} weigth="700" />
                        <Heading_5 text={`Level ${follower.level[0]}`} />
                      </div>
                    </div>
                  ))
                ) : (
                  <Heading_4 text="No followers yet" />
                )}
              </>
            ) : (
              <>
                {following != [] ? (
                  following.reverse().map((follower) => (
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
                      <Avatar
                        src={follower.avatar}
                        alt="user avatar"
                        width="m"
                        height="m"
                      />
                      <div className="profile-followers-info">
                        <Heading_4 text={follower.username} weigth="700" />
                        <Heading_5 text={`Level ${follower.level[0]}`} />
                      </div>
                    </div>
                  ))
                ) : (
                  <Heading_4 text="No followers yet" />
                )}
              </>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default FollowersModal;
