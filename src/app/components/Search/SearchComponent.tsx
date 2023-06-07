'use client';
import { useRouter } from 'next/navigation';
import { Constants } from "@/utlities/constants";
import { Button, FormControl, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const SearchComponent = () => {
  const router = useRouter();
  const client = axios.create({
    baseURL: Constants.API_URL,
  });
  const [searchTerm, setSearchTerm] = useState([]);

  const handleInput = (event :any) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = async (event :any) => {
    event.preventDefault();
    let response :any = await client.get(`${Constants.API_URL}/search?term=${searchTerm}`);
    if(response.status === 200){
      router.push('/list')
    }
  }

  return (
    <div className="searchComponent">
      <Paper className="paper">
        <Typography variant="h5" component="h3">
          Search Itunes Tracks
        </Typography>

        <FormControl sx={{ width: '50ch',height: '10ch' }}>
          <TextField
              label="Search"
              id="margin-normal"
              name="search"
              defaultValue={""}
              className=".textField"
              helperText={Constants.FORM_INPUTS.ENTER_SEARCH_TERM}
              onChange={handleInput}
            />
        </FormControl>
        <FormControl sx={{ width: '50ch',height: '10ch' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
};

export default SearchComponent;