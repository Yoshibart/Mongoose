import './App.css';
import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Change = () =>{
  const navigate = useNavigate();
  const [item, setItem] = useState({
    title:"",
    description:"",
    discountPercentage:"",rating:"",
    stock:"",
    brand:"",category:"",thumbnail:"",
    images:[]
  });
  const [errorText, setErrorText] = useState("")
  const [imageList, setImageList] = useState([]);
  const [error, setError] = useState(false);

  const handleAddClick = (index) =>{
    setImageList(prevList => {
      const newList = [...prevList];
      newList.splice(index, 0, "");
      return newList;
    });
  }

  const handleDeleteClick = (index) =>{
    setImageList(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  }

  const handleInputChange = (event, index) =>{
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

  const changeData = async () => {
    let data = item;
    data = {...data, images:imageList}
    try{
      const response = await fetch(`http://localhost:3030/products/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      setErrorText(responseData.create);
    }catch(error){
      console.error(error);
    }
  }
  console.log(errorText)

  console.log(item)
  const setItemInputs = event =>{
    setItem(oldata =>{return {...oldata,[event.target.name]:event.target.value}})}
const handleInsertClick = () => navigate('/');
const handleChangeClick = () => navigate('/change', { state: { name: item.id } });
  return (
    <div className="App">
      <div id="buttons">
        <button onClick={handleInsertClick}>Home</button><br/>
        <button onClick={handleChangeClick}>Update</button><br/>
      </div> 
      <div id="inputs-section">
        <div id="input">
          <div>
            <label>title:</label>
            <input name="title" required onChange={setItemInputs} value={item.title}/>
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
            <label>description:</label>
              <p><textarea name="description" required onChange={setItemInputs} value={item.description}></textarea></p>
          </div>
          <div>
            <label>Images:</label>
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
          <button onClick={changeData}>Create</button>
          <button onClick={handleAddClick}>Add Image</button>
        </div>
      </div>
    </div>
  );
}

export default Change;