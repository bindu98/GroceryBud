import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, removeItem, editItem }) => {
  return (
    <div>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <p>{title}</p>
            <button onClick={() => editItem(id)}>
              <FaEdit />
            </button>
            <button onClick={() => removeItem(id)}>
              <FaTrash />
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default List;
