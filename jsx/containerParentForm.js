/**
 * Biobank Container Parent Form
 *
 * Fetches data from Loris backend and displays a form allowing
 * to specimen a biobank file attached to a specific instrument
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

import ContainerDisplay from './containerDisplay.js';

class ContainerParentForm extends React.Component {
  constructor() {
    super();
    this.mapFormOptions = this.mapFormOptions.bind(this);
  }

  //map options for forms
  mapFormOptions(rawObject, targetAttribute) {
    let data = {}; 
    for (let id in rawObject) {
      data[id] = rawObject[id][targetAttribute];
    }   

    return data;
  }

  render() {
    let containerDisplay;
    let containerBarcodesNonPrimary = this.mapFormOptions(this.props.containersNonPrimary, 'barcode');

    let parentContainerField = ( 
      <SelectElement
        name="parentContainerId"
        label="Parent Container Barcode"
        options={containerBarcodesNonPrimary}
        onUserInput={this.props.setContainerData}
        required={true}
        value={this.props.container.parentContainerId}
      />  
    );  

    // TODO: THIS IS VERY POORLY DONE AND NEEDS REFACTORING
    if (this.props.container.parentContainerId) {
      let dimensionId = this.props.containersNonPrimary[
        this.props.container.parentContainerId
      ].dimensionId;

      if (dimensionId) {
        // This will eventually become unecessary
        let dimensions = this.props.containerDimensions[dimensionId];

        // Total coordinates is determined by the product of the dimensions
        let coordinatesTotal = 1;
        for (let dimension in dimensions) {
          coordinatesTotal = coordinatesTotal * dimensions[dimension];
        }

        // Mapping of options for the SelectElement
        let coordinates = {}; 
        for (let i = 1; i <= coordinatesTotal; i++) {
          // If the coordinate is already taken, skip it.
          // this doubling of if statements seems unnecessary
          if (this.props.containerCoordinates[this.props.container.parentContainerId]) {
            if (this.props.containerCoordinates[this.props.container.parentContainerId][i]) {
              continue; 
            }
          }

          coordinates[i] = i;
        }   

        containerDisplay = (
          <ContainerDisplay
            dimensions = {
              this.props.containerDimensions[
                this.props.containersNonPrimary[this.props.container.parentContainerId
              ].dimensionId]
            }
            coordinates = {
              this.props.containerCoordinates[this.props.container.parentContainerId]
            }
            containerTypes = {this.props.containerTypes}
            containerStati = {this.props.containerStati} 
            select = {true}
            selectedCoordinate = {this.props.container.coordinate}
            setContainerData = {this.props.setContainerData}
          />
        );
      }
    }   

    return (
      <FormElement
        onSubmit={this.props.saveContainer}
      >
        {parentContainerField}
        {containerDisplay}
        <br/>
        <ButtonElement label="Update"/>
      </FormElement>
    );
  }
}

ContainerParentForm.propTypes = {
};

export default ContainerParentForm;
