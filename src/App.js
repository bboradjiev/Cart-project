import React, {useState, useEffect} from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }
  else{
    return [];
  };
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, msg: '', type:''});

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      showAlert(true, 'danger', 'please enter value');
    }else if(name && isEditing){
      setList(list.map(item => {
        if(item.id === editID){
          return {...item, title: name };
        }
        return item;
      }));
       setName('');
       setEditID(null);
       setIsEditing(false);
       showAlert(true, 'success', 'item updated');
    }else{
      showAlert(true, 'success', 'item added to the list');
      const newItem = {id:Math.random() * 10, title: name};
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg});
  };

  const clearItems = () => {
    showAlert(true, 'danger', 'clearing list');
    setList([]);
  };

  const deleteItem = (id) => {
    showAlert(true, 'danger', 'remove item');
    const newList = list.filter(list => list.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    const specificItem = list.find(el => el.id === id);
    setName(specificItem.title);
    setIsEditing(true);
    setEditID(specificItem.id);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  });

  return (
    <section className='section-center'>
          <form className='grocery-form' onSubmit={handleSubmit}>
            {alert.show ? <Alert {...alert} removeAlert={showAlert} list={list}/> : ''}
            <h3>Grocery Cart</h3>
            <div className='form-control'>
                <input  className='grocery'
                        value={name}
                        placeholder='enter product'
                        onChange={(e) => setName(e.target.value)}/>
                <button type='submit' className='submit-btn'>{isEditing ? 'Edit' : 'Submit'}</button>
            </div>            
          </form>
          {list.length > 0 ? 
              <div className='grocery-container'>
                      {list.map(item =><List key={item.id}  item={item} 
                                                            clearItems={clearItems}
                                                            deleteItem={deleteItem}
                                                            editItem={editItem}
                                                            />)}
                      <button className='clear-btn' onClick={clearItems}>Clear items</button>
              </div>
        : '' }
    </section>
  );
}

export default App;
