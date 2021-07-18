import React, { useEffect, useState, useContext } from 'react';
import { Icon, Image, Placeholder } from 'semantic-ui-react';
import api from '../../api';
import { StoreContext } from '../../utils/store';

const Avatar = (props) => {
  const { leaveTeam, profileId, setProfileId, type } = props;
  const [userData, setUserData] = useState({});
  const context = useContext(StoreContext);
  const { profileOpenContext, glojectOpenContext, loggedInContext } = context;
  const [loggedIn, setLoggedIn] = loggedInContext;

  const [loading, setLoading] = useState(true);

  // Profile
  const [profileOpen, setProfileOpen] = profileOpenContext;
  // Gloject
  const [glojectOpen, setGlojectOpen] = glojectOpenContext;

  const currUserId = localStorage.getItem('id');

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(profileId);
      console.log('response', userData);
      setUserData(userData);
      setLoading(false);
    };
    ue();
  }, [profileId, profileOpen, glojectOpen, loggedIn]);

  const handleClick = () => {
    setProfileId(profileId);
    setProfileOpen(true);
    setGlojectOpen(false);
    console.log(profileId);
  };

  const placeholder = (
    <Placeholder inverted={type === 'light'}>
      <Placeholder.Header image>
        <Placeholder.Line length='medium'/>
      </Placeholder.Header>
    </Placeholder>
  );

  const loaded = (
    <div style={{ display: 'flex' }}>
      <a
        onClick={() => handleClick()}
        style={{
          flexGrow: 1,
          alignSelf: 'center',
          color: `${type === 'light' ? 'white' : 'black'}`,
        }}
      >
        <Image src={userData.image} avatar style={{ marginRight: '0.5em' }} />
        <span style={{ flexGrow: 1, width: '200px' }}>{`${userData.username || ''}${
          profileId === currUserId ? ' (You)' : ''
        }`}</span>
      </a>
      {currUserId === profileId && leaveTeam && (
        <Icon
          fitted
          circular
          inverted
          size="tiny"
          color="grey"
          name="minus"
          style={{ cursor: 'pointer' }}
          onClick={(e) => leaveTeam()}
        />
      )}
    </div>
  )

  // return loading ? placeholder : loaded;
  return loaded;
};

export default Avatar;
