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
            {state === 'ALL' ? <Button inverted onClick={onExperienceClick} style={experienceBtnStyleALL}>
                Difficulty: {state}
            </Button> : null}
            {state === 'EASY' ? <Button inverted onClick={onExperienceClick} style={experienceBtnStyleEASY}>                Difficulty: {state}
            </Button> : null}
            {state === 'MEDIUM' ? <Button inverted onClick={onExperienceClick} style={experienceBtnStyleMEDIUM}>
                Difficulty: {state}
            </Button> : null}
            {state === 'HARD' ? <Button inverted onClick={onExperienceClick} style={experienceBtnStyleHARD}>
                Difficulty: {state}
            </Button> : null}
            {/* <Button inverted onClick={onExperienceClick} style={experienceBtnStyle}>
                Difficulty: {state}
            </Button> */}

            <div style={filterTagStyle}>  
                <Dropdown
                    inverted
                    placeholder='Add tags'
                    multiple
                    search
                    selection
                    options={allTags}
                    onChange={(e, {value}) => setTags(value)}
                >
                </Dropdown>
                <Button
                    inverted
                    content="Filter" 
                    onClick={onTagClick}
                >
                </Button>
            </div>
        </> 
    )
}

export default ToggleExperienceBtn;

let experienceBtnStyleALL = {
    position: "absolute",
    bottom: "7.5vh",
    left: "1vw",
    color: 'white'
}

let experienceBtnStyleEASY = {
    position: "absolute",
    bottom: "7.5vh",
    left: "1vw",
    color: '#90ee90'
}

let experienceBtnStyleMEDIUM = {
    position: "absolute",
    bottom: "7.5vh",
    left: "1vw",
    color: '#fce37f'
}

let experienceBtnStyleHARD = {
    position: "absolute",
    bottom: "7.5vh",
    left: "1vw",
    color: '#ff7272'
}

const filterTagStyle = {
    position: "absolute",
    bottom: "2vh",
    left: "1vw"
}