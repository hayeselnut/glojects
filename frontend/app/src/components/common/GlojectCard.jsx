import React, { useContext } from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
import { StoreContext } from '../../utils/store';
import Avatar from '../avatar/Avatar';

const GlojectCard = (props) => {
  const context = useContext(StoreContext);
  const { profileIdContext, glojectOpenContext, glojectIdContext } = context;

  const [profileId, setProfileId] = profileIdContext;
  // Gloject
  const [glojectOpen, setGlojectOpen] = glojectOpenContext;
  const [glojectId, setGlojectId] = glojectIdContext;

  const handleReadMore = () => {
    console.log('props', props);
    setGlojectId(props.id);
    setGlojectOpen(true);
  };

  console.log('props', props);
  return (
    <Card>
      <Image src={props.src} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>
          <span className="date">
            {props.tags &&
              props.tags.map((tag) => {
                return <span>{tag}</span>;
              })}
          </span>
        </Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Header as="h5">The Team</Header>
          {props.team?.map((i) => {
            return (
              <div style={{ margin: '5px 0' }}>
                <Avatar profileId={i} setProfileId={setProfileId} type="dark" />
              </div>
            );
          })}
        </div>
      </Card.Content>
      <Card.Content extra>
        <Header as="h5">Creator</Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Avatar
            profileId={props.owner}
            setProfileId={setProfileId}
            type="dark"
          />
          <a onClick={() => handleReadMore()}>Read more</a>
        </div>
      </Card.Content>
    </Card>
  );
};

export default GlojectCard;
