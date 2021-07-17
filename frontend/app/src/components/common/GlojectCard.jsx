import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import Avatar from '../avatar/Avatar';

const GlojectCard = (props) => (
  <Card>
    <Image src={props.src} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>
        <span className="date">{props.owner}</span>
      </Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Avatar username={props.owner} />
        <a>Read more</a>
      </div>
    </Card.Content>
  </Card>
);

export default GlojectCard;
