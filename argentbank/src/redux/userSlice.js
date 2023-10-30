import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour récupérer les informations de l'utilisateur
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      token: '',
    },
    isLoggedIn: false,
    isLoading: false,
    isError: false,
  },
  reducers: {
    signOut: (state) => {
      state.user = {
        id: '',
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        token: '',
      };
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = {
          id: action.payload.body.id,
          email: action.payload.body.email,
          userName: action.payload.body.userName,
          firstName: action.payload.body.firstName,
          lastName: action.payload.body.lastName,
          token: action.payload.token,
        };
        state.isLoggedIn = true;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectUserInfo = (state) => state.user.user;

export const { signOut } = userSlice.actions; // Exportez l'action de déconnexion

export default userSlice.reducer;
