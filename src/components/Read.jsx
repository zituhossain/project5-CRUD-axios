import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const Read = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);

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

  return (
    <div>
      <h2>Read Operation</h2>
      {err && <h3>{err}</h3>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>

        {data.map((eachData) => {
          const { id, name, email } = eachData;
          return (
            <>
              <tbody>
                <tr>
                  <th key={id} scope="row">
                    {id}
                  </th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <button type="button" className="btn btn-secondary">
                      Add
                    </button>
                  </td>
                  <td>
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
    </div>
  );
};

export default Read;
