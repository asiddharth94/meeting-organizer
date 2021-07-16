import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import "./Home.css";
import Button from "../Button/Button";
import InfoTile from "../InfoTile/InfoTile";

const buildingQuery = gql`
  {
    Buildings {
      name
      meetingRooms {
        name
        meetings {
          title
          date
          startTime
          endTime
        }
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(buildingQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let roomsCount = 0;
  let meetingsCount = 0;

  const getTotalRooms = (data) => {
    data.Buildings.forEach((item) => {
      roomsCount += item.meetingRooms.length;
    });
  };

  const getTotalMeetings = (data) => {
    data.Buildings.forEach((item) => {
      item.meetingRooms.forEach((i) => {
        meetingsCount += i.meetings.length;
      });
    });
  };

  getTotalRooms(data);
  getTotalMeetings(data);
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
