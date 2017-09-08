import { Inject, Injectable } from '@angular/core';
import { WallApi } from '../../components/wall/wall-api.service';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SelectionPlugin {
    doc: any = null;

    constructor(private wallApi: WallApi,
                @Inject(DOCUMENT) doc) {
        this.doc = doc;

        this.initialize();
    }

    initialize() {
        this.doc.addEventListener('click', (e) => {
            this.wallApi.core.unSelectBricks();
        });

        this.doc.addEventListener('keydown', (e) => {
            const selectedBrickIds = this.wallApi.core.getSelectedBrickIds();
            const firstSelectedBrickId = selectedBrickIds[0];
            const lastSelectedBrickId = selectedBrickIds[selectedBrickIds.length - 1];

            if (e.key === 'Delete' && selectedBrickIds.length) {
                e.preventDefault();

                this.wallApi.core.unSelectBricks();

                this.wallApi.core.removeBricks(selectedBrickIds);
            }

            if (e.key === 'Enter' && selectedBrickIds.length) {
                e.preventDefault();

                this.wallApi.core.focusOnBrickId(firstSelectedBrickId);

                this.wallApi.core.unSelectBricks();
            }

            if (e.key === 'ArrowUp' && selectedBrickIds.length) {
                e.preventDefault();

                const previousBrickId = this.wallApi.core.getPreviousBrickId(lastSelectedBrickId);

                if (previousBrickId) {
                    if (e.shiftKey) {
                        if (selectedBrickIds.length > 1 && this.isDownSelectionDirection()) {
                            this.wallApi.core.removeBrickFromSelection(lastSelectedBrickId);
                        } else {
                            this.wallApi.core.addBrickToSelection(previousBrickId);
                        }
                    } else {
                        this.wallApi.core.selectBrick(previousBrickId);
                    }
                }
            }

            if (e.key === 'ArrowDown' && selectedBrickIds.length) {
                e.preventDefault();

                const nextBrickId = this.wallApi.core.getNextBrickId(lastSelectedBrickId);

                if (nextBrickId) {
                    if (e.shiftKey) {
                        if (selectedBrickIds.length > 1 && !this.isDownSelectionDirection()) {
                            this.wallApi.core.removeBrickFromSelection(lastSelectedBrickId);
                        } else {
                            this.wallApi.core.addBrickToSelection(nextBrickId);
                        }
                    } else {
                        this.wallApi.core.selectBrick(nextBrickId);
                    }
                }
            }

            if (e.key === 'Escape') {
                e.preventDefault();

                if (selectedBrickIds.length) {
                    this.wallApi.core.focusOnBrickId(firstSelectedBrickId);
                    this.wallApi.core.unSelectBricks();
                }

                const focusedBrickId = this.wallApi.core.getFocusedBrickId();

                if (focusedBrickId) {
                    this.wallApi.core.selectBrick(focusedBrickId);
                }
            }
        });
    }

    private isDownSelectionDirection() {
        const selectedBrickIds = this.wallApi.core.getSelectedBrickIds();

        const bricksCount = selectedBrickIds.length;

        const lastBrickId = selectedBrickIds[bricksCount - 1];
        const penultimateBrickId = selectedBrickIds[bricksCount - 2];

        return this.wallApi.core.isBrickAheadOf(penultimateBrickId, lastBrickId);
    }
}