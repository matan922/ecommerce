import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCookies } from "../../utils/cookies";
import { User } from "./userTypes";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenBody {
  refreshToken: string;
}

interface ApiResponse {
  access_token: string;
  refresh_token: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      "https://api.escuelajs.co/api/v1/auth/login",
      credentials
    );

    const { access_token, refresh_token } = response.data;

    setCookies("refreshToken", refresh_token, 3600);

    return access_token;
  }
);

export const fetchRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string) => {
    const body: RefreshTokenBody = {
      refreshToken,
    };

    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
      body
    );
    const { access_token, refresh_token } = response.data;

    setCookies("refreshToken", refresh_token, 3600);

    return access_token;
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (accessToken: string) => {
    const response: AxiosResponse<User> = await axios.get<User>(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);
