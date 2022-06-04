export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAV = 'ADD_FAV';
export const REM_FAV = 'REM_FAV';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user: user?.Username
  };
}

export function addFav(value) {
  return {
    type: ADD_FAV,
    value
  };
}

export function remFav(value) {
  return {
    type: REM_FAV,
    value
  };
}
