import './FilterTest.css';

import { Heading_3 } from '../../ui/Headings';

const FilterTest = ({
  disable,
  setDisable,
  setShowFilter,
  typeTest,
  setTypeTest,
  params,
  setParams,
}) => {
  return (
    <div className="filter-test-modal">
      <button onClick={() => setShowFilter(false)} className="close-filter-button">
        X
      </button>
      <div className="tests-filters-modal">
        <div className="test-filters-type">
          <Heading_3 text="TEST TYPE" weigth="600" size="16px" />
          <button
            onClick={() => {
              setTypeTest('featuredtests');
              setParams({ ...params, page: 1 });
              {
                typeTest === 'generictests' ? setDisable(true) : setDisable(false);
              }
            }}
            disabled={disable ? true : false}
          >
            Featured Tests
          </button>
          <button
            onClick={() => {
              setTypeTest('generictests');
              setParams({ ...params, page: 1 });
              {
                typeTest === 'featuredtests' ? setDisable(true) : setDisable(false);
              }
            }}
            disabled={disable ? true : false}
          >
            Generic Tests
          </button>
        </div>

        <div
          className="tests_order_container"
          onChange={(e) => setParams({ ...params, order: e.target.value, page: 1 })}
        >
          <Heading_3 text="FILTER BY" weigth="600" size="16px" />
          <div className="order-test">
            <input
              type="radio"
              id="times_played"
              name="order"
              value="times_played"
              defaultChecked
            />
            <label htmlFor="times_played">Most Popular</label>
          </div>
          <div className="order-test">
            <input type="radio" id="creator" name="order" value="created" />
            <label htmlFor="creator">Latest</label>
          </div>
          <div className="order-test">
            <input type="radio" id="favorites" name="order" value="favorites" />
            <label htmlFor="favorites">Best Rated</label>
          </div>
        </div>
        <div
          className="tests_order_container"
          onChange={(e) => {
            setParams({ ...params, mode: e.target.value, page: 1 });
          }}
        >
          <Heading_3 text="ORDER" weigth="600" size="16px" />
          <div className="order-test">
            <input type="radio" id="ascending" name="mode" value="-1" defaultChecked />
            <label htmlFor="ascending">Ascending</label>
          </div>
          <div className="order-test">
            <input type="radio" id="descending" name="mode" value="1" />
            <label htmlFor="descending">Descending</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTest;
