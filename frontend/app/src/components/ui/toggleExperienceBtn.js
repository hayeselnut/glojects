import React, {useState, useEffect} from 'react';
import { Button } from 'semantic-ui-react';
import { scrapeToGlojectObj } from '../WorldUtil/projectsUtil';
import api from '../../api';

const ToggleExperienceBtn = ({updateGlojects}) => {
    const [state, setState] = useState("ALL");

    const getNextState = () => {
        if (state === "ALL") {
            return "EASY";
        } else if (state === "EASY") {
            return "MEDIUM";
        } else if (state === "MEDIUM") {
            return "HARD";
        } else if (state === "HARD") {
            return "ALL";
        }
    }

    const onClick = () => {
        const mode = getNextState();
        
        setState(mode);
        api.glojects.getAllActives().then((res) => {
            // Only keep the glojects matching the difficulty
            const newGlojects = [];
            if (mode === 'ALL') {
                res.forEach(value => {
                    newGlojects.push(scrapeToGlojectObj(value));
                })
            } else {
                res.forEach(value => {
                    if (mode === value.difficulty) {
                        newGlojects.push(scrapeToGlojectObj(value));
                    }
                })
            }

            updateGlojects(newGlojects);
        })
    }

    return (
        <Button onClick={onClick}>
            Difficulty: {state}
        </Button>
    )
}

export default ToggleExperienceBtn;