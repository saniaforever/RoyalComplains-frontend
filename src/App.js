import "@mui/material";
import "react-icons";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";

import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";

import { useEffect } from "react";
import { BASE_URL } from "./config";
import { io } from "socket.io-client";

// Initialize WebSocket Connection to Backend
const socket = io(BASE_URL, { transports: ["websocket"] });

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔗 Connected to WebSocket Server");
    });

    return () => {
      socket.disconnect();
      console.log("❌ Disconnected from WebSocket Server");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
