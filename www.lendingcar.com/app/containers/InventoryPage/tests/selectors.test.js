import { fromJS } from 'immutable';
import {
  selectInventoryRoot,
  selectFilter,
  selectAllInventory,
  selectFilteredInventory,
  selectMakeFilteredInventory,
  selectMakeOptions,
  selectColorOptions,
  selectConfig,
  selectPage,
  selectItemCountPerPage,
  selectTotalCount,
  selectSearch,
  selectCurrentPageInventory,
 } from 'containers/InventoryPage/selectors';

const mockedState = fromJS({
  inventory: {
    config: {
      page: 0,
      itemCountPerPage: 9,
    },
    filter: {
      make: 'Honda',
      color: '',
    },
    search: 'honda',
    inventories: [
      {
        color: 'White',
        price: 24056.25,
        model: 'Frontier/SV',
        mileage: 19000,
        imageNum: 7,
        make: 'Nissan',
        feature: '',
        lease: '首付$4200 每日$15',
        vin: '1N6AD0ER8GN741085',
        id: 'lc00000',
        year: 2016,
      },
      {
        color: 'Black',
        price: 24056.25,
        model: 'Frontier/SV',
        mileage: 19000,
        imageNum: 7,
        make: 'Honda',
        feature: '',
        lease: '首付$4200 每日$15',
        vin: '1N6AD0ER8GN741085',
        id: 'lc00001',
        year: 2016,
      },
    ],
  },
});

describe('selectInventoryRoot', () => {
  it('Expect to get inventory root', () => {
    const result = selectInventoryRoot(mockedState).toJS();
    const resultKeys = Object.keys(result);
    const expected = ['config', 'filter', 'search', 'inventories'];
    expect(resultKeys).toEqual(expected);
  });
});

describe('selectFilter', () => {
  it('Expect to get filter', () => {
    const result = selectFilter(mockedState).toJS();
    const resultKeys = Object.keys(result);
    const expected = ['make', 'color'];
    expect(resultKeys).toEqual(expected);
  });
});

describe('selectAllInventory', () => {
  it('Expect selectAllInventory length equals to expected inventory', () => {
    const count = selectAllInventory(mockedState).size;
    expect(count).toEqual(2);
  });
});

describe('selectFilteredInventory', () => {
  it('if filter is none, expect filtered immutable inventory is the same as all inventory', () => {
    const newMockedState = fromJS({
      inventory: {
        filter: {
          make: '',
          color: '',
        },
        inventories: [
          {
            make: 'Nissan',
            color: 'White',
          }, {
            make: 'Honda',
            color: 'Black',
          },
        ],
      },
    });
    const inventory = selectAllInventory(newMockedState);
    const result = selectFilteredInventory(newMockedState);
    expect(result.size).toEqual(inventory.size);
  });

  it('if filter is Honda, expect filtered immutable inventory is 1', () => {
    const newState = {
      inventory: {
        filter: {
          make: 'honda',
          color: 'red',
        },
        inventories: [
          {
            make: 'Nissan',
            color: 'White',
          }, {
            make: 'Honda',
            color: 'Black',
          }, {
            make: 'Honda',
            color: 'Red',
          },
        ],
      },
    };
    const newMockedState = fromJS(newState);
    const result = selectFilteredInventory(newMockedState);
    expect(result.size).toEqual(1);
  });
});

describe('selectMakeFilteredInventory', () => {
  it('if make is none, expect filtered immutable inventory is the same as all inventory', () => {
    const newMockedState = fromJS({
      inventory: {
        filter: {
          make: '',
          color: '',
        },
        inventories: [
          {
            make: 'Nissan',
            color: 'White',
          }, {
            make: 'Honda',
            color: 'Black',
          },
        ],
      },
    });
    const inventory = selectAllInventory(newMockedState);
    const result = selectMakeFilteredInventory(newMockedState);
    expect(result.size).toEqual(inventory.size);
  });

  it('if make is Honda, expect filtered immutable inventory is 2', () => {
    const newMockedState = fromJS({
      inventory: {
        filter: {
          make: 'honda',
          color: 'red',
        },
        inventories: [
          {
            make: 'Nissan',
            color: 'White',
          }, {
            make: 'Honda',
            color: 'Black',
          }, {
            make: 'Honda',
            color: 'Red',
          },
        ],
      },
    });
    const result = selectMakeFilteredInventory(newMockedState);
    expect(result.size).toEqual(2);
  });
});

describe('selectMakeOptions', () => {
  it('Expect make options is a List and it should have 2 options', () => {
    const result = selectMakeOptions(mockedState).toJS();
    const expected = [
      {
        id: 'nissan',
        name: 'Nissan',
        count: 1,
      }, {
        id: 'honda',
        name: 'Honda',
        count: 1,
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe('selectColorOptions', () => {
  it('Expect color options is a List and it should have 1 options', () => {
    const result = selectColorOptions(mockedState).toJS();
    const expected = [
      {
        id: 'black',
        name: 'Black',
        count: 1,
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe('selectConfig', () => {
  it('Expect to get two keys of config', () => {
    const result = selectConfig(mockedState).toJS();
    const resultKeys = Object.keys(result);
    const expected = ['page', 'itemCountPerPage'];
    expect(resultKeys).toEqual(expected);
  });
});

describe('selectPage', () => {
  it('Expect to get page number = 0', () => {
    const result = selectPage(mockedState);
    const expected = 0;
    expect(result).toEqual(expected);
  });
});

describe('selectItemCountPerPage', () => {
  it('Expect to get item count = 9', () => {
    const result = selectItemCountPerPage(mockedState);
    const expected = 9;
    expect(result).toEqual(expected);
  });
});

describe('selectTotalCount', () => {
  it('Expect total item count = 2', () => {
    const result = selectTotalCount(mockedState);
    const expected = 1;
    expect(result).toEqual(expected);
  });
});

describe('selectSearch', () => {
  it('Expect to get search keywords is honda', () => {
    const result = selectSearch(mockedState);
    const expected = 'honda';
    expect(result).toEqual(expected);
  });
});

describe('selectCurrentPageInventory', () => {
  it('Expect to get first 9 items on first page', () => {
    const result = selectCurrentPageInventory(mockedState);
    const expected = 9;
    expect(result.size).toBeLessThanOrEqual(expected);
  });
});
