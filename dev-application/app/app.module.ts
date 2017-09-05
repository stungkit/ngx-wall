import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderBrickModule, ImgBrickModule, TextBrickModule, WALL_PLUGIN, WallApi, WallModule } from 'wall';

@Injectable()
class LoggerPlugin {
    constructor(wallApi: WallApi) {
        wallApi.registerFeatureApi('logger', {
            log: function (message: string) {
                console.log(message);
            }
        });
    }
}

@Injectable()
class EventLoggerPlugin {
    constructor(wallApi: WallApi) {
        wallApi.core.subscribe((event: any) => {
            wallApi.features.logger.log(event);
        });
    }
}

@NgModule({
    imports: [
        WallModule,
        TextBrickModule,
        HeaderBrickModule,
        ImgBrickModule,
        CommonModule,
        BrowserModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: WALL_PLUGIN, useValue: LoggerPlugin, multi: true
        },
        {
            provide: WALL_PLUGIN, useValue: EventLoggerPlugin, multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}