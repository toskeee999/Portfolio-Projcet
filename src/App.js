import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchMovies, fetchShows, queryClient } from "./util/http";
import { QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Home-page";
import MoviesPage from "./pages/Movies-page";
import ShowsPage from "./pages/Shows-page";
import RoutsLayout from "./pages/Routs-layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionMovies } from "./store/movies";
import AuthenticationPage from "./pages/Authentication-page";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { actionUserData } from "./store/user-data";
import FavoritesPage from "./pages/Favorites-page";
import MovieDetailsPage from "./pages/Movie-details-page";
import ShowDetailsPage from "./pages/Show-details-page";
import Searched from "./components/shows-movies/Searched";
import Error from "./components/error-element/Error";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <RoutsLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movies",
        children: [
          { index: true, element: <MoviesPage /> },
          { path: ":movieId", element: <MovieDetailsPage /> },
        ],
      },
      {
        path: "shows",
        children: [
          { index: true, element: <ShowsPage /> },
          { path: ":showId", element: <ShowDetailsPage /> },
        ],
      },
      { path: "auth", element: <AuthenticationPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "search", element: <Searched /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userData.userAuth);

  useEffect(() => {
    async function fetching() {
      try {
        dispatch(actionMovies.setLoader({ boolean: true, type: "movies" }));
        const allMovies = await fetchMovies(1);
        dispatch(
          actionMovies.setItems({ allItems: allMovies, type: "movies" })
        );
      } catch (error) {
        const errorMessage = error?.message || "failed to load movies.";
        dispatch(
          actionMovies.setError({ error: errorMessage, type: "movies" })
        );
      }
      dispatch(actionMovies.setLoader({ boolean: false, type: "movies" }));
    }
    fetching();
  }, [dispatch]);

  useEffect(() => {
    async function fetching() {
      try {
        dispatch(actionMovies.setLoader({ boolean: true, type: "tv" }));
        const allShows = await fetchShows(1);
        dispatch(actionMovies.setItems({ allItems: allShows, type: "tv" }));
      } catch (error) {
        const errorMessage = error?.message || "failed to load movies.";
        dispatch(actionMovies.setError({ error: errorMessage, type: "tv" }));
      }
      dispatch(actionMovies.setLoader({ boolean: false, type: "tv" }));
    }
    fetching();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = {
          userName: currentUser.displayName,
          email: currentUser.email,
        };
        dispatch(actionUserData.setUserAuth(user));
        const stayLogedIn = localStorage.getItem("isLogedIn");
        if (stayLogedIn === "false") {
          const logoutTime = Date.now() + 1000 * 60 * 60 * 10;
          localStorage.setItem("logout-time", logoutTime);
        } else if (stayLogedIn === "true") {
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const logoutTime = localStorage.getItem("logout-time");
    const stayLogedIn = localStorage.getItem("isLogedIn");
    const logoutExpired = logoutTime - Date.now() || 0;
    let timout;
    if (logoutExpired > 0 && stayLogedIn === "false") {
      timout = setTimeout(async () => {
        await signOut(auth);
        dispatch(actionUserData.setUserAuth(null));
        localStorage.removeItem("logout-time");
      }, Number(logoutExpired));
    }
    return () => clearTimeout(timout);
  }, [dispatch, userAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
