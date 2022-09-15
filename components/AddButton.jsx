import Styles from "../styles/AddButton.module.css";

export default function AddButton({ setClose }) {
  return (
    <div onClick={() => setClose(false)} className={Styles.mainAddButton}>
      Add New Pizza
    </div>
  );
}
