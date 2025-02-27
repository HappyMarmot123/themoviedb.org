import { mainType, sessionAndAccountType } from "@/assets/type/type";
import { movieService } from "@/hooks/api/movie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (obj: mainType) => {
    const response = await movieService.main(obj);
    return response.data.results;
  }
);
export const favorliteMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (obj: sessionAndAccountType) => {
    const response = await movieService.favorite_list(obj);
    return response.data.results;
  }
);

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "에러가 발생했습니다";
      });
  },
});

export default MovieSlice.reducer;
