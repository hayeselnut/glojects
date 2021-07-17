/* Helper functions to filter and return new list of markers based on 
certain criteria as well as functions to add or delete projects, etc*/

// Given an array of objects, a text field and a value, returns a filtered
// array containing only objects matching the criteria
export const filterByExactField = (projects, field, value) => {
    const newProjects = projects.filter(obj => obj[field] === value);
    return newProjects;
}

// Given a project and the list of projects, adds it to the list of existing projects
export const addProject = (projects, p) => {
    const newProjects = [...projects];
    newProjects.push(p);
    return newProjects;
}

// Given a project id and the list of projects, removes it from the list and returns
export const removeProject = (projects, pId) => {
    const newProjects = projects.filter(obj => obj.id !== pId)
    return newProjects;
}
