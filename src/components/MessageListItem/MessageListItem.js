import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Avatar,
  CardHeader,
} from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MessageProfileInfo from '../MessageProfileInfo/MessageProfileInfo';
import { withRouter } from 'react-router-dom';

class MessageListItem extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SECONDARY_PROFILE',
      payload: this.props.item.primary_user,
    });
    this.props.dispatch({ type: 'GET_MESSAGE_LIST' });
  }

  clickMessage = (event) => {
    this.props.history.push(`/message/${this.props.item.primary_user}`);
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={6}
          style={{ margin: 'auto', marginLeft: '180px' }}
          onClick={this.clickMessage}
        >
          <Grid item xs={12}>
            <Card
              variant="outlined"
              style={{
                width: '1000px',
                height: '135px',
              }}
            >
              <CardHeader
                avatar={<Avatar src="/broken-image.jpg" />}
                title={this.props.store.profileSecondary.map((item, index) => (
                  <MessageProfileInfo key={index} item={item} />
                ))}
              />
              <CardContent>
                <Typography variant="h5" component="h5">
                  {this.props.item.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(MessageListItem));
