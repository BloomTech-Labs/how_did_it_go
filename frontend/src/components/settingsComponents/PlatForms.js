import React, { Component } from "react";
import axios from "axios";

import ROOT_URL from "../../utils/config.js";
import '../css/listStyle.css';

let company = {};
class PlatForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      userid: "",
      url: "",
      resource: "",
      platForms: []
    };
  }

  componentWillMount() {
    axios.get(ROOT_URL + 'users/' + this.state.user)
        .then(response => {
            this.setState({ userid: response.data.id });
            this.getCompanyData();   
        })
        .catch(error => {
            console.log(error);
        });   
  }

  getCompanyData = () => {
      axios.get(ROOT_URL + 'companies/userid/' + this.state.userid)
      .then(response => {
          company = response.data;
          this.getPlatForms();
      })
      .catch(error => {
          console.log('error finding company: ', error);
      })    
  }

  getPlatForms = () => {
    axios
      .get(ROOT_URL + "companies/" + company.id + "/platforms")
      .then(result => {
        const detail = result.data;
        this.setState({ platForms: detail.platForms });
        console.log("Retrieve platForms successfully!");
      })
      .catch(error => {
        console.log("Errors while getting company platForms infomation");
      });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddChange = e => {
    e.preventDefault();
    const platForm = {
      url: this.state.url,
      resource: this.state.resource,
      companyID: company.id
    };
    
    axios
      .post(ROOT_URL + "platForms", platForm)
      .then(response => {
        axios
          .get(ROOT_URL + "companies/" + company.id + "/platforms")
          .then(result => {
            const detail = result.data;
            this.setState({ platForms: detail.platForms });
            console.log("Retrieve platForms successfully!");
          })
          .catch(error => {
            console.log("Errors while getting company platForms infomation");
          });
        console.log("Successfully add new platForm!");
        
        this.setState({
          url: "",
          resource: ""
        });
      })
      .catch(error => {
        alert("Failed to add new platForm!");
        console.log(error);
      });
  };

  deletePlatForm = id => {
    axios
      .delete(ROOT_URL + "platForms/" + id)
      .then(response => {
        axios
          .get(ROOT_URL + "companies/" + company.id + "/platforms")
          .then(result => {
            const detail = result.data;
            this.setState({ platForms: detail.platForms });
            console.log("Retrieve platForms successfully!");
          })
          .catch(error => {
            console.log("Errors while getting company platForms infomation");
          });
        console.log("Successfully deleted platForm!");
      })
      .catch(error => {
        alert("Failed to delete platForm!");
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="title">Review Sites</div>
        <form onSubmit={this.handleAddChange}>
          <div>
            <input
              className="form--item"
              type="text"
              placeholder="Platform URL"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              className="form--item"
              type="text"
              placeholder="Resource"
              name="resource"
              value={this.state.resource}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            className="button"
            type="button"
            name="platFormInfo"
            onClick={this.handleAddChange}
          >
            Add
          </button>
        </form>
        <ul>
          {this.state.platForms
            ? this.state.platForms.map((platForm, index) => {
                return (
                  <li className="list_items" key={index}>
                    <span className="list_item">{platForm.resource}</span>
                    <span className="list_item">{platForm.url}</span>
                    <button className="deleteBtn" onClick={() => this.deletePlatForm(platForm.id)}>X</button>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }
}

export default PlatForms;
