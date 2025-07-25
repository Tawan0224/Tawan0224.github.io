import React, { useContext, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { TotalPriceContext } from '../App'; // Import the context

const DataTable = ({ data, onDeleteItem }) => {
  const totalPrice = useContext(TotalPriceContext);
  const searchRef = React.useRef();
  const [filteredSelectedItems, setFilteredSelectedItems] = React.useState(data);

  // Sync with parent data changes
  useEffect(() => {
    setFilteredSelectedItems(data);
  }, [data]);

  const handleSearch = () => {
    const keyword = searchRef.current.value;
    console.log("Searching for:", keyword);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSelectedItems([...filteredData]);
  }

  const sortAscendingly = () => {
    const sortedData = [...filteredSelectedItems].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    setFilteredSelectedItems(sortedData);
  }

  const sortDescendingly = () => {
    const sortedData = [...filteredSelectedItems].sort(
      (a, b) => b.name.localeCompare(a.name)
    );
    setFilteredSelectedItems(sortedData);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <input
          ref={searchRef}
          id="outlined-basic"
          type="text" 
          placeholder="Search..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}>
          Search
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Sort by Name
        <Button onClick={sortAscendingly}>⬇️</Button>
        <Button onClick={sortDescendingly}>⬆️</Button>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSelectedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button onClick={() => onDeleteItem(index)}>🗑️</Button>
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      Total Price: ${totalPrice}
    </div>
  );
};

export default DataTable;