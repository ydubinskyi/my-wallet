import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      width: '100%',
      marginBottom: theme.spacing(1),
    },
  })
);

export default function CreateAccountDialog({ open, onClose, onSubmit }) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [type, setType] = useState('GENERAL');
  const [currency, setCurrency] = useState('PLN');
  const [startAmount, setStartAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [accentColor, setAccentColor] = useState('#cccccc');

  const clearForm = () => {
    setName('');
    setType('GENERAL');
    setCurrency('PLN');
    setStartAmount(0);
    setDescription('');
    setAccentColor('#cccccc');
  };

  const onCancelForm = () => {
    onClose();
    clearForm();
  };

  const onSubmitForm = () => {
    const formData = {
      name,
      type,
      description,
      user_currency_id: currency,
      start_amount: startAmount,
      accent_color: accentColor,
    };

    onSubmit(formData);
    clearForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Create account</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.formControl}
          autoFocus
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value as string)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={type}
            onChange={(e) => setType(e.target.value as string)}
          >
            <MenuItem value={'GENERAL'}>General</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as string)}
          >
            <MenuItem value={'101'}>PLN</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.formControl}
          id="start-amount"
          label="Start amount"
          type="number"
          fullWidth
          value={startAmount}
          onChange={(e) => setStartAmount(Number(e.target.value))}
        />
        <TextField
          className={classes.formControl}
          id="description"
          label="Description"
          type="text"
          multiline
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className={classes.formControl}
          id="accent-color"
          label="Accent color"
          type="color"
          fullWidth
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelForm} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmitForm} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
