import React from "react";
import { Grid, Typography,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
// import Slider from "react-slick";
import NewsSlider from "@/common/NewsSlider";
import { useState } from "react";
const rows = [
  {
    id: 1,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 2,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 3,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
];



export default function NewsSingle() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container justifyContent="center">
      <Grid my={1}>
        <Typography fontWeight="bold" variant="h5">
          News Details
        </Typography>
        <Grid container>
          <Grid xs={9} p={1}>
            <Grid border="1px solid grey" borderRadius="10px" p={2}>
              <Typography fontWeight="bold">
                The Premier League isn’t Apple’s first push into soccer. The
                company added all MLS games
              </Typography>
              <Typography fontSize="12px">11/04/23</Typography>
              <Grid>
                <img width="100%" src="./assets/NewsCards/card_detail.png" />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt.
                </Typography>{" "}
              </Grid>

              <Grid>
                <img width="100%" src="./assets/NewsCards/card_detail_2.png" />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={3} p={1}>
            <Grid container border="1px solid grey" borderRadius="10px" p={2}>
              <Typography fontWeight="bold">Recent News</Typography>
              <NewsSlider news={rows} />
              <Typography fontWeight="bold">Most Popular</Typography>
              <NewsSlider news={rows} />
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="category-select"
                  value={age}
                  label="Select Category"
                  onChange={handleChange}
                  style={{paddingY:"0px"}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <NewsSlider news={rows} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
