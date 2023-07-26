import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Combobox({id,label,value,handle,items,options}) {
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
            id='id'
            value={value}
            onChange={handle}
            autoWidth
            label={label}
            sx={{textAlign: 'center'}}
            > 
            {items.map(item=>
                <MenuItem key={item.id} value={item.id}>{item[options]}</MenuItem>
            )}
            </Select>
        </FormControl>
    )
}

export default Combobox