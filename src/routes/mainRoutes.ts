import { Route } from 'react-router-dom';

import * as screens from 'screens';

interface RouteType {
  route: any;
  exact: boolean;
  path: string;
}

const mainRoutes: RouteType[] = [
  { exact: true, route: screens.ProfilePage, path: "/" },
  { exact: true, route: screens.StudentPage, path: "/student" }
];

export default mainRoutes;
