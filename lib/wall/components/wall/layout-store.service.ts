import {Injectable} from '@angular/core';
import {ILayoutDefinition} from '../../wall.interfaces';
import {BrickRegistry} from '../../registry/brick-registry.service';
import {BrickStore} from './brick-store.service';

@Injectable()
export class LayoutStore {
    constructor(private brickRegistry: BrickRegistry, private brickStore: BrickStore) {

    }

    layout: ILayoutDefinition = null;

    canvasLayout: any = {
        bricks: []
    };

    initialize(layout: ILayoutDefinition) {
        this.layout = layout;

        this.updateCanvasLayout();
    }

    updateCanvasLayout() {
        this.canvasLayout = {
            bricks: this.layout.bricks.map((row) => {
                return {
                    columns: row.columns.map((column) => {
                        return {
                            bricks: column.bricks.map((brick) => {
                                const brickTag = this.brickStore.getBrickTagById(brick.id);

                                return {
                                    id: brick.id,
                                    component: this.brickRegistry.get(brickTag).component
                                };
                            })
                        }
                    })
                }
            })
        };
    }

    serialize() {
        return this.layout;
    }

    addBrick(brickId: string, targetRowIndex: number, targetColumnIndex: number, positionIndex: number) {
        let row = this.layout.bricks[targetRowIndex];
        let column = row.columns[targetColumnIndex];


        // column should already exist,  it's wall.model responsibility to check

        /*if (!column) {
            positionIndex = 0;

            const siblingColumn = row.columns[targetColumnIndex - 1];

            if (siblingColumn.bricks.length === 0) {
                column = siblingColumn;
            } else {
                column = row.columns[row.columns.length] = {
                    bricks: []
                };
            }
        }*/

        const brick = {
            id: brickId
        };

        column.bricks.splice(positionIndex, 0, brick);

        this.updateCanvasLayout();
    }

    addBrickToNewRow(brickId: string, targetRowIndex: number) {
        this.createNewRow(targetRowIndex);

        this.addBrick(brickId, targetRowIndex, 0, 0);
    }

    addBrickToNewColumn(brickId: string, targetRowIndex: number, targetColumnIndex: number) {
        this.createNewColumn(targetRowIndex, targetColumnIndex);

        this.addBrick(brickId, targetRowIndex, targetColumnIndex, 0);
    }

    addBrickAfterInSameColumn(siblingBrickId: string, brickId: string) {
        const brickPosition = this.getBrickPositionByBrickId(siblingBrickId);

        this.addBrick(brickId, brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex + 1);
    }

    removeBrick(brickId: string) {
        const brickPosition = this.getBrickPositionByBrickId(brickId);

        const row = this.layout.bricks[brickPosition.rowIndex];
        const column = row.columns[brickPosition.columnIndex];

        // remove brick
        column.bricks.splice(brickPosition.brickIndex, 1);

        // remove column if there are no bricks inside
        if (column.bricks.length === 0) {
            row.columns.splice(brickPosition.columnIndex, 1);

            // remove row if there are no columns inside
            if (row.columns.length === 0) {
                this.layout.bricks.splice(brickPosition.rowIndex, 1);

                // if there are no rows, create default
                if (this.layout.bricks.length === 0) {
                    this.layout.bricks.push({
                        columns: [{
                            bricks: []
                        }]
                    });
                }
            }
        }

        this.updateCanvasLayout();
    }

    /*Helpers*/
    isRowExists(targetRowIndex: number): boolean {
        return Boolean(this.layout.bricks[targetRowIndex]);
    }

    isColumnExist(targetRowIndex: number, targetColumnIndex: number): boolean {
        return this.isRowExists(targetRowIndex) && Boolean(this.layout.bricks[targetRowIndex].columns[targetColumnIndex]);
    }

    getRowCount() {
        return this.layout.bricks.length;
    }

    getColumnCount(targetRowIndex: number): number {
        return this.layout.bricks[targetRowIndex].columns.length;
    }

    getLastBrickId() {
        const lastRow = this.layout.bricks[this.layout.bricks.length - 1];

        if (lastRow.columns.length === 1) {
            const lastBrick = lastRow.columns[0].bricks[lastRow.columns[0].bricks.length - 1];

            return lastBrick && lastBrick.id;
        } else {
            return null;
        }
    }

    /*
    * return previous brick in the same column or try to return last brick id in previous row if there are only one column
    * */
    getBeforeBrickId(brickId: string) {
        const brickPosition = this.getBrickPositionByBrickId(brickId);

        if (brickPosition.brickIndex > 0) {
            // take previous brick id in the same column
            return this.layout.bricks[brickPosition.rowIndex].columns[brickPosition.columnIndex].bricks[brickPosition.brickIndex - 1].id;
        } else {
            if (brickPosition.rowIndex > 0) {
                // try to take last brick id in previous row if there are only one column
                const previousRow = this.layout.bricks[brickPosition.rowIndex - 1];

                if (previousRow.columns.length === 1) {
                    const onlySingleColumn = previousRow.columns[0];

                    return onlySingleColumn.bricks[onlySingleColumn.bricks.length - 1].id;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    getBrickPositionByBrickId(brickId: string) {
        const brickPosition = {
            rowIndex: null,
            columnIndex: null,
            brickIndex: null
        };

        let i = 0;

        while (brickPosition.rowIndex === null && i < this.layout.bricks.length) {
            this.layout.bricks[i].columns.forEach((column, columnIndex) => {
                let brickIndex = null;

                column.bricks.forEach((brick, index) => {
                    if (brick.id === brickId) {
                        brickIndex = index;
                    }
                });

                if (brickIndex || brickIndex === 0) {
                    brickPosition.rowIndex = i;
                    brickPosition.columnIndex = columnIndex;
                    brickPosition.brickIndex = brickIndex;
                }
            });

            i++;
        }

        return brickPosition;
    }

    private createNewRow(targetRowIndex: number): void {
        this.layout.bricks.splice(targetRowIndex, 0, this.initializeNewRow());
    }

    private createNewColumn(targetRowIndex: number, targetColumnIndex: number): void {
        this.layout.bricks[targetRowIndex].columns.splice(targetColumnIndex, 0, this.initializeNewColumn());
    }

    private initializeNewRow() {
        return {
            columns: [
                this.initializeNewColumn()
            ]
        };
    }

    private initializeNewColumn() {
        return {
            bricks: []
        }
    }
}