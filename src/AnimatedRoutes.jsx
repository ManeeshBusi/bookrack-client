import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ItemList from "./pages/ItemList/ItemList";
import ItemSearch from "./pages/ItemSearch/ItemSearch";
import ItemEdit from "./pages/ItemEdit/ItemEdit";
import ItemMain from "./pages/ItemMain/ItemMain";
import Home from "./pages/Home/Home";

export default function AnimatedRoutes({ user, setTitle }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/login"
          element={!user ? <Login setTitle={setTitle} /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/register"
          element={
            !user ? <Register setTitle={setTitle} /> : <Navigate to="/" />
          }
        />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home setTitle={setTitle} />} />
          <Route path="/:item" element={<ItemMain setTitle={setTitle} />} />

          <Route
            path="/list/:item/:type"
            element={<ItemList setTitle={setTitle} />}
          />
          <Route
            path="/:back/:type/:item/:id"
            element={<ItemEdit setTitle={setTitle} />}
          />
          <Route
            path="/:item/search"
            element={<ItemSearch setTitle={setTitle} />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
