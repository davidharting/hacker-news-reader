import React from "react";
import { useDispatch } from "react-redux";
import styles from "./refresh.module.css";
import { refresh } from "../storiesSlice";

function Refresh() {
  const dispatch = useDispatch();
  const onClick = () => dispatch(refresh());
  return (
    <button className={styles.button} onClick={onClick}>
      Refresh and check for new items
    </button>
  );
}

export default Refresh;
