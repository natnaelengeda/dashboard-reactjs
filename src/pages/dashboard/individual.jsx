import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import axios from "../../http/axios";

export default function Individuals() {
  const [data, setdata] = useState();

  useEffect(() => {
    axios
      .get("/individual/getAll", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data[0]);
        setdata(response.data[0]);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Typography variant="h4" color="blue">
          Individuals
        </Typography>
        <hr className="border  border-red-800 text-blue-700" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-20 w-full "></div>
        <div>
          {data && data.map((items) => <div key={items.entrusted_id}></div>)}
        </div>
      </div>
    </div>
  );
}
