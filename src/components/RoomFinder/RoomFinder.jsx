import { useState } from "react";

import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import "./RoomFinder.css";
import Button from "../Button/Button";
import InfoTile from "../InfoTile/InfoTile";
import { meetingQuery } from "../../Query/query.js";
import { formatDate } from "../../util/util.js";

const addMeeting = gql`
  mutation ($date: String!, $start: String!, $end: String!) {
    Meeting(
      id: 1
      title: "Booked for interview"
      date: $date
      startTime: $start
      endTime: $end
      meetingRoomId: 1
    ) {
      id
      title
    }
  }
`;

function RoomFinder({ formData }) {
  const { date, start, end } = formData;

  const [scheduled, setScheduled] = useState(false);

  const { loading, error, data } = useQuery(meetingQuery);

  const [addMeet] = useMutation(addMeeting, {
    variables: { date, start, end },
    refetchQueries: [],
    context: {
      headers: {
        token: "abhisid050195",
      },
    },
    onCompleted: function () {
      setScheduled(true);
    },
  });

  if (addMeet.error) return <p>Error scheduling meeting</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Unable to get results</p>;

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

  const checkIfOverlaps = (userInput, meetingsOfDay, data) => {
    if (meetingsOfDay.length === 0) {
      const availableRooms = [];
      data.MeetingRooms.forEach((item) => {
        availableRooms.push({ room: item });
      });
      return availableRooms;
    } else {
      const availableRooms = meetingsOfDay.filter((val) => {
        return (
          userInput.endTime <= val.startTime ||
          userInput.startTime >= val.endTime
        );
      });

      return availableRooms;
    }
  };

  const availableRooms = checkIfOverlaps(
    { startTime: formData.start, endTime: formData.end },
    meetingsOfDay,
    data
  );

  const handleOnChange = (event) => {
    console.log(event);
  };

  return (
    <div className="app__room">
      {scheduled ? (
        <>
          <h4>Your meeting is scheduled!</h4>
          <Link to="/">
            <Button action="new meeting"></Button>
          </Link>
        </>
      ) : !availableRooms.length ? (
        <>
          <h2>No Room Available</h2>
          <Link to="/">
            <Button action="try again" />
          </Link>
        </>
      ) : (
        <div>
          <h2>Please select one of the rooms</h2>
          <div
            className="available-rooms"
            onChange={(event) => handleOnChange(event)}
          >
            {availableRooms.map((item, index) => (
              <div key={index}>
                <input
                  id={item.room.name}
                  type="radio"
                  name="available-room"
                  value={item.room.name}
                />
                <label htmlFor={item.room.name}>
                  <InfoTile
                    title={item.room.name}
                    building={item.room.building.name}
                    room={item.room.floor}
                  />
                </label>
              </div>
            ))}
          </div>
          <div onClick={addMeet}>
            <Button action="schedule" />
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomFinder;
