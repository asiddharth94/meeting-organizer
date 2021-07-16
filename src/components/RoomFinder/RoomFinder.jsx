import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import "./RoomFinder.css";
import Button from "../Button/Button";
import InfoTile from "../InfoTile/InfoTile";

const meetingQuery = gql`
  {
    MeetingRooms {
      name
      floor
      building {
        name
      }
      meetings {
        title
        date
        startTime
        endTime
      }
    }
  }
`;

function RoomFinder({ formData }) {
  const { loading, error, data } = useQuery(meetingQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Unable to get results</p>;

  const formatDate = (date) => {
    const dateArray = date.split("-");
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  };

  const formattedDate = formatDate(formData.date);

  const getMeetingsOfDay = (data, formattedDate) => {
    let meetingsOfDay = [];
    data.MeetingRooms.forEach((mr) => {
      mr.meetings.forEach((meet) => {
        if (meet.date === formattedDate) {
          meetingsOfDay.push({
            startTime: meet.startTime,
            endTime: meet.endTime,
            room: mr,
          });
        }
      });
    });
    return meetingsOfDay;
  };

  const meetingsOfDay = getMeetingsOfDay(data, formattedDate);

  const checkIfOverlaps = (userInput, value) => {
    const availableSlot = value.filter((val) => {
      return (
        userInput.endTime <= val.startTime || userInput.startTime >= val.endTime
      );
    });

    return availableSlot;
  };

  const availableRooms = checkIfOverlaps(
    { startTime: formData.start, endTime: formData.end },
    meetingsOfDay
  );

  return (
    <div className="app__room">
      {!availableRooms.length ? (
        <>
          <h2>No Room Available</h2>
          <Link to="/">
            <Button action="try again" />
          </Link>
        </>
      ) : (
        <div>
          <h2>Please select one of the rooms</h2>
          {availableRooms.map((item) => (
            <InfoTile
              key={item.room.name}
              title={item.room.name}
              building={item.room.building.name}
              room={item.room.floor}
            />
          ))}
          <Button action="schedule" />
        </div>
      )}
    </div>
  );
}

export default RoomFinder;
