import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./Home.css";
import Button from "../Button/Button";
import InfoTile from "../InfoTile/InfoTile";
import { buildingQuery } from "../../Query/query.js";

function Home() {
  const { loading, error, data } = useQuery(buildingQuery, {
    context: {
      headers: {
        token: "abhisid050195",
      },
    },
  });

  if (loading) return <div className="loading"></div>;
  if (error) return <p>Unable to fetch data</p>;

  let roomsCount = 0;
  let meetingsCount = 0;

  const getTotalRooms = (data) => {
    data.Buildings.forEach((item) => {
      roomsCount += item.meetingRooms.length;
    });
  };

  // const getFormattedCurrentDate = () => {
  //   const date = new Date();
  //   const currDate = date.getDate();
  //   const formattedCurrDate = currDate < 9 ? `0${currDate}` : currDate;
  //   const currMonth = date.getMonth();
  //   const formattedCurrMonth =
  //     currMonth < 8 ? `0${currMonth + 1}` : currMonth + 1;
  //   const currYear = date.getFullYear();
  //   return `${formattedCurrDate}/${formattedCurrMonth}/${currYear}`;
  // };

  const getTotalMeetingsOfTheDay = (data) => {
    // const currentDate = getFormattedCurrentDate();
    data.Buildings.forEach((item) => {
      item.meetingRooms.forEach((i) => {
        meetingsCount += i.meetings.length;
      });
    });
  };

  getTotalRooms(data);
  getTotalMeetingsOfTheDay(data);
  return (
    <div className="app__home">
      <InfoTile title="Buildings" numbers={data.Buildings.length} />

      <InfoTile title="Rooms" numbers={roomsCount} />

      <InfoTile title="Meetings" numbers={meetingsCount} />

      <Link to="/meetings">
        <Button action="next" />
      </Link>
    </div>
  );
}

export default Home;
