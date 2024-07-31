import React, { Component } from 'react';
import Select from 'react-select';
import { customStyles } from './selectConfig/selectStyles';
import { connect } from 'react-redux';
import getProductTypes from '../actions/getProductTypes';
import getInventoryItems from '../actions/getInventoryItems';
import Loader from 'react-loader-spinner';
import invntoryRequestMade from '../actions/inventoryRequestMade';
import { inventoryRequestApproved } from '../actions/approveRequest';
import { inventoryRequestDeclined } from '../actions/declineRequest';
import { url } from '../../../helpers/urls';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { shipInventoryEventReceived } from '../actions/shipInventory';
const EventSource = NativeEventSource || EventSourcePolyfill;

class InventoryListByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOptions: [],
      selectedType: null,
      waiting: true,
      inventoryRequestsStream: null,
    };
  }
  componentDidMount = () => {
    let user_id = window.localStorage.getItem('user_id');
    let facility = window.localStorage.getItem('facility');
    let { inventoryRequestsStream } = this.state;
    inventoryRequestsStream = new EventSource(
      url + '/events/' + facility + '/' + user_id,
    );
    inventoryRequestsStream.onopen = () => {
      this.setState({
        message: 'connected',
      });
    };
    inventoryRequestsStream.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      let facility = window.localStorage.getItem('facility');
      let eventData = JSON.parse(event.data);
      if (eventData.command === 'Inventory requested from your facility.') {
        this.props.invntoryRequestMade(eventData);
      }

      if (
        eventData.command === 'request accepted' &&
        eventData.data.product.product_type === this.state.selectedType.label &&
        eventData.data.approved_for === facility
      ) {
        this.props.inventoryRequestApproved(eventData);
      }
      if (
        eventData.command === 'inventory request from your facility declined' &&
        eventData.data.product.product_type === this.state.selectedType.label &&
        eventData.data.approved_for === facility
      ) {
        console.log('concatinating');
        this.props.inventoryRequestDeclined(eventData);
      }
      if (
        eventData.command === 'inventory_shipped' &&
        eventData.data.product.product_type === this.state.selectedType.label
      ) {
        this.props.shipInventoryEventReceived(eventData);
      }
    };
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
    this.props.getProductTypes().then(() => {
      if (this.props.productTypes !== undefined) {
        let opts = [];
        this.props.productTypes.forEach((element) => {
          opts.push({
            label: element.type,
            value: element.id,
          });
        });

        this.props
          .getInventoryItems(user_id, 'byType', opts[0].label)
          .then(() => {
            this.setState({
              typeOptions: opts,
              selectedType: opts[0],
              waiting: false,
            });
          });
      }
    });
  };

  handleTypeSelect = (selectedOption) => {
    let user_id = window.localStorage.getItem('user_id');
    this.setState({
      waiting: true,
      selectedType: selectedOption,
    });
    this.props
      .getInventoryItems(user_id, 'byType', selectedOption.label)
      .then(() => {
        this.setState({
          waiting: false,
        });
      });
  };

  getColorClass = (days) => {
    if (days <= 2) {
      return 'td-danger';
    }
    if (days < 5) {
      return 'td-warning';
    }
    return 'td-success';
  };
  getRequestButtonLabel(status) {
    console.log(status);
    if (status === 'pending') {
      return 'Request';
    }
    if (status === 'requested') {
      return 'Requested';
    }
    if (status === 'rejected') {
      return 'Request';
    }
    if (status === 'approved') {
      return 'Approved';
    }
  }

  componentWillUnmount = () => {
    let { inventoryRequestsStream } = this.state;
    inventoryRequestsStream.close();
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
  };

  render() {
    if (this.state.waiting === false) {
      if (this.props.productList.length !== 0) {
        return (
          <React.Fragment>
            <div className="row" style={{ marginBottom: '10px' }}>
              <Select
                value={this.state.selectedType}
                onChange={this.handleTypeSelect}
                options={this.state.typeOptions}
                placeholder="Product Type"
                styles={customStyles}
              />
            </div>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Expiration</th>
                <th>Product ID</th>
                <th>Facility</th>
                <th>Available Date</th>
                <th>Request</th>
                <th>Ready</th>
                <th>Ship</th>
              </tr>
              {this.props.productList.map((item, key) => (
                <tr key={item.id}>
                  <td
                    className={this.getColorClass(item.time_to_expire)}
                    data-label="Column 1"
                  >
                    {item.product_type}
                  </td>
                  <td data-label="Column 2">{item.expiration_date}</td>
                  <td data-label="Column 3">{item.product_id}</td>
                  <td data-label="Column 4">{item.facility}</td>
                  <td data-label="Column 5">{item.release_date}</td>
                  <td class="td-custom" data-label="Column 6">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'request-' + item.id}
                      onClick={this.props.requestInventory}
                      disabled={!item.status === 'pending'}
                      hidden={!item.can_request}
                    >
                      {/* {this.getRequestButtonLabel(item.status)} */}
                      Request
                    </button>
                  </td>
                  <td
                    class={item.can_ship === true ? 'td-info' : 'td-danger'}
                    data-label="Column 7"
                  />
                  <td class="td-custom" data-label="Column 8">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'ship-' + item.id}
                      hidden={!item.can_ship}
                      onClick={this.props.shipInventory}
                    >
                      Ship
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <div class="row" style={{ marginTop: '60px' }}>
              <div class="col-md-12">
                <h3>Legend</h3>
                <div class="numbered color filled custom-list">
                  <ol>
                    <li class="danger">Expiring in 48 hours or less</li>
                    <li class="success">Product Good</li>
                    <li class="warning">Expiring in 5 days or less</li>
                  </ol>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="row" style={{ marginBottom: '10px' }}>
              <Select
                value={this.state.selectedType}
                onChange={this.handleTypeSelect}
                options={this.state.typeOptions}
                placeholder="Product Type"
                styles={customStyles}
              />
            </div>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Expiration</th>
                <th>Product ID</th>
                <th>Facility</th>
                <th>Available Date</th>
                <th>Request</th>
                <th>Ready</th>
                <th>Ship</th>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td>No Inventory items found</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </table>
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <div className="row" style={{ marginBottom: '10px' }}>
            <Select
              value={this.state.selectedType}
              // onChange={this.handleAdminSelect}
              options={this.state.typeOptions}
              placeholder="Product Type"
              styles={customStyles}
            />
          </div>
          <table className="basic-table">
            <tr>
              <th>Product Type</th>
              <th>Expiration</th>
              <th>Product ID</th>
              <th>Facility</th>
              <th>Available Date</th>
              <th>Request</th>
              <th>Ready</th>
              <th>Ship</th>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td>
                <Loader
                  type="RevolvingDot"
                  color="blue"
                  height={40}
                  width={40}
                />
              </td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </table>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    productTypes: state.InventoryReducer.productTypes,
    productList: state.InventoryReducer.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTypes: () => dispatch(getProductTypes()),
    getInventoryItems: (user_id, filter, productType) =>
      dispatch(getInventoryItems(user_id, filter, productType)),
    invntoryRequestMade: (payload) => dispatch(invntoryRequestMade(payload)),
    inventoryRequestApproved: (payload) =>
      dispatch(inventoryRequestApproved(payload)),
    inventoryRequestDeclined: (payload) =>
      dispatch(inventoryRequestDeclined(payload)),
    shipInventoryEventReceived: (payload) =>
      dispatch(shipInventoryEventReceived(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryListByType);
