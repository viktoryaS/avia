import { useState } from "react";


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {

  const [items, setItems] = useState([]);

function handleAddItems(item) {
  setItems((items) => [...items, item]);
}

// удаляем элементы из массива
function handleDeleteItem(id) {
  console.log(id);
  setItems(items => items.filter(item => item.id !== id));
}

function handleToggleItem(id) {
  setItems((items) => 
    items.map((item) => 
      item.id === id ? {...item, packed: !item.packed}
      :item
  )
);
}

  return(
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  )
}

function Logo() {
  return (
    <h1>🌴 Fav Away 💼</h1>
  )
}

function Form({onAddItems}) {

const [description, setDescription] = useState("");
const [ quantity, setQuantity ] = useState(1);


function handeleSubmit(e) {
  e.preventDefault();

  if (!description) return;

  const newItem = {description, quantity, packed: false, 
    id: Date.now()}
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);

}

  return (
    // мы навешиваем на form одну функцию и потом в каждое поле ввода передаем useStete 
    <form className="add-form" onSubmit={handeleSubmit}>
      <h3>Whot do you need for your 😍 Trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {/* Создаем динамически массив цыфр */}
      {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
        <option value={num} key={num}>
          {num}
        </option>
      ))}
      </select>
      <input type="text" 
      placeholder="'Item..."
      value={description}
       onChange={(e) => setDescription(e.target.value)}
       />
      <button>Add</button>
    </form>
  )
}

function PackingList({items, onDeleteItem,onToggleItem}) {
  return (
    <div className="list">
<ul>
  {items.map((item) => (<Item item={item} 
  onDeleteItem={onDeleteItem}
  onToggleItem={onToggleItem}
  key={item.id}/>))}
</ul>
</div>
  )
}

function Item({item,onDeleteItem, onToggleItem}) {
  return(
    <div>
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)} >❌</button>
    </li>
    </div>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>fooret</em>
    </footer>
  )
}