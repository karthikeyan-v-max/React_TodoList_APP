import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'
const AddItems=({newItem, setnewItem, handleSubmit})=>{
  const inputref= useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input
            autoFocus
            ref={inputref}
            id='addItems'
            type='text'
            placeholder='Add Items'
            required
            value={newItem}
            onChange={(e) => setnewItem(e.target.value)}
        />
        <button type='submit' aria-label="Add Items"  onClick={()=> inputref.current.focus()}>
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItems