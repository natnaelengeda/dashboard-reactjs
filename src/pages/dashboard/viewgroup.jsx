import React, { useState, useEffect } from "react";
import axios from "../../http/axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

import AssetGroup from "@/widgets/cards/asset-group-card";
import AssetLocation from "@/widgets/cards/asset-location-card";
import { Link } from "react-router-dom";
export default function ViewGroup() {
  const [group, setGroup] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    axios
      .get("/assetgroup", {
        withCredentials: true,
      })
      .then(function (response) {
        setGroup(response.data);
      });

    axios
      .get("/assetlocation", {
        withCredentials: true,
      })
      .then(function (response) {
        setLocation(response.data);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-5">
      {/* Catagories Section */}
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 text-3xl">
          <h1 className="text-4xl font-bold text-blue-700">Catagories</h1>
          <hr className="w-1/3 border  border-red-800 text-blue-700" />
        </div>
        <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {group &&
            group.map((item) => (
              <Link key={item.id} to={`/dashboard/viewgroup/cat/${item.name}`}>
                <AssetGroup label={item.label} name={item.name} />
              </Link>
            ))}
        </div>
      </section>

      {/* Room Section */}
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 text-3xl">
          <h1 className="text-4xl font-bold text-blue-700">Room</h1>
          <hr className="w-1/3 border  border-red-800 text-blue-700" />
        </div>
        <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
          {location &&
            location.map((item) => (
              <Link key={item.id} to={`/dashboard/viewgroup/room/${item.name}`}>
                <AssetLocation label={item.label} name={item.name} />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
