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
} from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ProfileItem from '../ProfileItem/ProfileItem';
import Projects from '../Projects/Projects';

class Profile extends Component {
  state = {
    project_desc: '',
    project_link: null,
    header: null,
    newProject: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
    this.props.dispatch({ type: 'GET_PROJECTS' });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  newProject = (event) => {
    if (this.state.newProject === false) {
      this.setState({
        newProject: true,
      });
    } else if (this.state.newProject === true) {
      this.setState({
        newProject: false,
      });
    }
  };

  postProject = (event) => {
    this.setState({
      newProject: false,
    });
    this.props.dispatch({ type: 'POST_NEW_PROJECT', payload: this.state });
  };

  render() {
    let projectForm = <></>;

    let projectBtn = (
      <Button color="primary" variant="contained" onClick={this.newProject}>
        New Project
      </Button>
    );

    if (this.state.newProject === true) {
      projectForm = (
        <Card
          variant="outlined"
          style={{ width: '700px', margin: 'auto', textAlign: 'center' }}
        >
          <h3>New Project</h3>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} style={{ margin: 'auto' }}>
              <TextField
                required
                type="text"
                onChange={this.handleChangeFor('header')}
                id="standard-textarea"
                variant="outlined"
                label="Header"
                placeholder="Header"
                multiline
                style={{
                  width: '90%',
                  marginTop: '25px',
                  marginBottom: '20px',
                }}
              />
              <div>
                <TextField
                  required
                  type="text"
                  onChange={this.handleChangeFor('project_desc')}
                  id="standard-textarea"
                  variant="outlined"
                  label="Description"
                  placeholder="Description"
                  multiline
                  style={{
                    width: '90%',
                    marginTop: '25px',
                    marginBottom: '20px',
                  }}
                />
              </div>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  type="text"
                  onChange={this.handleChangeFor('project_link')}
                  id="standard-textarea"
                  variant="outlined"
                  label="Link"
                  placeholder="Project Link"
                  multiline
                  style={{
                    width: '90%',
                    marginTop: '25px',
                    marginBottom: '20px',
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                style={{ marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={this.postProject}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      );

      projectBtn = (
        <Button color="secondary" variant="contained" onClick={this.newProject}>
          Cancel
        </Button>
      );
    }

    return (
      <div>
        <div>
          {this.props.store.profilePrimary.map((item, index) => (
            <ProfileItem key={index} item={item} />
          ))}
        </div>
        <br />
        {projectForm}
        <br />
        <div className="center-button">{projectBtn}</div>
        <div>
          {this.props.store.projects.map((item, index) => (
            <Projects key={index} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Profile);
