import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [groups, setGroups] = useState("");
  const [group, setGroup] = useState("");

  const [groupName, setGroupName] = useState("");
  const [emails, setEmails] = useState("");

  const [user, setUser] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  useEffect(() => {
    setUser(window.electron.readUser());
    setGroups(window.electron.readGroups());
  }, [group]);

  return (
    <div className="App">
      <div className="row">
        <h1 style={{ color: "black", backgroundColor: "white" }}>
          PMM{" "}
          <span style={{ color: "green" }}>
            Mailing List {console.log(user)}
          </span>
        </h1>
      </div>

      <div className="row">
        <div style={{ border: "black solid" }} className="col-md-4 px-5">
          <div className="mb-3">
            <label className="form-label">Server adress</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email :</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          <button
            onClick={() => {
              window.electron.insertUser({
                type: "user",
                host: "smtp.gmail.com",
                sendermail: "tsantaniainarakotonjanahary@gmail.com",
                senderpassword: "snwcidailduftksy",
              });
            }}
          >
            list
          </button>
        </div>
        <div style={{ border: "black solid" }} className="col-md-8 p-5 ">
          <div className="mb-3">
            <label className="form-label">to</label>
            <select className="form-select">
              <option value="1">PMM</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="subject of your mail"
              name="subject"
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
            ></textarea>
          </div>

          <button
            onClick={() => {
              window.electron.sendMail(
                "smtp.gmail.com",
                "tsantaniainarakotonjanahary@gmail.com",
                "snwcidailduftksy",
                "rakotonjanaharydiary@gmail.com,kokorikobonjour@gmail.com,",
                "Bonjour",
                "<h1>Faly miarahaba anao izahay</h1>  welcome "
              );
            }}
          >
            go
          </button>
        </div>
      </div>
      <div className="row ">
        <div style={{ border: "black solid" }} className="col-md-12 p-5 ">
          <div className="row">
            <div className="col-md-4 ">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Group Name"
                name="groupName"
                value={groupName}
                onChange={handleGroupNameChange}
              />
            </div>
            <div className="col-md-4 ">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Mailing List comma separated"
                name="emails"
                value={emails}
                onChange={handleEmailsChange}
              />
            </div>
            <div className="col-md-4">
              <button
                onClick={() => {
                  window.electron.insertGroup({
                    type: "group",
                    groupName: "group1",
                    emails: [
                      "rakotonjanaharydiary@gmail.com",
                      "kokorikobonjour@gmail.com",
                    ],
                  });
                  setGroup({
                    type: "group",
                    groupName: "group1",
                    emails: [
                      "rakotonjanaharydiary@gmail.com",
                      "kokorikobonjour@gmail.com",
                    ],
                  });
                }}
              >
                list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
