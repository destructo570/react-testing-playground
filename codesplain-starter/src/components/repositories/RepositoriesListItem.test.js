import { render, screen, act} from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

//We can also use module mock to resolve Act warnings if we don't need that component in our tests
// jest.mock("../tree/FileIcon", () => {
//   //Content of FileIcon.js
//   return () => {
//     return "File Icon Component";
//   };
// });

const renderComponent = () => {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A js library",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
};

//One way to solve Act warnings (Preffered)
// test("component shows a link for the github homepage for this repository", async () => {
//   renderComponent();

//   //For removing act warning due to FileIcon component
//   await screen.findByRole("img", {name: "JavaScript"});
// });

//===========================================================================================//

//Worst way to resolve Act warnings (Last ditch effort)
// test("component shows a link for the github homepage for this repository", async () => {
//   renderComponent();

//   await act(async() => {
//     await pause();
//   })
// });

// const pause = () => new Promise(res => setTimeout(res, 1000));
