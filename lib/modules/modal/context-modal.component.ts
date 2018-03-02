import {
    Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnDestroy, OnInit, Renderer2,
    RendererFactory2, ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'w-context-modal',
    template: `
        <ng-container #container></ng-container>`
})
export class ContextModalComponent implements OnDestroy {
    @Input() x: number;
    @Input() y: number;
    @Input() component: any;

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private componentRef: ComponentRef<any>;

    constructor(private renderer: Renderer2, public el: ElementRef, private resolver: ComponentFactoryResolver) {
    }

    onWallInitialize() {
        const factory = this.resolver.resolveComponentFactory(this.component);

        this.componentRef = this.container.createComponent(factory);

        this.renderer.setStyle(this.el.nativeElement,
            'transform',
            `translate(0px, 0px)`
        );

        this.hideComponent();
    }

    updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.showComponent();

        this.renderer.setStyle(this.el.nativeElement,
            'transform',
            `translate(${this.x}px,  ${this.y}px)`
        );
    }

    ngOnDestroy() {
        this.componentRef.destroy();
    }

    private hideComponent() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
    }

    private showComponent() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
    }
}