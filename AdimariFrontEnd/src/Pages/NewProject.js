import React from "react";
import Banner from "../components/Banner";
import AddProject from "../components/AddProject";  

function NewProject() {
  return (
    <div>
      <Banner title={'New Project'} subtitle={"Add a new project"} />
      <AddProject />
    </div>
  );
}

export default NewProject;
