import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Paper,
  Container,
} from '@material-ui/core';

class EditProfile extends Component {
  render() {
    return (
      <div className="profile-edit">
        <h2>Edit Profile</h2>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6}>
            <Card style={{ height: '200px', width: '180px' }}>
              <CardActionArea>
                <img src={process.env.PUBLIC_URL + '/default.jpg'}></img>
                {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Add an Image
                  </Typography>
                </CardContent> */}
              </CardActionArea>
            </Card>
            <br></br>
            <div>
              <TextField
                id="standard-textarea"
                variant="outlined"
                label="Bio"
                placeholder="Bio (350 characters)"
                multiline
                className="size-bio"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Display Name"
              className="size"
            />
            <br />
            <br />
            <div>
              <FormControl className="size" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type
                </InputLabel>
                <Select
                  native
                  label="Type"
                  value="age"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="10">Ten</option>
                  <option value="20">Twenty</option>
                  <option value="30">Thirty</option>
                </Select>
              </FormControl>
            </div>
            <br />

            <br></br>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditProfile);
