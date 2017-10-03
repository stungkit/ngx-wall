import {Component} from '@angular/core';
import {IWallConfiguration, IWallDefinition, WALL, WallApi} from 'wall';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    plan: any = null;

    wallApi: WallApi = null;

    wallConfiguration: IWallConfiguration = {
        mode: WALL.MODES.EDIT,

        onRegisterApi: this.onRegisterApi.bind(this)
    };

    wallPlan: IWallDefinition = {
        "bricks": [
            {
                "id": "46d291d5-b057-8798-00af-ed9ba015fcda",
                "tag": "header",
                "data": {
                    "text": "WALL"
                },
                "meta": {}
            },
            {
                "id": "5cb0d4dd-24fa-de29-8785-619747830add",
                "tag": "text",
                "data": {
                    "text": "The goal of the project is to create extensible web editor which provides clear and simple API for adding new type of editors (bricks) based on Angular components."
                },
                "meta": {}
            },
            {
                "id": "9f8e4cb8-d632-71b1-a1cc-89bf3ff8c96f",
                "tag": "header",
                "data": {
                    "text": "Navigation\n"
                },
                "meta": {}
            },
            {
                "id": "a3acc3a3-53d5-70ec-b374-90d6d39e2743",
                "tag": "text",
                "data": {
                    "text": "Press `Escape` to enter to Selection mode"
                },
                "meta": {}
            },
            {
                "id": "20307eb4-6c6a-0481-cf3d-af2c17b0487e",
                "tag": "text",
                "data": {
                    "text": "Press Shift to select few bricks"
                },
                "meta": {}
            },
            {
                "id": "2d7f65b4-ea8a-a86c-e99c-dd57c858d58d",
                "tag": "header",
                "data": {
                    "text": "Roadmap\n"
                },
                "meta": {}
            },
            {
                "id": "4edc3d51-cf7c-6648-a4fe-fe9418ea6c17",
                "tag": "text",
                "data": {
                    "text": "- improve drag and drop handler"
                },
                "meta": {}
            },
            {
                "id": "74928e82-54d8-c166-1e17-0de2b174bb02",
                "tag": "text",
                "data": {
                    "text": "- support few editors on the page"
                },
                "meta": {}
            },
            {
                "id": "0a182d45-04c0-3852-7899-9ad9fc90d6a2",
                "tag": "text",
                "data": {
                    "text": "- support readonly mode"
                },
                "meta": {}
            },
            {
                "id": "a855168e-2e86-8c59-24bc-a7a6f0c3245d",
                "tag": "header",
                "data": {
                    "text": "Supported tags\n"
                },
                "meta": {}
            },
            {
                "id": "a587554d-5698-8988-0039-ae1db771695e",
                "tag": "text",
                "data": {
                    "text": "/h header brick"
                },
                "meta": {}
            },
            {
                "id": "1147c417-c1ad-2550-7d96-bc5bd02470cb",
                "tag": "text",
                "data": {
                    "text": "/img image brick"
                },
                "meta": {}
            },
            {
                "id": "dc8a4548-54b6-c341-ded0-4d32e5b81211",
                "tag": "img",
                "data": {
                    "src": "https://cdn3.volusion.com/mache.udhvk/v/vspfiles/photos/M8994-PARENT-2.jpg"
                },
                "meta": {}
            }
        ],
        "layout": {
            "bricks": [
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "46d291d5-b057-8798-00af-ed9ba015fcda"
                                },
                                {
                                    "id": "5cb0d4dd-24fa-de29-8785-619747830add"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "9f8e4cb8-d632-71b1-a1cc-89bf3ff8c96f"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "a3acc3a3-53d5-70ec-b374-90d6d39e2743"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "20307eb4-6c6a-0481-cf3d-af2c17b0487e"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "2d7f65b4-ea8a-a86c-e99c-dd57c858d58d"
                                },
                                {
                                    "id": "4edc3d51-cf7c-6648-a4fe-fe9418ea6c17"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "74928e82-54d8-c166-1e17-0de2b174bb02"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "0a182d45-04c0-3852-7899-9ad9fc90d6a2"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "a855168e-2e86-8c59-24bc-a7a6f0c3245d"
                                },
                                {
                                    "id": "a587554d-5698-8988-0039-ae1db771695e"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "1147c417-c1ad-2550-7d96-bc5bd02470cb"
                                }
                            ]
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "bricks": [
                                {
                                    "id": "dc8a4548-54b6-c341-ded0-4d32e5b81211"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };

    onRegisterApi(wallApi: WallApi) {
        this.wallApi = wallApi;

        this.plan = wallApi.core.getPlan();

        // subscribe to all core events
        wallApi.core.subscribe((event: any) => {
            // update current plan
            this.plan = wallApi.core.getPlan();
        });
    }
}