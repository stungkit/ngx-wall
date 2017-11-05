import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallComponent } from './components/wall/wall.component';
import { BrickRegistry } from './registry/brick-registry.service';
import { WallCanvasComponent } from './components/wall-canvas/wall-canvas.component';
import { WallCanvasRowComponent } from './components/wall-canvas/components/wall-canvas-row/wall-canvas-row.component';
import { WallCanvasBrickComponent } from './components/wall-canvas/components/wall-canvas-brick/wall-canvas-brick.component';
import { WALL_PLUGIN } from './wall.tokens';
import { SelectionPlugin } from './plugins/selection/selection';
import { PickOutModule } from '../modules/pick-out';
import { TowModule } from '../modules/tow';
import { RadarModule } from "../modules/radar";
import { WallModelFactory } from "./model/wall-model.factory";

@NgModule({
    imports: [
        CommonModule,
        PickOutModule,
        TowModule,
        RadarModule
    ],

    providers: [
        BrickRegistry,
        WallModelFactory,
        {
            provide: WALL_PLUGIN, useValue: SelectionPlugin, multi: true
        }
    ],

    declarations: [
        WallComponent,
        WallCanvasComponent,
        WallCanvasRowComponent,
        WallCanvasBrickComponent
    ],

    exports: [
        WallComponent
    ]
})
export class WallModule {
}
