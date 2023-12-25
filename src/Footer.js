import React from 'react';

const Footer = ({length})=> {


return (
    <footer>{length} LIST  {length===0 || length===1 ? "ITEM" : "ITEMS"}</footer>
  )
}

export default Footer