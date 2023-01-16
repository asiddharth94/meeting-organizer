import { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MeetingScheduler from "./components/MeetingScheduler/MeetingScheduler";
import RoomFinder from "./components/RoomFinder/RoomFinder";

const client = new ApolloClient({
  uri: "http://smart-meeting.herokuapp.com",
  cache: new InMemoryCache(),
});

function App() {
  const [formData, setFormData] = useState("");

  const handleFormData = (data) => {
    setFormData(data);
  };

  return (
    // <ApolloProvider client={client}>
    //   <Router>
    //     <div className="app">
    //       <Header />
    //       <Switch>
    //         <Route path="/meetings">
    //           <MeetingScheduler handleFormData={handleFormData} />
    //         </Route>
    //         <Route path="/rooms">
    //           <RoomFinder formData={formData} />
    //         </Route>
    //         <Route path="/">
    //           <Home />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </Router>
    // </ApolloProvider>
    <h1>Hello Dimpi!!!!!</h1>
  );
}

export default App;
