import React from 'react'
import ListElement from './ListElement';

const ItemsList = ({items,handleCheck,handleDelete}) => {
  return(
    <ul>
    {items.map((item) => (
          <ListElement 
            item={item}
            key={item.id}
            handleCheck= {handleCheck}
            handleDelete={handleDelete}
          />
    ))}
    </ul>
    )
  }
export default ItemsList