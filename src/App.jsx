import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchList from "./SearchComponent.jsx/SearchList";
import LazyLoading from "./Component/LazyLoading";
import Center from "./Detail/Center";
import SeriesCenter from "./SeriesDetail.jsx/SeriesCenter";
import SignUp from "./Component/SignUp";
import LogIn from "./Component/LogIn";
import RouteGuard from "./Component/RouteGuard";
import Profile from "./Component/Profile";
const LazyExploreList = React.lazy(() => import("./Explore/ExploreList"));
const LazyHome = React.lazy(() => import("./Component/HomePage"));

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<LazyLoading />}>
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route
          path="/ExploreList"
          element={
            <React.Suspense fallback={<LazyLoading />}>
              <LazyExploreList />
            </React.Suspense>
          }
        />
        <Route path="/search" element={<SearchList />} />
        <Route
          path="/detail/:id"
          element={
            <RouteGuard>
              <Center />
            </RouteGuard>
          }
        />
        <Route
          path="/detailseries/:id"
          element={
            <RouteGuard>
              <SeriesCenter />
            </RouteGuard>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />
      </Routes>
    </div>
  );
};

export default App;