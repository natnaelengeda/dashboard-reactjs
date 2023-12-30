import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export function StatisticsCard(props) {
  const checkIcon = (icon) => {
    switch (icon) {
      case 'amount':
        return <ArchiveBoxIcon className='w-10' />;
      case 'price':
        return <BanknotesIcon className='w-10' />;
      case 'admin':
        return <UserIcon className='w-10' />;
    }

  }
  return (
    <Card
    className='cardTrans'
    >
      <CardHeader
        variant="gradient"
        color={props.color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
      >
        {checkIcon(props.label)}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {props.title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {props.value}
        </Typography>
      </CardBody>
      {props.footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {props.footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
