import React from 'react'

function List({item, deleteItem, editItem}) {

    return (
        <div className='grocery-list'>
            <article className='grocery-item'>
                <p className='title'>{item.title}</p>
                <div className='btn-container'>
                    <button type='button' 
                            className='edit-btn'
                            onClick={()=>editItem(item.id)}>Edit</button>
                    <button type='button' 
                            className='delete-btn'
                            onClick={() => deleteItem(item.id)}>
                    delete</button>
                </div>
            </article>
        </div>
    )
}

export default List
