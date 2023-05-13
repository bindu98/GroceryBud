import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            item.title = name;
          }
          return item;
        })
      );
      setAlert(true, "success", "value changed");
      setEditId(null);
      setName("");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const editItem = (id) => {
    setEditId(id);
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setIsEditing(true);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id === id));
    showAlert(true, "danger", "Item removed");
  };

  const clearItems = () => {
    setList([]);
    showAlert(true, "danger", "Empty list");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List list={list} editItem={editItem} removeItem={removeItem} />
          <button type="button" onClick={clearItems}>
            clearItems
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
