import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import debounce from '../utils/debounce';
import { EditProduct, EditPrice, DeleteDrugItem, addPrice } from '../actions/product';
import { AddBox } from '@material-ui/icons';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Product(props) {
  const { row, prices, editDrug, editPrice, deleteDrugItem, addPriceItem } = props;
  const [disabled, setDisabled] = useState(true)
  const [newPrice, setNewPrice] = useState(0);
  const [openDelete, setOpenDelete] = useState(false)
  const [drugName, setDrugName] = useState(row.name || '');
  const [mPrices, setMPrices] = useState(Object.values(prices).reduce((acc, val) => {
    acc[val.id] = { ...val, disabled: true }
    return acc;
  }, {}))
  const [open, setOpen] = useState(false);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);
  const classes = useRowStyles();
  const handleEdit = () => {
    setDisabled(false)
  }

  const debounceDrugInput = useCallback(
    debounce((data) => {
      editDrug(data);
    }),
    [],
  )

  const debouncePrice = useCallback(
    debounce((data) => {
      editPrice(data);
    }),
    [],
  )

  const drugNameChange = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setDrugName(name);
    debounceDrugInput({ id: row.id, name })
  }

  const handlePriceEdit = (id) => () => {
    setMPrices({ ...mPrices, [id]: { ...mPrices[id], disabled: false }})
  }
  const priceChange = (id) => (e) => {
    const price = e.target.value;
    setMPrices({ ...mPrices, [id]: { ...mPrices[id], disabled: false, price }})
    debouncePrice({ id, price })
  }

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }
  const deleteDrug = () => {
    setOpenDelete(false);
    deleteDrugItem(row.id)
  }

  const showAddPriceDialog = () => {
    setOpenPriceDialog(true)
  }

  const handlePriceDialogClose = () => {
    setOpenPriceDialog(false);
  }
  
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  }

  const handleAddPrice = () => {
    setOpenPriceDialog(false);
    const id = uuidv4();
    addPriceItem(row.id, newPrice, id);
    const newPrices = { ...mPrices, [id]: { id, price: newPrice, disabled: true, date: (new Date()).toString() }}
    setMPrices(newPrices)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField onChange={drugNameChange} value={drugName}  disabled={disabled}/>
          <IconButton onClick={handleEdit}>
            <BorderColorIcon />
          </IconButton>
          <IconButton onClick={handleOpenDeleteDialog}>
            <DeleteIcon color="primary"/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Price <IconButton onClick={showAddPriceDialog}>
                          <AddBox />
                        </IconButton></TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.prices.map((id) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                      <TextField type='number' disabled={mPrices[id].disabled} onChange={priceChange(id)} value={mPrices[id]?.price}/>
                        <IconButton onClick={handlePriceEdit(id)}>
                          <BorderColorIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{prices[id].date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Drug</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this drug?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteDrug} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPriceDialog}
        onClose={handlePriceDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Price</DialogTitle>
        <DialogContent>
          <TextField type='number' onChange={handlePriceChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPrice} color="primary">
            Add Price
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Product.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    prices: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ product }) => {
  const { drugs, prices } = product;
  return {
    drugs,
    prices
  }
}

const mapDispatchToProps = {
  editDrug: EditProduct,
  editPrice: EditPrice,
  deleteDrugItem: DeleteDrugItem,
  addPriceItem: addPrice
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);