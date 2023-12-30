import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "green",
    icon: ArchiveBoxIcon,
    title: "Total Assets",
    value: "480",
    footer: {
      color: "text-red-500",
      value: "",
      label: "Total",
    },
  },
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Asset Price",
    value: "1000 Birr",
    footer: {
      color: "text-green-500",
      value: "",
      label: "Birr",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Total Admins",
    value: "13",
    footer: {
      color: "text-green-500",
      value: "",
      label: "Individual",
    },
  },
];

export default statisticsCardsData;
