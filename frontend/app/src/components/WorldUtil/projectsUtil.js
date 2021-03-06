/* Helper functions to filter and return new list of markers based on 
certain criteria as well as functions to add or delete projects, etc*/

// Given an array of objects, a text field and a value, returns a filtered
// array containing only objects matching the criteria
export const filterByExactField = (projects, field, value) => {
  console.log('Filtering projects', projects);
  const newProjects = projects.filter((obj) => obj[field] === value);
  return newProjects;
};

// Given a project and the list of projects, adds it to the list of existing projects
export const addProject = (projects, p) => {
  const newProjects = [...projects];
  newProjects.push(p);
  return newProjects;
};

// Given a project id and the list of projects, removes it from the list and returns
export const removeProject = (projects, pId) => {
  const newProjects = projects.filter((obj) => obj.id !== pId);
  return newProjects;
};

// Given a scraped gloject, converts it into a gloject object
export const scrapeToGlojectObj = (value) => {
  const gloject = {
    id: value.id,
    title: value.title,
    description: value.description,
    difficulty: value.difficulty,
    coordinates: [value.location.latitude, value.location.longitude],
    team: value.team,
    tags: value.tags,
    owner: value.owner,
    maxTeamSize: value.maxTeamSize,
    value: 25,
    image: value.image,
  };

  if (gloject.difficulty === 'EASY') {
    gloject['color'] = '#90ee90';
  } else if (gloject.difficulty === 'MEDIUM') {
    gloject['color'] = '#fce37f';
  } else if (gloject.difficulty === 'HARD') {
    gloject['color'] = '#ff7272';
  }

  return gloject;
};
