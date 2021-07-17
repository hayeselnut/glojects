import React from 'react';
import { Button } from 'semantic-ui-react';

const RandomGlojectBtn = ({glojects, updateFocus}) => {
    const randomGlojectCoordinates = () => {
        const index = Math.floor(Math.random() * glojects.length);

        const coordinates = [glojects[index].coordinates[0], glojects[index].coordinates[1]];
        updateFocus(coordinates);
    }

    return (
        <Button
            style={buttonStyle}
            inverted
            onClick={randomGlojectCoordinates}
        >
            Random Gloject    
        </Button>
    )
}

export default RandomGlojectBtn;

const buttonStyle = {
    position: "absolute",
    bottom: "2vh",
    right: "1vw"
}