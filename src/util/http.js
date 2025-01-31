import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const API_KEY = "4ca04bcf9461fc60732a89d4f61627c6";

export async function fetchMovies(page, genre) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`;
  if (genre) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load movies. Please try again.");
  }

  const { results } = await response.json();

  return results;
}

export async function fetchShows(page, genre) {
  let url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`;
  if (genre) {
    url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load Tv-Shows. Please try again.");
  }

  const data = await response.json();

  return data.results;
}

export async function fetchItem(id, movie) {
  let type = "tv";
  if (movie) {
    type = "movie";
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to load movies/TV shows. Please try again.");
  }

  const data = await response.json();

  return data;
}

export async function fetchCast({ signal, id, type }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`,
    { signal: signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cast");
  }

  const data = await response.json();
  return data;
}

export async function fetchDetails({ signal, type, id }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`,
    { signal: signal }
  );

  if (!response.ok) {
    throw new Error("Failed to load details. Please try again.");
  }

  const data = await response.json();
  return data;
}

export async function fetchSearchedMovies({ signal, query }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`,
    { signal: signal }
  );

  if (!response.ok) {
    throw new Error("Failed to load search results. Please try again.");
  }

  const { results } = await response.json();

  return results;
}
