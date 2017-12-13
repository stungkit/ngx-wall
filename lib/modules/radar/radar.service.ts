import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { RadarCoordinator } from './radar-coordinator.service';

@Injectable()
export class Radar {
    private events: Subject<any> = new Subject();

    constructor(private radarCoordinator: RadarCoordinator) {
        this.radarCoordinator.subscribe((event) => {
            this.events.next(event);
        });
    }

    subscribe(fn: any): Subscription {
        return this.events.subscribe(fn);
    }
}
