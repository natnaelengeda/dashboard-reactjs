import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  RectangleStackIcon,
  Square2StackIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  View,
  Profile,
  Tables,
  Notifications,
  SignUpNew,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { MView } from "@/pages/mview";
import {
  NoteOutlined,
  RecordVoiceOverRounded,
  SquareRounded,
} from "@mui/icons-material";
import ViewGroup from "./pages/dashboard/viewgroup";
import ViewRoom from "./pages/views/roompage";
import ViewCat from "./pages/views/catpage";
import Add from "./pages/dashboard/add";
import Inventory from "./pages/dashboard/inventory";
import Record from "./pages/dashboard/record";
import Individuals from "./pages/dashboard/individual";

const icon = {
  className: "w-5 h-5 text-inherit",
};
// const state = useContext(LoginContext);
const decoded = JSON.parse(localStorage.getItem("decoded"));
const log = localStorage.getItem("log");

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
        available: ["SA", "TL", "S", "A", "BM"],
      },
      {
        icon: <PlusIcon {...icon} />,
        name: "add",
        path: "/add",
        element: <Add />,
        available: ["SA", "S", "A"],
      },
      {
        icon: <Square2StackIcon {...icon} />,
        name: "view",
        path: "/view",
        element: <View />,
        available: ["SA", "TL", "S", "A", "BM"],
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Inventory",
        path: "/inventory",
        element: <Inventory />,
        available: ["SA", "S", "A"],
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "view - group",
        path: "/viewgroup",
        element: <ViewGroup />,
        available: ["SA", "TL", "S", "A", "BM"],
        inpages: [
          {
            name: "view - catagory",
            path: "/viewgroup/cat/:id",
            element: <ViewCat />,
            available: ["SA", "TL", "S", "A", "BM"],
          },
          {
            name: "view - room",
            path: "/viewgroup/room/:id",
            element: <ViewRoom />,
            available: ["SA", "TL", "S", "A", "BM"],
          },
        ],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        available: ["SA", "TL", "S", "A", "BM"],
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "individual",
        path: "/individual",
        element: <Individuals />,
        available: ["SA", "TL", "S", "A", "BM"],
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
        available: ["SA", "TL", "S", "A", "BM"],
      },
      {
        icon: <NoteOutlined {...icon} />,
        name: "records",
        path: "/record",
        element: <Record />,
        available: ["SA", "TL", "S", "BM"],
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up-new",
        element: <SignUpNew />,
        available: ["SA", "TL"],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        available: [""],
      },
    ],
  },
  {
    title: "mview",
    layout: "mviews",
    pages: [
      {
        name: "View Scaned Rooms",
        path: "/mview",
        element: <MView />,
      },
    ],
  },
];

export default routes;
