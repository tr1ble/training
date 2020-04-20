import { Route } from "react-router-dom";
import PageNotFound from "screens/PageNotFound";

import * as screens from "screens";

interface RouteType {
  route: any;
  exact: boolean;
  path: string;
}

const authRoutes: RouteType[] = [
  { exact: true, route: screens.AuthPage, path: "/" }
];

export default authRoutes;
