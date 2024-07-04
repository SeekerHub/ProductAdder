import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Items.css';
import { MdDragIndicator } from "react-icons/md";
 
 
const ProductRow = ({provided, element, product, discount, index, handleModal, onToggleVariants, showVariants, onEnableReorder, handleRemoveData }) => {
 
  const [discountt, setDiscount] = useState(true);
 
  return (
    <>
    <div className="product-row">
      <div className="product-main">
          <i {...provided.dragHandleProps} className='drag-btn'><MdDragIndicator /></i>
          <span>{index + 1}.</span>
          <input type="text" value={product} class="icon-input" onChange={handleModal} />
          <div style={{width : "50%"}}>
            {discountt ? 
                <button style={{width : "55%"}} onClick={() => setDiscount(false)}>Add Discount</button> :
                <>
                  <input style={{width : "20%"}} type="number" value={discount} />
                  <select style={{width : "35%", height: "35px"}}>
                    <option>% Off</option>
                    <option>Flat</option>
                  </select>
                </>
            }
            <span className="delete-btn" onClick={() => handleRemoveData(index)}>X</span>
          </div>
 
      </div>
      <div className='variant-div'>
        <div className='text-variant' onClick={onToggleVariants}>{showVariants ? 'Hide variants' : 'Show variants'}</div>
      </div>
      {showVariants && (
        <div className="variants">
          {element.variants.map((subProd, index) => {
            return (
 
              <div className="product-main">
 
                <span>{index + 1}.</span>
                <input type="text" value={subProd.title} readOnly />
                <span className="delete-btn-sub">X</span>
              </div>
            )
            })
          }
 
        </div>
      )}
    </div>
    <div style={{width: "75%", marginLeft : "34px"}}><hr/></div>
    </>
)
};
 
const InitialItem = ({handleModal}) => {
  return (
    <>
        <div className='product-main item-adder' >
          <i style={{visibility : "hidden"}} className='drag-btn'><MdDragIndicator /></i>
          <span style={{visibility : "hidden"}} >{1}.</span>
          
          <input type="text" value={"Select a Product"} class="icon-input" onChange={() => console.log("TES")} />
 
 
          <div style={{width : "50%"}}>
            {true ? 
              (<button style={{width : "55%"}} onClick={handleModal}>Add Product</button> ) :
            <>
              <input style={{width : "20%"}} type="number" value={null} />
              <select style={{width : "35%", height: "35px"}}>
                <option>% Off</option>
                <option>Flat</option>
                {/* Add other discount types here */}
              </select>
            </>
            }
 
          {/* <span className="delete-btn" oClick={() => console.log("VClicked")}>X</span> */}
          </div>
        </div>  
    </>
  )
}
const Items = ({ handleModal, dataShow, handleRemoveData }) => {
 
  const [products, setProducts] = useState(dataShow);
 
  useEffect(() => {
  }, [dataShow, products])
  const handleToggleVariants = (index) => {
    const newProducts = [...dataShow];
    newProducts[index].showVariants = !newProducts[index].showVariants;
    setProducts(newProducts);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
 
    const newProducts = [...dataShow];
    const [reorderedProduct] = newProducts.splice(result.source.index, 1);
    newProducts.splice(result.destination.index, 0, reorderedProduct);
 
    setProducts(newProducts);
  };
 
  return (
    <div className="app">
      <div className="container">
        <h2>Add Products</h2>
        <div className='header-info '>
          <div>Product</div>
          <div>Discount</div>
        </div>
        <div className='container-list'>
        <DragDropContext onDragEnd={onDragEnd} >
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef} style={{paddingLeft: "0px"}}>
                {dataShow.map((product, index) => {
                  return (
                    <Draggable key={`product-${index}`} draggableId={`product-${index}`} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}  >
                          <ProductRow
                              provided = {provided}
                              element = {product}
                              product={product.product}
                              discount={product.discount}
                              index={index}
                              showVariants={product.showVariants}
                              handleRemoveData = {handleRemoveData}
                              onToggleVariants={() => handleToggleVariants(index)}
                              // onEnableReorder={() => handleEnableReorder(index)}
                            />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <InitialItem handleModal={handleModal} />
        </div>
        {/* <button className="add-product-btn" onClick={handleModal}>Add Product</button> */}
      </div>
    </div>
  );
};
 
export default Items;
 