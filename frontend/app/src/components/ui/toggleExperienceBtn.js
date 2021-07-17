import React, {useState, useEffect} from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { scrapeToGlojectObj } from '../WorldUtil/projectsUtil';
import api from '../../api';

const ToggleExperienceBtn = ({updateGlojects}) => {
    const [state, setState] = useState("ALL");
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const ue = async () => {
          const allTags = await api.glojects.getAllTags();
          setAllTags(allTags.map((tag) => ({key: tag, text: tag, value: tag})));
        };
        ue();
      }, []);

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

    const onExperienceClick = () => {
        let mode = getNextState();
        setState(mode);

        let difficulty = mode;
        if (difficulty === 'ALL') {
            difficulty = '';
        }

        filterGlojects(difficulty);
    }

    const onTagClick = () => {
        let difficulty = state;
        if (difficulty === 'ALL') {
            difficulty = '';
        }
        filterGlojects(difficulty);
    }

    const filterGlojects = (difficulty) => {
        api.glojects.getAllFilters({difficulty, tags}).then(res => {
            const newGlojects = [];
            res.forEach(value => {
                newGlojects.push(scrapeToGlojectObj(value));
            })

            updateGlojects(newGlojects);
        })
    }

    return (
        <>
            <Button onClick={onExperienceClick}>
                Difficulty: {state}
            </Button>
            <Dropdown
                placeholder='Add tags'
                multiple
                search
                selection
                options={allTags}
                onChange={(e, {value}) => setTags(value)}
            >
            </Dropdown>
            <Button
                content="Filter" 
                onClick={onTagClick}
            >
            </Button>
        </> 
    )
}

export default ToggleExperienceBtn;