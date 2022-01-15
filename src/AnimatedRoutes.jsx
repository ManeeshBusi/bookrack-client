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

export default function AnimatedRoutes({ user }) {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/:item" element={<ItemMain />} />

          <Route path="/list/:item/:type" element={<ItemList />} />
          <Route path="/:back/:type/:item/:id" element={<ItemEdit />} />
          <Route path="/:item/search" element={<ItemSearch />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
