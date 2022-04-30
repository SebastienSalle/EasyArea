export default function name(projectName = "", action) {
  if (action.type === "project") {
    const newProjectName = action.value;
    return newProjectName;
  } else {
    return projectName;
  }
}
