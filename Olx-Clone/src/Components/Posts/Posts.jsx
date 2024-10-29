import React, {useEffect, useContext, useState} from 'react';
import MinImg from '../../../assets/images/Min.jpg'
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { getFirestore,collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const db = getFirestore();
    const navigate = useNavigate();
    const { setPostDetails } = useContext(PostContext);
  
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true); 
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const allPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProducts(allPosts);
        } catch (error) {
          console.error('Error fetching products:', error);
          alert('Failed to fetch products. Please try again later.'); 
        } finally {
          setLoading(false); 
        }
      };
  
      fetchProducts();
    }, []); 
  
    return (
      <div className="postParentDiv">
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <span>View more</span>
          </div>
          <div className="cards">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => {
                    setPostDetails(product);
                    navigate(`/view?id=${product.id}`);
                  }}
                >
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="recommendations">
          <div className="heading">
            <span>Fresh recommendations</span>
          </div>
          <div className="cards">
            <div className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={MinImg} alt="Yamaha R15V3" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; 250000</p>
                <span className="kilometer">Four Wheeler</span>
                <p className="name">mini</p>
              </div>
              <div className="date">
                <span>10/5/2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Posts; 