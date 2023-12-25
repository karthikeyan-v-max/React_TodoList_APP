import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import "./App.css";
import { useState,useEffect } from 'react';
import AddItems from "./AddItems";
import SearchItem from "./SearchItem";
import apiRequest from "./ApiRequest";

function App(){
  const API_URL ="http://localhost:3500/items";
  const [items , setItems] = useState(
    []
    );
  const [search,setSearch]=useState('')
  const [newItem,setnewItem] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    const fetchItems = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("data not received");
        console.log(response)
        const listitems = await response.json();
        console.log(listitems)
        setItems(listitems)
        setFetchError(null)
      }catch(err){
        setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{
      (async()=>  await fetchItems())()
    },0)
  },[])

  
  
  const   addItem= async(item)=>{
    const id = items.length ? items[items.length-1].id+1: 1;
    const addNewItem = {id, checked:false, item}
    const listItems = [...items, addNewItem]
    setItems(listItems)

    const postOptions ={
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  }
  const handleCheck = async(id)=>{
  
    const listItems = items.map((item)=>
    item.id===id ? {...item, checked:!item.checked}:
    item);
    setItems(listItems)

    const myItem = listItems.filter((item)=> item.id === id)
    const updateOptions ={
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOptions)
    if(result) setFetchError(result)
    
  }
  const handleDelete =async (id)=>{
    const deleteitems = items.filter((item)=> 
    item.id!==id);
    setItems(deleteitems)

    const deleteOptions={
      methon:"DELETE"
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOptions)
    if(result) setFetchError(result)
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    if (!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setnewItem('')

  }
  return(
    <div className="App">
        <Header title ="To-Do List"/>
        <AddItems
          newItem={newItem}
          setnewItem={setnewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        <main>
          {isLoading && <p>loading items..</p>}
          {fetchError && <p>{`Error:${fetchError}`}</p>}

          {!isLoading && !fetchError && <Content
            items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
            setItem={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />}
        </main>
        <Footer
        length = {items.length}/>
    </div>
  );

  }

export default App;