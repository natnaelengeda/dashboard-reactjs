import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
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
} from "@material-tailwind/react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import axios from "../../http/axios";
import SimpleTable from "@/tables/simple-table";
import BasicTable from "@/tables/basic-table";

function Inventory() {
  const [printed, setPrinted] = useState();
  const [unprinted, setUnprinted] = useState();
  useEffect(() => {
    axios
      .get("/print/printed", {
        withCredentials: true,
      })
      .then(function (response) {
        setPrinted(response.data);
      });

    axios
      .get("/print/unprinted", {
        withCredentials: true,
      })
      .then(function (response) {
        setUnprinted(response.data);
      });
  }, []);
  return (
    <div className="flex min-h-screen flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Typography variant="h4" color="blue">
          Inventory
        </Typography>
        <hr className="border  border-red-800 text-blue-700" />
      </div>
      <div className="flex flex-col gap-1">
        <h1>
          <span className="text-xl font-semibold text-blue-400">Counted </span>-{" "}
          {printed && printed.length}
        </h1>
        <h1>
          <span className="text-xl font-semibold text-red-400">Uncounted </span>
          - {unprinted && unprinted.length}
        </h1>
      </div>
      <div>
        <Card>
          <CardBody>
            <Tabs value="counted">
              <TabsHeader className="">
                <Tab value="counted">
                  <ClipboardDocumentCheckIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Counted
                </Tab>
                <Tab value="uncounted">
                  <ClipboardDocumentIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Uncounted
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="counted">
                  <div>{printed && <BasicTable data={printed} />}</div>
                </TabPanel>
                <TabPanel value="uncounted">
                  <div>{unprinted && <BasicTable data={unprinted} />}</div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Inventory;
