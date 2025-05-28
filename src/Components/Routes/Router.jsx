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
import Discover from "../pages/Discover";
import TopAlbums from "../Albums/TopAlbums";
import PopularArtist from "../Albums/PopularArtist";
import YourFavourite from "../pages/YourFavourites";

import YourPlayLists from "../pages/YourPlayLists";
import AddPlayLists from "../pages/AddPlayLists";
import PlaylistSongsPage from "../pages/PlaylistSongsPage";

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
        element: <Discover />,
      },
      {
        path: "albums",
        element: <TopAlbums />,
      },
      {
        path: "artists",
        element: <PopularArtist />,
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
        element: <YourFavourite />,
      },
      {
        path: "your-playlist",
        element: <YourPlayLists />,
      },
      {
        path: "add-playlist",
        element: <AddPlayLists />,
      },
      {
        path: "playlist-songs",
        element: <PlaylistSongsPage />,
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
