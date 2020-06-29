import calculateCost from '../calculateCost';

describe('calculateCost', () => {
  let storage;
  let cost;
  let expectedCost;
  it('calculates cost for lowest tier', () => {
    storage = 10;
    cost = 4000;
    expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
  });

  it('calculates cost for middle tier', () => {
    storage = 100;
    cost = 20000;
    expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
  });

  it('calculates cost for highest tier', () => {
    storage = 101;
    cost = 10100;
    expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
  });
});
