import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import { FaPencil, FaTrash, FaCircleCheck, FaX } from "react-icons/fa6";
import { datas } from "./redux/reducers/tables";

function Tables() {
  async function newData() {
    try {
      const respons = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!respons.ok) {
        throw new Error(`response status ${respons.status}`);
      }
      const json = await respons.json();
      json.forEach((items) =>
        dispatch(
          datas({
            name: items.name,
            email: items.email,
          })
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  const dispatch = useDispatch(); //lagnkah ke 3
  const dataUpdate = useSelector((state) => state.tables.forms); // langkah ke 1
  const [edits, setEdits] = React.useState(true);
  function update(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    dispatch(datas({ name, email }));
    e.currentTarget.reset();
    if (edits === true) {
      setEdits(false);
    } else {
      setEdits(true);
    }
  }
  function edit() {
    if (edits === true) {
      setEdits(false);
    } else {
      setEdits(true);
    }
  }
  const [remove, setRemove] = React.useState(true);
  function deletes() {
    if (remove === true) {
      setRemove(false);
    } else {
      setRemove(true);
    }
  }
  return (
    <div className="">
      <table className="w-full relative border border-black">
        <thead className="border border-black">
          <tr className="border border-black">
            <td className="border border-black">Name</td>
            <td className="border border-black">Email</td>
            <td className="border border-black">Edit</td>
            <td className="border border-black">Delete</td>
          </tr>
        </thead>
        <tbody>
          {dataUpdate.map((x) => {
            // langkah ke 2
            return (
              <tr>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td className="">
                  <button type="button" onClick={edit} className="text-black">
                    <FaPencil />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={deletes}
                    className="text-black"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>habib</td>
            <td>habib@mail.com</td>
            <td className="">
              <button type="button" onClick={edit} className="text-black">
                <FaPencil />
              </button>
            </td>
            <td>
              <button type="button" onClick={deletes} className="text-black">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="bg-[#3572ef]">
        <button type="button" onClick={newData}>
          Update Data
        </button>
      </div>
      <div
        className={
          edits
            ? "hidden"
            : "flex justify-center items-center h-screen w-full bg-black/25 absolute top-0"
        }
      >
        <form
          onSubmit={update}
          className="flex flex-col gap-4 bg-[#b6895b] p-14 rounded-3xl"
        >
          <div className="">
            <label htmlFor="name">Name</label>
            <div className="">
              <input
                type="text"
                name="name"
                id="name"
                className="border-2 h-12 w-72 p-6 rounded-xl"
                placeholder="Habib Muhammad Rizki"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="name">Email</label>
            <div className="">
              <input
                type="text"
                name="email"
                id="email"
                className="border-2 outline-none h-12 w-72 p-6 rounded-xl "
                placeholder="habib@mail.com"
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="drop-shadow h-12 w-72 bg-[#ACE1AF] rounded-xl"
            >
              save
            </button>
          </div>
        </form>
      </div>
      <div
        className={
          remove
            ? "hidden"
            : "flex w-full h-screen items-center justify-center bg-black/25 absolute top-0"
        }
      >
        <div className="flex justify-center items-center flex-col gap-10 p-14 rounded-xl bg-[#b6895b]">
          <div className="">Are you sure deleted this data?</div>
          <div className=" flex gap-6">
            <button type="button" className="">
              <FaCircleCheck />
            </button>
            <button type="button" className="">
              <FaX />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <Tables />
    </Provider>
  );
}

export default App;
