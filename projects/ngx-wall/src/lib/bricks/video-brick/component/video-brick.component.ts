import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ContextModalService} from '../../../modules/modal';
import {IOnWallFocus} from '../../../wall';
import {IVideoBrickState} from '../video-brick-state.interface';
import {InputContextComponent} from './input-context.component';

@Component({
    selector: 'video-brick',
    templateUrl: './video-brick.component.html'
})
export class VideoBrickComponent implements OnInit, IOnWallFocus {
    @Input() id: string;
    @Input() state: IVideoBrickState;

    @Output() stateChanges: EventEmitter<IVideoBrickState> = new EventEmitter();

    @ViewChild('iframe') iframe: ElementRef;

    // ui
    uiStates: any = {
        initial: 'initial',
        video: 'video'
    };

    uiState: string = this.uiStates.initial;

    scope: IVideoBrickState = {
        src: ''
    };

    videoSrcPlaceholderRef: NgbModalRef;

    constructor(private r: Renderer2,
                private el: ElementRef,
                private contextModalService: ContextModalService) {
    }

    ngOnInit() {
        if (this.state && this.state.src !== this.scope.src) {
            this.scope.src = this.state.src;

            if (this.scope.src) {
                this.uiState = this.uiStates.video;

                setTimeout(() => {
                    this.r.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }, 10);
            }
        }
    }

    onWallStateChange(newState: IVideoBrickState) {
        if (newState && newState.src !== this.scope.src) {
            this.scope.src = newState.src;

            if (this.scope.src) {
                this.uiState = this.uiStates.video;

                setTimeout(() => {
                    this.r.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }, 10);
            }
        }
    }

    onWallFocus(): void {
        if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
            setTimeout(() => {
                this.showVideoPanel();
            }, 0);
        }
    }

    applySrc(src: string) {
        this.uiState = this.uiStates.initial;

        if (src.length) {
            const srcArray = src.split('=');
            const youtubeId = srcArray[1];

            if (youtubeId) {
                this.scope.src = `https://www.youtube.com/embed/${youtubeId}`;

                this.r.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);

                this.save();

                this.uiState = this.uiStates.video;
            }
        }
    }

    showVideoPanel() {
        this.videoSrcPlaceholderRef = this.contextModalService.open({
            component: InputContextComponent,
            context: {
                relative: {
                    nativeElement: this.el.nativeElement
                }
            }
        });

        this.videoSrcPlaceholderRef.result.then((result) => {
            this.videoSrcPlaceholderRef = null;

            this.applySrc(result.src);
        }, () => {
            this.videoSrcPlaceholderRef = null;
        });
    }

    private save() {
        this.stateChanges.emit(this.scope);
    }
}
