import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../pages/Home";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "discover",
        element: <h1>Discover</h1>,
      },
      {
        path: "albums",
        element: <h1>Albums</h1>,
      },
      {
        path: "artists",
        element: <h1>Artists</h1>,
      },
      {
        path: "recently-added",
        element: <h1>RecentelyAdded</h1>,
      },
      {
        path: "most-played",
        element: <h1>Most played</h1>,
      },
      {
        path: "your-favourite",
        element: <h1>Your Favourite</h1>,
      },
      {
        path: "your-playlist",
        element: <h1>Your Playlist</h1>,
      },
      {
        path: "add-playlist",
        element: <h1>Add Playlist</h1>,
      },

      {
        path: "setting",
        element: <h1>Setting</h1>,
      },
      {
        path: "logout",
        element: <h1>Logout</h1>,
      },
    ],
  },
]);
