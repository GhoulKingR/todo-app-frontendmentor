import "./FilterOptions.css";

function FilterOptions({ setFilterType, filterType, darkMode }) {
  return (
    <>
      <div
        className={"filterOptions__div" + (darkMode ? " dark" : "")}
        style={filterType == 0 ? { color: "#3A7CFD" } : {}}
        onClick={() => setFilterType(0)}
      >
        All
      </div>
      <div
        className={"filterOptions__div" + (darkMode ? " dark" : "")}
        style={filterType == 1 ? { color: "#3A7CFD" } : {}}
        onClick={() => setFilterType(1)}
      >
        Active
      </div>
      <div
        className={"filterOptions__div" + (darkMode ? " dark" : "")}
        style={filterType == 2 ? { color: "#3A7CFD" } : {}}
        onClick={() => setFilterType(2)}
      >
        Completed
      </div>
    </>
  );
}

export default FilterOptions;
