import React, {useState, useEffect} from 'react';
import { Button } from 'semantic-ui-react';
import { filterByExactField } from '../WorldUtil/projectsUtil';
const ToggleExperienceBtn = ({markers, setMarkers}) => {
    const [state, setState] = useState("All");

    const getNextState = () => {
        if (state === "All") {
            return "Easy";
        } else if (state === "Easy") {
            return "Medium";
        } else if (state === "Medium") {
            return "Hard";
        } else if (state === "Hard") {
            return "All";
        }
    }

    const onClick = () => {
        const mode = getNextState();
        setState(mode);
        setMarkers(filterByExactField(markers, "difficulty", mode));
    }

    return (
        <Button onClick={onClick}>
            Difficulty: {state}
        </Button>
    )
}

export default ToggleExperienceBtn;