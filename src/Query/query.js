import { gql } from "@apollo/client";

const buildingQuery = gql`
  {
    Buildings {
      name
      meetingRooms {
        name
        meetings {
          title
        }
      }
    }
  }
`;

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

export { buildingQuery, meetingQuery };
