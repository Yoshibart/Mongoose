import './App.css';
import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
function Change() {
  const { state } = useLocation();
  const name = state && state.name;
  const [item, setItem] = useState({
    id:"",title:"",
    description:"",
    discountPercentage:"",rating:"",
    stock:"",
    brand:"",category:"",thumbnail:"",
    images:[]
  });
  const [errorText, setErrorText] = useState("")
  const [imageList, setImageList] = useState([]);
  const [error, setError] = useState(false);

function handleAddClick(index) {
  setImageList(prevList => {
    const newList = [...prevList];
    newList.splice(index, 0, "");
    return newList;
  });
}

function handleDeleteClick(index) {
  setImageList(prevList => {
    const newList = [...prevList];
    newList.splice(index, 1);
    return newList;
  });
}


  function handleInputChange(event, index) {
    const value = event.target.value;
    setImageList(prevList => {
      const newList = [...prevList];
      newList[index] = value;
      return newList;
    });
  }

  useEffect(() => {
      setImageList(item.images);
  }, [item]);

  useEffect(() => {
    fetch(`http://localhost:3030/products/${state.name}`).then(response => response.json())
    .then(datas => {
      setItem(datas);
    });  
  }, [state.name]);

const changeData = async () => {
  let data = item;
  data = {...data, images:imageList}
  try{
    const response = await fetch(`http://localhost:3030/products/${item.id}/edit`, {
      method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
    });

    const responseData = await response.json();
    setErrorText(responseData.update);
  }catch(error){
    console.error(error);
  }
}

  console.log(errorText)
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
            <input name="thumbnail" required onChange={setItemInputs} value={item.thumbnail}/>
          </div>
    <div>
      {imageList.map((url, index) => (
        <div key={index}>
          <p>
            <input
              type="text"
              value={url}
              onChange={event => handleInputChange(event, index)}
            />
            <button onClick={() => handleDeleteClick(index)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
        </div>

        <div id="buttons">
          <button onClick={changeData}>Modify</button>
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Change;