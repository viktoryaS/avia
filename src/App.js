import { useState } from "react";


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  // поднятие state в глобальное состояние и передача от родкомпон к дочерним
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

function handleClearList() {
  const cofirmed = window.confirm(
    "Are you want delete all items"
  )
  if(cofirmed) setItems([]);
}

  return(
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items}/>
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

function PackingList({items, onDeleteItem,onToggleItem, onClearList}) {

  const [sortBy, setSortBy] = useState("input")

let sortedItems;
if(sortBy === 'input') sortedItems =items;

if(sortBy === 'description') sortedItems = items
.slice()
.sort((a, b) => a.description.localeCompare(b.description))

if (sortBy === "packed")
  sortedItems = items
.slice()
.sort((a,b) => Number(a.paced) - Number(b.paced));

  return (
    <div className="list">
<ul>
  {sortedItems.map((item) => (<Item item={item} 
  onDeleteItem={onDeleteItem}
  onToggleItem={onToggleItem}
  key={item.id}/>))}
</ul>
<div className="actions">
  <select value={sortBy} onChange={(e) => setSortBy(e.target.value) }>
    <option value='input'>Sort by input order</option>
    <option value='description'>Sort by statys</option>
    <option value='packed'>Sort by descriptiop</option>
  </select>
  <button onClick={onClearList}>Lear List</button>
</div>

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

function Stats({items}) {

    //  собираем длину массива для статистики
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100 
        ? 'You got everything ✈️' 
        :`💼 You have ${numItems} items on your list,
        and you already packed${numPacked} (${percentage}%)`}</em>
    </footer>
  )
}