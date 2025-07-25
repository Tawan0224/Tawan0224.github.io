import { useState, useRef, useEffect, createContext } from 'react'
import DataTable from './Components/DataTable 1.jsx'
import accessoryData from './Components/accessory.json'
import { useForm } from "react-hook-form"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './App.css';

//Emoji Ctrl + Cmd + Space
import { useLocalStorage } from 'react-use';

// Create the context
export const TotalPriceContext = createContext();

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [totalPrice, setTotalPrice] = useState(0)

  const [savedSelectedItems, setSavedSelectedItems, remove] = useLocalStorage("selectedItems", [])

  const [selectedItems, setSelectedItems] = useState(savedSelectedItems)

  useEffect(() => {
    console.log("Hook activate");
    const total = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    setTotalPrice(total)
  }, [selectedItems])

  const onSubmit = (data) => {
    console.log(data)
    const productId = parseInt(data.product)
    const product = accessoryData.find(accessory => accessory.id === productId)
    const order = {
      ...product,
      quantity: parseInt(data.quantity) // Convert to number
    }
    selectedItems.push(order)
    setSelectedItems([...selectedItems])
    setSavedSelectedItems([...selectedItems])
  }

  const deleteItem = (index) => {
    console.log("Delete Item", index);
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems])
    setSavedSelectedItems([...selectedItems])
  }

  return (
    <TotalPriceContext.Provider value={totalPrice}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Product"
            {...register("product")}
          >
            {accessoryData.map((accessory, index) => {
              return (
                <MenuItem key={index} value={accessory.id}>{accessory.name} -- {accessory.price}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <br />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Quantity</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">#</InputAdornment>}
            label="Quantity"
            {...register("quantity")}
          />
        </FormControl>
        <br />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <DataTable
        data={selectedItems}
        onDeleteItem={deleteItem}
      />
      <hr/>
      <h2>Total Price: {totalPrice}</h2>
    </TotalPriceContext.Provider>
  )
}

export default App