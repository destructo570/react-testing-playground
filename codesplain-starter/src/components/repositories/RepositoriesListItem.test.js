import { render, screen } from "@testing-library/react";
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
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
};

test("shows a file icon with appropriate file icon", async () => {
  renderComponent();
  const icon = await screen.findByRole("img", { name: "JavaScript" });
  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });
  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

//One way to solve Act warnings (Preffered)
test("component shows a link for the github homepage for this repository", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "JavaScript" });

  const link = screen.getByRole("link", {
    name: "github-repository",
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

//===========================================================================================//

//Worst way to resolve Act warnings (Last ditch effort)
// test("component shows a link for the github homepage for this repository", async () => {
//   renderComponent();

//   await act(async() => {
//     await pause();
//   })
// });

// const pause = () => new Promise(res => setTimeout(res, 1000));
