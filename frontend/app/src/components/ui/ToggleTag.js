import React, {useState, useEffect} from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { scrapeToGlojectObj } from '../WorldUtil/projectsUtil';
import api from '../../api';

const ToggleTag = ({updateGlojects}) => {
    // const [state, setState] = useState("");
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    // Just load all the tags initially for now
    useEffect(() => {
        const ue = async () => {
          const allTags = await api.glojects.getAllTags();
          setAllTags(allTags.map((tag) => ({key: tag, text: tag, value: tag})));
        };
        ue();
      }, []);
    



    return (
        <>
            <Dropdown
                placeholder='Filter by Tags'
                multiple
                search
                selection
                options={allTags}
                onChange={(e, {value}) => setTags(value)}
            >
            </Dropdown>
            <Button
                content="Search"
            >
            </Button>
        </>
    )
}

export default ToggleTag;