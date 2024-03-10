/* This code snippet is a React functional component named `Hero` that represents a hero section of a
webpage. Here's a breakdown of what it does: */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLazyGetAllArticlesQuery } from '@/store/article/article.api';

export default function SelectSmall() {
  const [sort, setSort] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  const [getAllArticles] = useLazyGetAllArticlesQuery();
  React.useEffect(() => {
      getAllArticles(sort);
  },[sort])
  
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort by</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        label="Sort by"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'author'}>Author</MenuItem>
        <MenuItem value={'pubDate'}>Date</MenuItem>
        <MenuItem value={'title'}>Title</MenuItem>
      </Select>
    </FormControl>
  );
}