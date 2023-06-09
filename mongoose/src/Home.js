import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/fontawesome-free-solid'
import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectionItem, setSelectionItem] = useState('');
  const [filterCategory, setFilterCategory] = useState([])
  const [item, setItem] = useState({
    id:"",title:"",
    description:"",
    discountPercentage:"",rating:"",
    stock:"",
    brand:"",category:"",thumbnail:"",
    images:[]
  });
  const [allItems, setAllItems] = useState([]);
  const [image, setImage] = useState([])
  const setItemInputs = event =>{
    setItem(oldata =>{return {...oldata,[event.target.name]:event.target.value}})}

  useEffect(() => {
    fetch(`http://localhost:3030/products/1`).then(response => response.json())
    .then(datas => {
      setItem(datas);
    });  
  }, []);

useEffect(() => {
  fetch(`http://localhost:3030/products/`)
    .then(response => response.json())
    .then(datas => {
      setAllItems(datas);
    });  
}, [item]);

console.log(allItems)

  const deleteProduct = () =>{
    fetch(`http://localhost:3030/products/${selectionItem}/delete`).then(response => response.json())
    .then(data => {
      setError(true);
      setErrorText(data.deleted)
    });
    nextItem();  
  }
  const searchProduct = () =>{
    
  }
  const handleNext = () => {
    setActiveIndex(activeIndex === (item.images).length - 1 ? 0 : activeIndex + 1);
  };
  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? (item.images).length - 1 : activeIndex - 1);
  };
  const previousItem = () => {
    let data;
    if(item.id == allItems[0].id){
      data = allItems[allItems.length-1];
    }else{
      for(let items of allItems){
        if(items.id === item.id) break;
        data = items
      }
    }
    setSelectionItem(data.id);
  };
  const nextItem = () => {
    let data;
    if(item.id == allItems[allItems.length-1].id){
      data = allItems[0];
    }else{
      for(let items = allItems.length-1; items > -1; items--){
        if(allItems[items].id === item.id) break;
        data = allItems[items];
      }
    }
    setSelectionItem(data.id);
  }
//sets the color values from server to format of hsl(h,s,l) or rgb(r,g,b)
  useEffect(() => {
    if(selectionItem != null){
      let data;
      for(let items of allItems){
        if(items.id == selectionItem){
          data = items
          break;
        }
      }
      if(data){
        setItem(data);     
      }
      // setError(false);
    }
  }, [selectionItem, setSelectionItem]);

const firstItem = ()=>{ if(allItems.length > 0) setSelectionItem(allItems[0].id);}

const lastItem = ()=>{ if(allItems.length > 0) setSelectionItem(allItems[allItems.length - 1].id);}

const handleInsertClick = () => navigate('/insert');
const handleChangeClick = () => navigate('/change', { state: { name: item.id } });

const uniqueCategories = Array.from(new Set(allItems.map((item) => item.category)));

return (
    <div className="App">
      <div id="buttons">
        <button onClick={handleInsertClick}>Insert</button><br/>
        <button onClick={handleChangeClick}>Update</button><br/>
        <button onClick={deleteProduct}>Delete</button><br/>
        <select id="filters">
          <option value="">No-Filter</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> 
      <div id="inputs-section">
        <div id="input">
          <div>
            <label>id:</label>
            <input name="id" disabled required onChange={setItemInputs} value={item.id}/>
          </div>
          <div>
            <label>title:</label>
            <input name="title" disabled required onChange={setItemInputs} value={item.title}/>
          </div>
          <div>
            <label>discountPercentage:</label>
            <input name="discountPercentage" disabled required onChange={setItemInputs} value={item.discountPercentage}/>
          </div>
          <div>
            <label>rating:</label>
            <input name="rating" disabled required onChange={setItemInputs} value={item.rating}/>
          </div>
          <div>
            <label>stock:</label>
            <input name="stock" disabled required onChange={setItemInputs} value={item.stock}/>
          </div>
          <div>
            <label>brand:</label>
            <input name="brand" disabled required onChange={setItemInputs} value={item.brand}/>
          </div>
          <div>
            <label>category:</label>
            <input name="category" disabled required onChange={setItemInputs} value={item.category}/>
          </div>
          <div>
            <label>description:</label>
              <p><textarea name="description" disabled required onChange={setItemInputs} value={item.description}></textarea></p>
          </div>
          <div className="container" style={{margin:"1rem", width:"100%", height: "50%"}}>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="item active">
                  <img src={item.images[0]} alt={item.description} style={{margin:"auto",width:"80vh", height:'40vh'}}/>
                </div>
                {item.images.map((imageUrl, index) => (
                  <div className="item" key={index} >
                    <img src={imageUrl} alt={item.description} style={{margin:"auto",width:"80vh", height:'40vh'}}/>
                  </div>
                ))}
              </div>

              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div id="navButtons">
            <button onClick={firstItem}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
            <button onClick={previousItem}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <input onChange={(e) => setSelectionItem(e.target.value)} value={selectionItem}/>
            <button onClick={nextItem}><FontAwesomeIcon icon={faAngleRight} /></button>
            <button onClick={lastItem}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
          </div>
        </div>
      </div>
      <div id="thumbnail">
        <img src={item.thumbnail} alt={item.description}  style={{borderRadius:"100%",width:"20rem", height:"20rem",margin:"auto"}}/>
      </div>
    </div>
  );


}

export default App;