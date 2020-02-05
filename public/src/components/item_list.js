import React from 'react';

function ItemList(props) {
    let itm = props.tags || '';
    let t = itm.split('#');
    return t.map(item => {
      return <li className='italic'>{item}</li>
    });
}

export default ItemList;
