import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../pages/Home";
import UserMainContainer from "../User/UserMainContainer";
import MyAccount from "../User/MyAccount";
import UpdatePicture from "../User/UpdatePicture";
import AddProfile from "../User/AddProfile";
import DeleteAccount from "../User/DeleteAccount";
import PrivateRoutes from "./PrivateRoutes";
import AdminContainer from "../admin/AdminContainer";
import CreateAlbum from "../admin/CreateAlbum";
import AlbumDetails from "../Albums/AlbumDetails";

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
        path: "album-details/:id",
        element: <AlbumDetails />,
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

  {
    path: "/user-profile",
    element: <UserMainContainer />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <MyAccount />
          </PrivateRoutes>
        ),
      },
      {
        path: "update-picture",
        element: (
          <PrivateRoutes>
            <UpdatePicture />
          </PrivateRoutes>
        ),
      },
      {
        path: "add-profile",
        element: (
          <PrivateRoutes>
            {" "}
            <AddProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "delete-account",
        element: (
          <PrivateRoutes>
            <DeleteAccount />
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/admin-dashboard",
    element: <AdminContainer />,
    children: [
      {
        index: true,
        element: <h1>Admin Dashboard</h1>,
      },
      {
        path: "create-album",
        element: <CreateAlbum />,
      },
    ],
  },
]);
