const _ = require('lodash');
const Filter = ({ values, setFn, name, condition, sortBy }) => {
  return (
    <button
      className="filter-btn"
      onClick={() => {
        const selected = [condition];
        const result = values.filter((item) => selected.every((f) => f(item.info)));
        const nresult = _.orderBy(result, ['info.avgRating'], [sortBy]);
        setFn(nresult);
      }}
    >
      {name}
    </button>
  );
};
export default Filter;
