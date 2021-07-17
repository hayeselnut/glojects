import React from 'react';

import { Label } from 'semantic-ui-react';

const DifficultyLabel = (props) => {
  const { difficulty } = props;

  const color = difficulty === 'EASY' ? 'green'
    : difficulty === 'MEDIUM' ? 'yellow' : 'red';

  return (
    <Label
      color={color}
    >
      {difficulty}
    </Label>
  );
};

export default DifficultyLabel;
