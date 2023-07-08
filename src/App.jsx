import { useEffect, useState } from "react";
import "./App.css";
import data from "../MOCK_DATA.json";
import { nameFiltered, olderThan30Filtered, countryFiltered, salaryFiltered, childrenFiltering } from "./helpers/filteringFuncs";
const countryNames = [...new Set(data.map((item) => item.country).sort())];

function App() {
    const [filteredData, setFilteredData] = useState(data);
    const [filteringInputs, setFilteringInputs] = useState({
        nameQuery: "",
        olderThan30: false,
        country: "",
        minSalary: 500,
        oneChild: false,
        twoChildren: false,
        threeChildren: false,
    });

    // Use Effect
    useEffect(() => {
        filterItems();
    }, [filteringInputs]);

    // Func for useEffect
    const filterItems = () => {
        let dataCopy = structuredClone(data);
        let filteringResults = [];
        const { nameQuery, olderThan30, country, minSalary, oneChild, twoChildren, threeChildren } = filteringInputs;

        filteringResults = nameFiltered(dataCopy, nameQuery);
        if (olderThan30 === true) filteringResults = olderThan30Filtered(filteringResults, 30);
        if (country !== "") filteringResults = countryFiltered(filteringResults, country);
        filteringResults = salaryFiltered(filteringResults, minSalary);
        filteringResults = childrenFiltering(filteringResults, oneChild, twoChildren, threeChildren);
        setFilteredData(filteringResults);
    };

    // Event Handler
    const onNameInputChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, nameQuery: e.target.value }));
    };

    // Event Handler
    const onOlderThan30InputChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, olderThan30: e.target.checked }));
    };

    // Event Handler
    const onCountryChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, country: e.target.value }));
    };

    // Event Handler
    const onSalaryInputChange = (e) => {
        setMinSalary(e.target.value);
        setFilteringInputs((prev) => ({ ...prev, minSalary: e.target.value }));
    };

    // Event Handler
    const onOneChildInputChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, oneChild: e.target.checked }));
    };

    // Event Handler
    const onTwoChildrenInputChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, twoChildren: e.target.checked }));
    };

    // Event Handler
    const onThreeChildrenInputChange = (e) => {
        setFilteringInputs((prev) => ({ ...prev, threeChildren: e.target.checked }));
    };

    return (
        <>
            <section className="filter-bar__container">
                <p className="filter-bar--item">
                    <label>
                        <b>Name Search:</b>
                        <input type="text" name="nameFilter" id="" value={filteringInputs.nameQuery} onChange={onNameInputChange} />
                    </label>
                </p>
                <p className="filter-bar--item">
                    <label>
                        <b>Select Only Older Than 30 Years:</b>
                        <input
                            type="checkbox"
                            name="genderFilter"
                            id=""
                            value={filteringInputs.olderThan30}
                            onChange={onOlderThan30InputChange}
                        />
                    </label>
                </p>
                <p className="filter-bar--item">
                    <label htmlFor="">
                        Choose Countries
                        <select name="countries" id="" value={filteringInputs.country} onChange={onCountryChange}>
                            <option value="">Select</option>
                            {countryNames.map((countryName) => (
                                <option value={countryName.toLowerCase()}>{countryName}</option>
                            ))}
                        </select>
                    </label>
                </p>
                <p className="filter-bar--item" style={{ border: "1px soild red" }}>
                    <label htmlFor="">Minimum Salary:</label>
                    <br />
                    <input
                        type="range"
                        min="500"
                        max="10000"
                        step="500"
                        name=""
                        id=""
                        list="markers"
                        value={filteringInputs.minSalary}
                        onChange={onSalaryInputChange}
                    />
                    <datalist id="markers">
                        <option value="500" label="500"></option>
                        <option value="1500" label="1000"></option>
                        <option value="3000" label="3000"></option>
                        <option value="4500" label="4500"></option>
                        <option value="6000" label="6000"></option>
                        <option value="7500" label="7500"></option>
                        <option value="9000" label="9000"></option>
                        <option value="10000" label="10000"></option>
                    </datalist>
                </p>
                <p className="filter-bar--item">
                    <label>
                        <b>Select with 1 child:</b>
                        <input
                            type="checkbox"
                            name="genderFilter"
                            id=""
                            value={filteringInputs.oneChild}
                            onChange={onOneChildInputChange}
                        />
                    </label>
                </p>
                <p className="filter-bar--item">
                    <label>
                        <b>Select with 2 children:</b>
                        <input
                            type="checkbox"
                            name="genderFilter"
                            id=""
                            value={filteringInputs.twoChildren}
                            onChange={onTwoChildrenInputChange}
                        />
                    </label>
                </p>
                <p className="filter-bar--item">
                    <label>
                        <b>Select with 3 children:</b>
                        <input
                            type="checkbox"
                            name="genderFilter"
                            id=""
                            value={filteringInputs.threeChildren}
                            onChange={onThreeChildrenInputChange}
                        />
                    </label>
                </p>
            </section>
            <section className="searching-results">
                {filteredData.map((item, index) => (
                    <p key={index}>
                        <span>Country:</span>
                        <b>{item.country}</b>
                        <span>Children:</span>:<b>{item.children}</b>
                        <span>Age:</span>
                        <b>{item.age}</b>
                        <span>Salary</span>
                        <b>{item.salary}$</b>
                        <span>Name:</span>
                        <b>{item.name}</b>
                    </p>
                ))}
            </section>
        </>
    );
}

export default App;
