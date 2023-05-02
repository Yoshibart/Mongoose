import './App.css';
import { useState, useEffect} from 'react';

function Insert() {
  const [item, setItem] = useState({
    id:"",title:"",
    description:"",
    discountPercentage:"",rating:"",
    stock:"",
    brand:"",category:"",thumbnail:"",
    images:[]
  });

  const setItemInputs = event =>{
    setItem(oldata =>{return {...oldata,[event.target.name]:event.target.value}})}

  return (
    <div className="App">
      <div id="inputs-section">
        <div id="input">
          <div>
            <label>title:</label>
            <input name="title" required onChange={setItemInputs} value={item.title}/>
          </div>
          <div>
            <label>description:</label>
            <input name="description" required onChange={setItemInputs} value={item.description}/>
          </div>
          <div>
            <label>discountPercentage:</label>
            <input name="discountPercentage" required onChange={setItemInputs} value={item.discountPercentage}/>
          </div>
          <div>
            <label>rating:</label>
            <input name="rating" required onChange={setItemInputs} value={item.rating}/>
          </div>
          <div>
            <label>stock:</label>
            <input name="stock" required onChange={setItemInputs} value={item.stock}/>
          </div>
          <div>
            <label>brand:</label>
            <input name="brand" required onChange={setItemInputs} value={item.brand}/>
          </div>
          <div>
            <label>category:</label>
            <input name="category" required onChange={setItemInputs} value={item.category}/>
          </div>
          <div>
            <label>thumbnail_URL:</label>
            <input name="category" required onChange={setItemInputs} value={item.category}/>
          </div>
        </div>

        <div id="buttons">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Insert;