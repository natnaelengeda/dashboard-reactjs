import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import axios from "../../http/axios";
import SimpleTable from "@/tables/simple-table";
// import { useQuery } from "react-query";

export function Home() {
  const [data, setData] = useState();
  const [info, setInfo] = useState();

  useEffect(() => {
    axios
      .get("/view/recent", {
        withCredentials: true,
      })
      .then(function (response) {
        setData(response.data);
      });

    axios
      .get("/view/info", {
        withCredentials: true,
      })
      .then(function (response) {
        setInfo(response.data);
      });
  }, []);

  // function View(){
  //   const {data, status} = useQuery('info', fetchInfo);
  //   if(status === 'loading'){
  //     return <p>Loading...</p>
  //   }
  //   if(status === 'error'){
  //     return <p>Error...</p>
  //   }
  //   if(status === 'success')
  //   return data;
  // }
  async function fetchInfo() {
    const res = await axios.get("view/info");
    return res.data;
  }
  // View();
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {info &&
          info.map((item) => (
            <StatisticsCard
              key={item.id}
              label={item.label}
              title={item.item}
              value={item.amount}
              color={item.color}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong>{item.footer.label}</strong>
                </Typography>
              }
            />
          ))}
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <Typography variant="h4">Recent Assets</Typography>
          <hr className="border" />
        </div>
        <div>
          <div>{data && <SimpleTable key={data.id} data={data} />}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
