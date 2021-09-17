import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export class TypeDataSource extends MatTableDataSource<any> {

    addExpandedRows(initData) {
        const rows = [];
        initData.forEach(element => rows.push(element, {detailRow: true, element}));
        return rows;
    }

    constructor(initialData: any[]) {
        super(initialData);
        this.data = this.addExpandedRows(initialData);
    }

    sortData = (dataForSort, sort: MatSort) => {

    const active = sort.active;
    const direction = sort.direction;

    if (!active || direction === '') {
    return dataForSort;
    }

    const filtered = dataForSort.filter(item => {
        return !item.hasOwnProperty('detailRow');
    }).sort((a, b) => {
        const valueA = this.sortingDataAccessor(a, active);
        const valueB = this.sortingDataAccessor(b, active);

        // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
        // one value exists while the other doesn't. In this case, existing value should come first.
        // This avoids inconsistent results when comparing values to undefined/null.
        // If neither value exists, return 0 (equal).
        let comparatorResult = 0;
        if (valueA != null && valueB != null) {
          // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
            comparatorResult = 1;
        } else if (valueA < valueB) {
            comparatorResult = -1;
        }
        } else if (valueA != null) {
            comparatorResult = 1;
        } else if (valueB != null) {
            comparatorResult = -1;
        }

        return comparatorResult * (direction === 'asc' ? 1 : -1);
    });

        return this.addExpandedRows(filtered);
    }

}