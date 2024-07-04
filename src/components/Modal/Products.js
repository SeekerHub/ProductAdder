
import React, { useEffect, useState } from 'react';
import './ProductModal.css'; // Import your CSS file for styling
// import { mockData } from '../../data';
import { apiCaller } from '../../apiCaller';
import Loader from '../Loader';
 
const Product = ({ products, onClose, handleUpdate }) => {
  const [mockData, setMockData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selected, setSelected] = useState({});
  const [query, setQuery] = useState("");
  // const [itemsSelectedQty, setItemsSelectedQty] = useState(0);
  const [loading, setLoading] = useState(false)
 
  const handleSelect = (product, variant) => {
 
    const productKey = `${product.id} - ${variant.id}`;
    setSelectedProducts(prev => ({
      ...prev,
      [productKey]: !prev[productKey],
    }));
  };
 
  const getSearchResult = (q) => {
    // console.log("args = ", q);
    setLoading(true);
    apiCaller(q)
      .then((response) => {
          if (response) {
            setMockData(response.data)
            setLoading(false)
            return response.data
          } else {
              console.error(response);
          }
      })
    .catch((error) => {
        console.error(error);
    });
  }
  const renderVariants = (product) => {
    return product.variants.map((variant, idx) => {
      const productKey = `${product.id} - ${variant.id}`;
      return (
        <div className="product-row-modal" key={idx}>
          <div className='checksec'>
            <input
                type="checkbox"
                checked={!!selectedProducts[productKey]}
                onChange={() => handleSelect(product, variant)}
            />
          </div>
          <div className='sub-product-details'>
            <span>{`${variant.title}`}</span>
            <span>{`${variant.inventory_quantity} available`}</span>
            <span>{`$${variant.price}`}</span>
          </div>
        </div>
      );
    });
  };
 
  function debounce(func, delay) {
    let timerId;
    return function(...args) {
      console.log("timerid = ",timerId)
      if (timerId) clearTimeout(timerId)
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
 
 
  const data_format = (data) => {
    // const k = {
    //   "6805249130703 - 40499644629199": true,
    //   "6805248770255 - 40499643351247": true,
    //   "6805248770255 - 404996439051247": true
    // }
 
    let mp = {};
    data.forEach(e => {
        let arr = e.split("-");
        let ke = arr[0].trim(); let val = arr[1].trim();
        if(ke in mp){
          mp[ke].push(val)
        }else{
          mp[ke] = [];
          mp[ke].push(val);
        }
     }
    )
    let dtObj = [];
    Object.keys(mp).forEach((e, ind )=> {
      mockData.forEach(dt => {
          if(dt.id==Number(e)){
            let pobj = {
              "product" : dt.title,
              "discount" : 20,
              "showVariants" : false,
              "reorder" : false,
              "variants" : []
            }
            dtObj.push(pobj)
          }
          mp[e].forEach(el => {
            dt.variants.forEach(d => {
              if(d.id==el){
                let ob = {
                  "title" : d.title
                }
                dtObj[ind]["variants"].push(ob);
 
              }
            })
          })
      })
 
    })
 
    return dtObj;
  }
  const handleAdd = () => {
    const selected = Object.keys(selectedProducts).filter(key => selectedProducts[key]);
    const sent_data = data_format(selected);
    handleUpdate(sent_data)
 
    console.log("Selected Products: ", selected);
    onClose();
  };
  const advanceSearch = debounce(getSearchResult, 3000);
  const handleSearchChange = (e) => {
    setQuery(e.target.value)
 
    // console.log('searched query', e.target.value)
    advanceSearch(e.target.value);
  }
  // debugger;
  // console.log(selectedProducts);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal">
        <div className="modal-content">
          <h2>Select Products</h2>
          <input type="text" placeholder="Search product" className="search-bar" value = {query} onChange={handleSearchChange}/>
          <div className={"product-list" +  (loading ? " loaderStyle" : "")}>
            {loading ? <Loader /> : null}
            {!loading && mockData.map((product, index) => (
              <div key={index} className='products'>
                <div className="product-header">
                  <input
                    type="checkbox"
                  //   class='chk'
                    checked={product.variants.every(variant => selectedProducts[`${product.id} - ${variant.id}`])}
                    onChange={() => {
                      const allSelected = product.variants.every(variant => selectedProducts[`${product.id} - ${variant.id}`]);
                      setSelectedProducts(prev => {
                        const newSelections = { ...prev };
                        product.variants.forEach(variant => {
                          const productKey = `${product.id} - ${variant.id}`;
                          if (allSelected) {
                            delete newSelections[productKey];
                          } else {
                            newSelections[productKey] = true;
                          }
                        });
                        return newSelections;
                      });
                    }}
                  />
                  <img src={product.image["src"]} alt={product.title?"":""} className="product-image" />
                  <span>{product.title}</span>
                </div>
                {renderVariants(product)}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <div className='selected-items'>{Object.keys(selectedProducts).length} Items Selected</div>
            <div className='btn-footer'>
              <button onClick={onClose}>Cancel</button>
              <button className="add-btn" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
 
  );
};
 
export default Product;