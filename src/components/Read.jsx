import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);
  const [tableDark, setTableDark] = useState("");
  const [inputText, setInputText] = useState("");

  const getAllData = () => {
    axios
      .get("https://6304eb33697408f7edbe2be4.mockapi.io/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://6304eb33697408f7edbe2be4.mockapi.io/users/${id}`)
      .then(() => {
        getAllData();
      });
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  return (
    <>
      <h2>Read</h2>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          style={{ display: "flex" }}
          onClick={() => {
            if (tableDark === "table-dark") {
              setTableDark("");
            } else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="mb-3">
        <input
          type="search"
          name="search"
          placeholder="type name or email"
          className="form-control"
          value={inputText}
          onChange={inputHandler}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <Link to="/">
          <button type="button" className="btn btn-secondary">
            Add New
          </button>
        </Link>
      </div>
      {err && <h3>{err}</h3>}
      <table className={`table ${tableDark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {data
          // .filter((el) => {
          //   if (el === "") {
          //     return el;
          //   } else {
          //     return el.name.toLowerCase().includes(inputText);
          //   }
          // })
          .map((eachData) => {
            const { id, name, email } = eachData;
            return (
              <>
                <tbody>
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                      <Link to="/update">
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          onClick={() => setToLocalStorage(id, name, email)}
                        >
                          Update
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Read;
