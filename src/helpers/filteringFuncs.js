export const nameFiltered = (dataCopy, filteringCondition) => {
    return dataCopy.filter((dataItem) => dataItem.name.toLowerCase().includes(filteringCondition.toLowerCase()));
};

export const olderThan30Filtered = (dataCopy, filteringCondition) => {
    return dataCopy.filter((dataItem) => dataItem.age >= filteringCondition);
};

export const countryFiltered = (dataCopy, filteringCondition) => {
    return dataCopy.filter((dataItem) => dataItem.country.toLowerCase() === filteringCondition.toLowerCase());
};

export const salaryFiltered = (dataCopy, filteringCondition) => {
    return dataCopy.filter((dataItem) => dataItem.salary > filteringCondition);
};

export const childrenFiltering = (dataCopy, oneChild, twoChildren, threeChildren) => {
    if ([oneChild, twoChildren, threeChildren].every((element) => element === false)) return dataCopy;
    let childrenFilteredArr = [];
    if (threeChildren === true) childrenFilteredArr = [...childrenFilteredArr, ...dataCopy.filter((dataItem) => dataItem.children === 3)];
    if (twoChildren === true) childrenFilteredArr = [...childrenFilteredArr, ...dataCopy.filter((dataItem) => dataItem.children === 2)];
    if (oneChild === true) childrenFilteredArr = [...childrenFilteredArr, ...dataCopy.filter((dataItem) => dataItem.children === 1)];
    return childrenFilteredArr;
};
