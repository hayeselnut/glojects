import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import Avatar from '../avatar/Avatar';

const GlojectCard = (props) => {
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Avatar userId={props.owner} />
          <a>Read more</a>
        </div>
      </Card.Content>
    </Card>
  );
};

export default GlojectCard;
