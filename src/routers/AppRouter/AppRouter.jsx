import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes} from "../rotes"


const AppRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route, i) =>
        <Route key={i}
               path={route.path}
               element={route.component}
               exact={route.exact} />
      )}
    </Routes>
  )
};

export default AppRouter;