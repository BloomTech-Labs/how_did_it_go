import React, { Component } from 'react';

class DropDownSelect extends Component {
  constructor(props) {
    super(props);
  }

  selectOptions = (platForm) => (
    <option key={platForm.global_hash} value={platForm.url}>{platForm.long_url}</option>
  )

  render() {
    // const { input } = this.props;
    return (
      <div>
        <select>
          <option value ='' selected disabled>Select A Review Site</option>
          {this.props.platForms.map(this.selectOptions)}
        </select>
      </div>
    );
  }
}

export default DropDownSelect;