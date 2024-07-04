import React, { useEffect } from 'react';
import Product from './components/Modal/Products';
// import Items from './components/Items/Items';
import Items from './components/Items/Items';
 
const App = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectIds, setSelectedIds] = React.useState({});
  const [dt, setDt] = React.useState([]);
 
  useEffect(() => {
 
  }, [isModalOpen, dt])
  const handleUpdate = (dta) => {
    setDt(dta)
  }
  const handleRemoveData = (removeId) => {
    debugger;
    let temp = [...dt]; 
    temp.splice(removeId, 1);
    setDt(temp)
  }
  const handleClose = () => {
    setIsModalOpen(false);
  }
  return (
    <div>
      {!isModalOpen && <Items handleModal = {() => setIsModalOpen(true)} dataShow = {dt} handleRemoveData = {handleRemoveData}/>}
 
      {isModalOpen && <Product products={dt} onClose={handleClose} handleUpdate = {handleUpdate} />
      }
 
    </div>
  );
};
 
 
export default App;
 
 