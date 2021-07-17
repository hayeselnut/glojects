import React, {useState, useEffect} from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { scrapeToGlojectObj } from '../WorldUtil/projectsUtil';
import api from '../../api';

const ToggleTag = ({updateGlojects}) => {
    // const [state, setState] = useState("");
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

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
                placeholder='Tags'
                multiple
                search
                selection
                options={allTags}
                onChange={(e, {value}) => setTags(value)}
            >
            </Dropdown>
            <Button
                content="Filter Glojects" 
                onCLick    
            >
            </Button>
        </>
    )
}

export default ToggleTag;