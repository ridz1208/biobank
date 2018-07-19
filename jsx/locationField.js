/**
 * Biobank Container Location Field
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

class LocationField extends React.Component {
  render() {
    return (
      <div className='inline-field'>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}> 
            <SelectElement
              name='locationId'
              options={this.props.centers}
              inputClass='col-lg-11'
              onUserInput={this.props.setContainer}
              value={this.props.container.locationId}
              errorMessage={this.props.errors.locationId}
            />  
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}> 
          <ButtonElement
            label="Update"
            onUserInput={this.props.saveContainer}
            columnSize= 'col-lg-11'
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}> 
          <a onClick={this.props.close} style={{cursor:'pointer'}}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

LocationField.propTypes = {
  setContainer: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  centerIds: React.PropTypes.object.isRequired,
  container: React.PropTypes.object.isRequired,
  saveContainer: React.PropTypes.func.isRequired,
  className: React.PropTypes.string
};

export default LocationField;
