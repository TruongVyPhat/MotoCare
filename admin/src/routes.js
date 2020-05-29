import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
// import Typography from "views/Typography.jsx";
// import TableList from "views/Tables.jsx";
import UserPage from "views/User.jsx";
import UserManager from "views/UserManager"
import ProducManager from "views/ProductManager"
import BrandManager from "views/BrandManager"
import CategoriesManager from "views/CategoriesManager"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/brand-manager",
    name: "Brand Manager",
    icon: "nc-icon nc-shop",
    component: BrandManager,
    layout: "/admin"
  },
  {
    path: "/categories-manager",
    name: "Categories Manager",
    icon: "nc-icon nc-tile-56",
    component: CategoriesManager,
    layout: "/admin"
  },
  {
    path: "/product-manager",
    name: "Product Manager",
    icon: "nc-icon nc-cart-simple",
    component: ProducManager,
    layout: "/admin"
  },
  {
    path: "/user-manager",
    name: "User Manager",
    icon: "nc-icon nc-circle-10",
    component: UserManager,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // }
];
export default routes;
