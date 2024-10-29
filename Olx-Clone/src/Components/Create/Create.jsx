import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log("submitted1");
      if (!name || !category || !price || !image) {
        throw new Error("All fields are required!");
      }

      const storageRef = ref(storage, `images/${image.name}`);
      const uploadResult = await uploadBytes(storageRef, image);
      console.log("submitted2");

      const imageUrl = await getDownloadURL(uploadResult.ref);
      console.log("submitted3");
      navigate('/');
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl,
        createdAt: new Date().toISOString()
      });
      console.log("submitted4");

      alert("Product created successfully!");
      // Resetting form fields
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      navigate('/');
    } catch (error) {
      console.error("Error creating product:", error);
      alert("There was an error creating the product. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="productName">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="productName"
          name="name"
          required
        />
        <br />
        <label htmlFor="productCategory">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="productCategory"
          name="category"
          required
        />
        <br />
        <label htmlFor="productPrice">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="productPrice"
          name="price"
          required
        />
        <br />
        <br />
        {image && (
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        <br />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*" // Restrict to image files
          required
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;