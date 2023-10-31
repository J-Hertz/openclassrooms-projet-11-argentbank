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
      return data.body; // Utilisez data.body pour extraire les données
    } else {
      throw new Error('Failed to fetch user data');
    }
  }
);

export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async (newUserName) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: newUserName }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.body; // Utilisez data.body pour extraire les données
    } else {
      throw new Error('Failed to update username');
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
        state.user = action.payload; // Utilisez action.payload directement
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload; // Utilisez action.payload directement
      })
      .addCase(updateUserName.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectUserInfo = (state) => state.user.user;

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
