import Styles from "../styles/Add.module.css";
import { useState } from "react";
import axios from "axios";

export default function Add({ setClose }) {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExraOptions] = useState([]);
  const [extra, setExtra] = useState("");
  const changePrices = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = () => {
    setExraOptions((prev) => [...prev, extra]);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dndg7j7hl/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      await axios.post('http://localhost:3000/api/products', newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <span onClick={() => setClose(true)} className={Styles.close}>
          X
        </span>
        <h1 className={Styles.title}>Add a new Pizza</h1>
        <div className={Styles.item}>
          <label className={Styles.label}>Choose an Image</label>
          <input
            type="file"
            className={Styles.input}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></input>
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Title</label>
          <input
            className={Styles.input}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Description</label>
          <textarea
            rows={4}
            className={Styles.input}
            type="text"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Prices</label>
          <div className={Styles.priceContainer}>
            <input
              className={`${Styles.input} ${Styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => {
                changePrices(e, 0);
              }}
            ></input>
            <input
              className={`${Styles.input} ${Styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => {
                changePrices(e, 1);
              }}
            ></input>
            <input
              className={`${Styles.input} ${Styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => {
                changePrices(e, 2);
              }}
            ></input>
          </div>
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Extra</label>
          <div className={Styles.extra}>
            <input
              className={`${Styles.input} ${Styles.inputSm}`}
              type="text"
              name="text"
              placeholder="Extra Item"
              onChange={(e) => handleExtraInput(e)}
            ></input>
            <input
              className={`${Styles.input} ${Styles.inputSm}`}
              type="number"
              name="price"
              placeholder="Price"
              onChange={(e) => handleExtraInput(e)}
            ></input>
            <button className={Styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={Styles.extraItems}>
            {extraOptions.map((option) => (
              <span className={Styles.extraItem} key={option.text}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={Styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}
