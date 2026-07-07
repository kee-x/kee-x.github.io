import { createBrowserRouter } from "react-router";
import Root from "./Root";
import PortfolioPage from "./PortfolioPage";
import ProjectDetail from "./ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: PortfolioPage },
      { path: "projects/:id", Component: ProjectDetail },
    ],
  },
]);
