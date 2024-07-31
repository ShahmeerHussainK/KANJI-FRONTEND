import action_types from '../actions/actionTypes';
const initialState = {
  inventoryCounts: {
    all_inventories_by_type: 1,
    inventories_checked_in: 0,
    inventories_checked_out: 0,
    inventories_in_transport: 0,
    inventoryRequestCount: 0,
    logo: '/media/undefined',
    user_facility_inventories_count: 0,
    user_inventories_count: 0,
    requestedInventory: 0,
  },
};

export default function DashboardReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.GET_INVENTORY_COUNTS:
      return {
        ...state,
        inventoryCounts: action.payload,
      };

    case action_types.UPDATE_INVENTORY_REQUEST_COUNT:
      let { inventoryCounts } = state;
      console.log('request payload is', action.payload);
      inventoryCounts['inventoryRequestCount'] =
        action.payload.inventoryRequestCount !== undefined
          ? action.payload.inventoryRequestCount
          : inventoryCounts['inventoryRequestCount'];
      inventoryCounts['requestedInventory'] =
        action.payload.requestedInventory !== undefined
          ? action.payload.requestedInventory
          : inventoryCounts['requestedInventory'];
      inventoryCounts['checkedIn'] =
        action.payload.checkedIn !== undefined
          ? action.payload.checkedIn
          : inventoryCounts['checkedIn'];
      inventoryCounts['checkedOut'] =
        action.payload.checkedOut !== undefined
          ? action.payload.checkedOut
          : inventoryCounts['checkedOut'];
      console.log('inventoryCounts after update is ', inventoryCounts);
      return {
        ...state,
        inventoryCounts: inventoryCounts,
      };

    default:
      return state;
  }
}
