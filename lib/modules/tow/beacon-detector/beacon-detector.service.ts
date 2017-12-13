import { Injectable } from '@angular/core';
import { IBeacon } from '../beacon/beacon.interface';
import { TOW } from '../tow.constant';
import { DetectedBeacon } from './detected-beacon';

@Injectable()
export class BeaconDetector {
    getNearestBeacon(beacons: IBeacon[], x: number, y: number): DetectedBeacon {
        const detected = new DetectedBeacon();

        beacons.forEach((currentBeacon) => {
            if (!detected.beacon) {
                // initialize first beacon
                detected.beacon = currentBeacon;
            } else {
                const currentBeaconPosition = this.getMinimumDistance(currentBeacon, x, y);
                const previousBeaconPosition = this.getMinimumDistance(detected.beacon, x, y);

                if (!previousBeaconPosition.pointInsideBeacon) {
                    if (currentBeaconPosition.pointInsideBeacon) {
                        detected.beacon = currentBeacon;
                    } else {
                        if (currentBeaconPosition.minDistanceToBeacon < previousBeaconPosition.minDistanceToBeacon) {
                            detected.beacon = currentBeacon;
                        }
                    }
                }
            }
        });

        if (detected.beacon) {
            if (x < detected.beacon.x) {
                detected.type = TOW.dropTypes.vertical;
                detected.side = TOW.dropSides.left;
            }

            if (x > detected.beacon.x + detected.beacon.width) {
                detected.type = TOW.dropTypes.vertical;
                detected.side = TOW.dropSides.right;
            }

            if (x > detected.beacon.x && x < detected.beacon.x + detected.beacon.width) {
                detected.type = TOW.dropTypes.horizontal;

                const centerYPosition = detected.beacon.y + (detected.beacon.height / 2);

                detected.side = y < centerYPosition ? TOW.dropSides.top : TOW.dropSides.bottom;
            }
        }

        return detected;
    }

    private getMinimumDistance(beacon: IBeacon, x: number, y: number) {
        const position = {
            minDistanceToBeacon: null,
            pointInsideBeacon: false
        };

        // distances to horizontal lines
        const distanceToLine12 = Math.abs(beacon.y - y);
        const distanceToLine43 = Math.abs((beacon.y + beacon.height) - y);

        // distances to vertical lines
        const distanceToLine14 = Math.abs(beacon.x - x);
        const distanceToLine23 = Math.abs((beacon.x + beacon.width) - x);

        const minDistanceToHorizontalLine = Math.min.apply(null, [distanceToLine12, distanceToLine43]);
        const minDistanceToVerticalLine = Math.min.apply(null, [distanceToLine14, distanceToLine23]);

        if ((x > beacon.x) && (x < beacon.x + beacon.width)) {
            // point directly cross the beacon
            position.minDistanceToBeacon = minDistanceToHorizontalLine;
        } else if ((y > beacon.y) && (y < beacon.y + beacon.height)) {
            // point directly cross the beacon
            position.minDistanceToBeacon = minDistanceToVerticalLine;
        } else {
            // point doesn't cross beacon, calculate shortest distance to beacon
            position.minDistanceToBeacon = Math.sqrt(
                minDistanceToHorizontalLine *
                minDistanceToHorizontalLine +
                minDistanceToVerticalLine *
                minDistanceToVerticalLine
            );
        }

        if ((x > beacon.x) && (x < beacon.x + beacon.width) && (y > beacon.y) && (y < beacon.y + beacon.height)) {
            position.pointInsideBeacon = true;
        }

        return position;
    }
}
