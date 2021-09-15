import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Product from './components/Product';
import axios from 'axios';
import dataTransformer from './utils/dataTransformer';
import { AddDrug, AddProduct, loadingDrug} from './actions/product';
import { CircularProgress } from '@material-ui/core';
import './App.css'

export function CollapsibleTable({ addProduct, drugs, showLoading, loading, addDrugItem }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  useEffect(() => {
    showLoading();
    axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(({ data }) => {
        const normalizedDrug = dataTransformer(data?.products);
        addProduct(normalizedDrug);
      })
  }, [])

  const openDialog = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleTextChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setText(value);
  }

  const addMedicine = () => {
    setOpen(false)
    addDrugItem(text);
  }

  if (loading) return <div className='progress'> <CircularProgress /></div>;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Drug</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(drugs)?.map((row) => (
              <Product key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" onClick={openDialog} aria-label="add">
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Drug</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField value={text} onChange={handleTextChange}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={addMedicine} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = {
  addProduct: AddProduct,
  showLoading: loadingDrug,
  addDrugItem: AddDrug
}

const mapStatToProps = ({ product }) => {
  const { drugs, loading } = product;
  return {
    drugs,
    loading
  }
}
export default connect(mapStatToProps, mapDispatchToProps)(CollapsibleTable);
