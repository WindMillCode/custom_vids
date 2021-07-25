import { Component,OnInit, Input, ViewChildren, AfterViewInit, Inject, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { RyberService } from '../ryber.service';
import { fromEvent, interval, of, from, Observable, merge, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { catchError, take, timeout, mapTo, debounceTime, distinctUntilChanged, debounce, first, ignoreElements, tap, delay } from 'rxjs/operators';
import {
    zChildren, getTextWidth, numberParse,
    xPosition, resize, componentBootstrap, deltaNode,
    eventDispatcher, dropdown, dragElement, stack, xContain, minMaxDelta,
    objectCopy, responsiveMeasure, flatDeep
} from '../customExports'
import { environment as env } from '../../environments/environment'

@Component({
    selector: 'app-form',
    templateUrl: '../template.component.html',
    // styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit  , AfterViewInit, OnDestroy {


    @ViewChildren('myVal', {read:ElementRef}) templateMyElements: any;

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
        private renderer2: Renderer2,
    ) { }

    @Input() appTV:string | any;
    foo:any= {}
    typesES:string = 'formES'
    CONumber:Generator = (function(){
        return function *generator() {
            var index = 0;
            while (true)
            yield index++;
        }()
    })()

    ngOnInit():void {
        if(env.lifecycleHooks) console.log(this.appTV+ 'ngOnInit fires on mount')
    }



    ngAfterViewInit(): void {

        // listen for element changes

        //



        this._fpm();

    }

    private _fpm() {
        if (env.inputHandle.options)
            console.groupEnd();
        if (env.lifecycleHooks)
            console.log(this.appTV + 'ngAfterViewInit fires one remount');
        //
        // FPM for each component
        this.ryber['formCO']
            .forEach((xx, ii) => {


                if (xx !== this.appTV) {
                    return;
                }

                let zChild = this.zChildInit();
                let topLevelZChild = this._topLevelZChildInit();
                let latchZChild;
                let staticZKeys = this.staticZKeysGen(zChild);
                if (env.component.form.zChild === ii) {
                    console.log(zChild);
                }


                // drags elements for you
                // this.toPlace(zChild)
                //
                // highlights
                // this.highlights(zChild,2)
                //
                // giving inputHandle what it needs
                this.directivesSendData({
                    directivesZChild: zChild,
                    random: Math.random(),
                    templateMyElements: this.templateMyElements,
                    ref: this.ref
                });
                //
                /*  format factory
                so here are 3 options,
                    handle, the framework builds it out for use
                    flex, flex options 1-6 to divy how many elements  on one line
                        they will be fractions, 1/6 - 6/6 the size of our section
                    custom: not a general options to the line, its specific to an element
                        if the framework sees a  height and width, use those then the browser values

                for our section left, 90 , width 1085
                    for our section with its 1085 for a a total of 1175px document.dir = "ltr"

                    x- spacing is 90

                    if the section type is handle (this can go on body metafield cms), were going to be formatting ourselves
                    we add to the stack and once width + left is greater than 1175, the element goes to the next row
                        should we flush center, should  we keep left should we extend to fill the gap to justify
                            these can be options, but I think by default we should justify

                    split - the width can be bet determined by split/6
                    next - start zChild on the next stacking context
                */
                let section: any = zChild["&#8353"]?.extras?.section;

                if (section === undefined) {
                    section = objectCopy(this.ryber.appCO0.metadata.sectionDefault);
                }

                else {
                    let sectionDefault: any = objectCopy(this.ryber.appCO0.metadata.ryber.sectionDefault);
                    section['gap'] !== undefined ? section['gap'] : sectionDefault.gap;
                    section['left'] !== undefined ? section['left'] : sectionDefault.left;
                    section['width'] !== undefined ? section['width'] : sectionDefault.width;
                    section['split'] !== undefined ? section['split'] : sectionDefault.split;
                    section['stack'] !== undefined ? section['stack'] : sectionDefault.stack;
                }

                Object.keys(section)
                    .forEach((x, i) => {
                        section[x] = +section[x];
                    });

                section.area = section.left + section.width;
                // console.log(section)
                //grabbing the values how the browser renders them
                this.ryber[this.appTV.valueOf()].metadata.order = this.ryber[this.appTV.valueOf()].metadata.order
                    .filter((x: any, i) => {
                        if (zChild[x].extras.appNest !== undefined) {
                            if (zChild[x].extras.appNest.nestUnder !== undefined &&
                                zChild[x].extras.appNest.nestGroup !== undefined) {
                                return false;
                            }
                        }
                        return true;
                    });
                // console.log(this.ryber[this.appTV.valueOf()].metadata.order)
                this.ryber[this.appTV.valueOf()].metadata.order
                    .forEach((x, i) => {
                        let defaultClientRect = zChild[x].element.getBoundingClientRect();
                        zChild[x].cssDefault["height"] = defaultClientRect.height.toString() + "px";
                        zChild[x].cssDefault["width"] = defaultClientRect.width.toString() + "px";
                        zChild[x].cssDefault["left"] = defaultClientRect.left.toString() + "px";
                        zChild[x].cssDefault["top"] = defaultClientRect.top.toString() + "px";
                        this.ref.detectChanges();
                    });
                //
                //applying end user values
                let keep = [];
                let keepCurrent = [];
                let keepLast = Object.keys(zChild).slice(1, 2)[0];
                let align = [];
                let alignCurrent = [];
                let myTotal = 0;
                this.ryber[this.appTV.valueOf()].metadata.order
                    .forEach((x, i) => {
                        let { component } = zChild[x].extras;
                        Object.keys(component)
                            .forEach((y, j) => {
                                let a = component[y];
                                if (!isNaN(a)) {
                                    component[y] = +(component[y]);
                                }

                            });


                        zChild[x].css["height"] = (component.height !== undefined) ? (component.height).toString() + "px" : zChild[x].cssDefault["height"];
                        zChild[x].css["width"] = (component.width !== undefined) ? (component.width).toString() + "px" : zChild[x].cssDefault["width"];
                        zChild[x].css["left"] = (component.left !== undefined) ? (component.left).toString() + "px" : zChild[x].cssDefault["left"];
                        zChild[x].css["top"] = (component.top !== undefined) ? (component.top).toString() + "px" : zChild[x].cssDefault["top"];
                        if (zChild[x]?.css?.["width"] !== undefined) {
                            if (numberParse(zChild[x].css["width"]) > section.width) {
                                zChild[x].css["width"] = section.width.toString() + "px";
                            }
                        }

                        //determine width
                        myTotal += component.split === undefined ? numberParse(zChild[x].css["width"]) : ((component.split / section.split) * section.width);

                        if (component.split === section.split) {
                            zChild[x].css["width"] = component.split === undefined ? zChild[x].css["width"] : (((component.split / section.split) * section.width)).toString() + "px";
                        }
                        else {
                            zChild[x].css["width"] = component.split === undefined ? zChild[x].css["width"] : (((component.split / section.split) * section.width) - section.gap).toString() + "px";
                        }

                        keepCurrent.push([x, keepLast]);
                        alignCurrent.push(x);
                        //
                        if ((zChild[x].bool !== "ta" || zChild[x].bool !== "i" || zChild[x].bool !== "date") && component.height === undefined) {
                            zChild[x].css["height"] = null;
                            this.ref.detectChanges();
                            zChild[x].css["height"] = zChild[x].element.getBoundingClientRect().height.toString() + "px";
                            this.ref.detectChanges();
                        }




                        //stacking context
                        if ((myTotal > section.width && i !== Object.keys(topLevelZChild).slice(2).length - 1) || (component.next === "true" && i !== Object.keys(topLevelZChild).slice(2).length - 1)) {
                            // console.log('a')
                            // mySplit = 0
                            myTotal = numberParse(topLevelZChild[x].css["width"]);
                            let a = keepCurrent.pop();
                            keep.push(...keepCurrent);
                            keepLast = keepCurrent
                                .reduce((acc, y, j) => {
                                    // console.log(y[0],topLevelZChild[y[0]].css["height"],acc)
                                    if (numberParse(topLevelZChild[y[0]].css["height"]) > acc[1]) {
                                        acc = [y[0], numberParse(topLevelZChild[y[0]].css["height"])];
                                    }
                                    return acc;
                                }, ["", 0])[0];
                            // console.log(keepCurrent)
                            // console.log(keepLast)
                            keepCurrent = [[a[0], keepLast]];
                            let b = alignCurrent.pop();
                            align.push(alignCurrent);
                            alignCurrent = [b];
                        }

                        else if ((myTotal < section.width && i === Object.keys(topLevelZChild).slice(2).length - 1) && (component.next !== "true")) {
                            // mySplit = 0
                            // console.log('b')
                            myTotal = numberParse(topLevelZChild[x].css["width"]);
                            keep.push(...keepCurrent);
                            keepLast = keepCurrent
                                .reduce((acc, y, j) => {
                                    return numberParse(topLevelZChild[y[0]].css["height"]) > acc[1] ?
                                        [y[0], numberParse(topLevelZChild[y[0]].css["height"])] :
                                        acc;
                                }, ["", 0])[0];
                            keepCurrent = [];
                            align.push(alignCurrent);
                            alignCurrent = [];
                        }

                        else if ((i === Object.keys(topLevelZChild).slice(2).length - 1) || (component.next === "true")) {
                            // console.log('c')
                            myTotal = numberParse(topLevelZChild[x].css["width"]);
                            let a = keepCurrent.pop();
                            keep.push(...keepCurrent);
                            keepLast = keepCurrent
                                .reduce((acc, y, j) => {
                                    return numberParse(topLevelZChild[y[0]].css["height"]) > acc[1] ?
                                        [y[0], numberParse(topLevelZChild[y[0]].css["height"])] :
                                        acc;
                                }, ["", 0])[0];
                            // console.log(keepLast)
                            keepCurrent = [[a[0], keepLast]];
                            keep.push(...keepCurrent);
                            let b = alignCurrent.pop();
                            align.push(alignCurrent);
                            alignCurrent = [b];
                            align.push(alignCurrent);
                        }
                        //
                    });

                align
                    .forEach((x, i) => {
                        let gaps = ((section.width) -
                            x.reduce((acc, y, j) => {
                                acc += numberParse(zChild[y].css["width"]);
                                return acc;
                            }, 0)) / (x.length - 1);
                        let gapType = x.reduce((acc, y, j) => {
                            acc += numberParse(zChild[y].css["width"]) + (
                                zChild[y].extras?.component?.split === undefined || zChild[y].extras?.component?.split === 6 ? 0 : section.gap
                            );
                            return acc;
                        }, 0);
                        x
                            .forEach((y, j) => {
                                //determine left
                                if (zChild[y].extras?.component?.left !== undefined) {
                                    return;
                                }
                                if (j === 0) {
                                    zChild[y].css["left"] = section.left + "px";
                                    // console.log(zChild[y].css["left"])
                                }
                                else {

                                    zChild[y].css["left"] = (
                                        numberParse(zChild[x[j - 1]].css["left"]) +
                                        numberParse(zChild[x[j - 1]].css["width"]) +
                                        // section.gap
                                        (gapType >= section.width - 300 ? gaps : section.gap)
                                    ).toString() + "px";
                                }
                                //
                            });

                    });
                this.ref.detectChanges();

                //making sure values are true to the DOM
                staticZKeys
                    .forEach((x, i) => {
                        zChild[x].css["height"] = (zChild[x].element.getBoundingClientRect().height).toString() + "px";
                        zChild[x].css["width"] = (zChild[x].element.getBoundingClientRect().width).toString() + "px";
                        zChild[x].cssDefault["height"] = zChild[x].css["height"];
                        zChild[x].cssDefault["width"] = zChild[x].css["width"];
                        zChild[x].cssDefault["left"] = zChild[x].css["left"];
                        zChild[x].cssDefault["top"] = zChild[x].css["top"];
                    });
                this.ref.detectChanges();

                //
                //init   buttons
                let group = this.ryber[this.appTV.valueOf()].metadata.multipleGroup;
                // console.log(group)
                //more init
                let cmsZKeys = this.ryber[this.appTV.valueOf()].metadata.order;
                let { refresh } = this.ryber[this.appTV.valueOf()].metadata;
                //
                // refresh (sigs and more in the fture) setup
                cmsZKeys
                    .forEach((x, i) => {
                        if (zChild[x]?.extras?.refresh?.group !== undefined ||
                            zChild[x]?.extras?.refresh?.clear !== undefined) {
                            let refreshKey = zChild[x]?.extras?.refresh?.group !== undefined ? [zChild[x]?.extras?.refresh?.group, "group"] : [zChild[x]?.extras?.refresh?.clear, "clear"];

                            if (refresh[refreshKey[0].valueOf()] === undefined) {
                                refresh[refreshKey[0].valueOf()] = {
                                    control: refreshKey[1] === "clear" ? [x] : [],
                                    targets: refreshKey[1] === "group" ? [x] : []
                                };
                            }
                            else {
                                refreshKey[1] === "clear" ? refresh[refreshKey[0].valueOf()].control.push(x) : null;
                                refreshKey[1] === "group" ? refresh[refreshKey[0].valueOf()].targets.push(x) : null;
                            }
                        }
                    });
                Object
                    .values(refresh)
                    .forEach((x: any, i) => {
                        x.control
                            .forEach((y, j) => {
                                this.ryber.appEvents({
                                    typesES: this.typesES,
                                    event: 'click',
                                    of: fromEvent(zChild[y].element, 'click')
                                        .subscribe(() => {
                                            x.targets
                                                .forEach((y, j) => {
                                                    zChild[y].extras.appSignPad?.sPad.clear();
                                                });
                                        })
                                });
                            });

                    });
                //
                //stack spacing setup
                // console.log(align)
                let spacing = [null,
                    ...Array.from(align[0], (x, i) => { return 50; }),
                    ...Array.from(align[1] !== undefined && align[0].length <= 1 ? align[1] : Array(0), (x, i) => { return 50; }), section.stack
                ];
                cmsZKeys
                    .forEach((x: any, i) => {
                        if (zChild[x].extras.component.top !== undefined) {
                            spacing[i + 1] = zChild[x].extras.component.top;
                        }
                        if (spacing[i + 1] === undefined) {
                            spacing[i + 1] = section.stack;
                        }
                    });
                //
                //latch setup
                this.ryber.appEvents({
                    typesES: this.typesES,
                    event: 'latchUpdate',
                    of: combineLatest([
                        this.ryber[this.appTV].metadata.latch.updateZChild,
                        this.templateMyElements.changes
                    ])
                        .pipe(
                            delay(2)
                        )
                        .subscribe((a) => {
                            //fix the component object before continuing
                            let co = this.ryber[this.appTV];
                            co.quantity
                                .forEach((y, j) => {
                                    co.quantity[j]
                                        .forEach((z, k) => {
                                            z.text
                                                .forEach((w, h) => {
                                                    w.forEach((xx, ii) => {
                                                        if (!(w[ii]?.hasOwnProperty("item"))) {
                                                            w[ii] = { item: xx };
                                                        }
                                                    });
                                                });
                                            // remember we just cant overwrite the cssDefaults find the missing
                                            // cssDefault
                                            z.ngCss
                                                .forEach((w: any, h) => {
                                                    w.forEach((xx: any, ii) => {
                                                        if (z.ngCssDefault[h]?.[ii] === undefined) {
                                                            xx = {...{left:"0px",top:"0px"},...xx}
                                                            z.ngCssDefault[h].splice(ii, 0, objectCopy(xx));
                                                        }
                                                    });
                                                });
                                            //
                                        });
                                });
                            // console.log(
                            //     this.ryber,
                            //     this.templateMyElements._results
                            // )
                            zChild = this.zChildInit();
                            topLevelZChild = this._topLevelZChildInit();
                            latchZChild = this.ryber[this.appTV].metadata.latch.zChild = this._latchZChildInit();
                            this.directivesSendData({
                                directivesZChild: zChild,
                                random: Math.random()
                            });
                            eventDispatcher({
                                event: 'resize',
                                element: window
                            });
                        })
                });

                //
                this.ryber.appEvents({
                    typesES: this.typesES,
                    event: 'resize',
                    of: (
                        this.ryber[this.ryber['formCO'][ii - 1]]?.metadata[this.appTV] !== undefined ?
                            this.ryber[this.ryber['formCO'][ii - 1]]?.metadata[this.appTV] :
                            fromEvent(window, 'resize')
                    )
                        .subscribe((moving) => {


                            if (moving instanceof Event) {
                                moving = {
                                    boardHeight: "0px",
                                    boardTop: "0px"
                                };
                            }


                            // dynnamic element management bootstrap
                            let { deltaNodeSite } = this.ryber[this.appTV.valueOf()].metadata;
                            let { current } = deltaNodeSite === undefined ? this.foo : deltaNodeSite;
                            let dropDownGroup = {};
                            if (deltaNodeSite !== undefined) {


                                //dropDownGroups
                                zChild = this.dropDownInit({
                                    deltaNodeSite,
                                    dropDownGroup,
                                    zChild
                                });


                                if (group !== undefined) {
                                    Object.keys(group)
                                        .forEach((x, i) => {
                                            this.inputHandleModifyName({
                                                group: deltaNodeSite[x.valueOf()],
                                                inputZChild: zChild,
                                                current
                                            });
                                        });
                                }


                            }
                            //
                            // console.log(numberParse(getComputedStyle(zChild["&#8353"].element).width))
                            // console.log(section.area)
                            if (numberParse(getComputedStyle(zChild["&#8353"].element).width) > section.area) {

                                // element management
                                {

                                    // functionality
                                    {

                                        //clean up
                                        Object
                                            .keys(zChild)
                                            .slice(2)
                                            .forEach((x, i) => {
                                                if (zChild[x]?.extras?.judima?.format !== "false") {


                                                    zChild[x].css["height"] = zChild[x].cssDefault["height"];
                                                    zChild[x].css["width"] = zChild[x].cssDefault["width"];
                                                    zChild[x].css["font-size"] = zChild[x].cssDefault["font-size"];
                                                }
                                            });
                                        this.ref.detectChanges();
                                        //
                                        //responsive height
                                        staticZKeys
                                            .forEach((x, i) => {
                                                if (!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[x].bool)) {
                                                    zChild[x].css["height"] = null;
                                                    zChild[x].css["display"] = "table";
                                                    this.ref.detectChanges();
                                                    zChild[x].css["height"] = (zChild[x].element.getBoundingClientRect().height).toString() + "px";
                                                }
                                            });
                                        //
                                        // debugger
                                        stack({
                                            zChildKeys: [
                                                "&#8353",
                                                ...cmsZKeys
                                            ],
                                            ref: this.ref,
                                            zChild,
                                            spacing,
                                            keep,
                                            type: 'keepSomeAligned',
                                            heightInclude: [null, ...Array.from(align[0], (x, i) => { return 'f'; }), 't']
                                        });
                                        this.ref.detectChanges();



                                        // align options
                                        xContain({
                                            preserve: {
                                                align,
                                                // zChild,
                                                zChild: latchZChild === undefined ? zChild : latchZChild,
                                                ref: this.ref,
                                                width: section.width,
                                                left: section.left
                                            },
                                            type: 'preserve',
                                        });
                                        //
                                        if (group !== undefined && deltaNodeSite !== undefined) {
                                            // console.log(group)
                                            Object.keys(group)
                                                .forEach((x, i) => {

                                                    if (deltaNodeSite[x.valueOf()] !== undefined) {
                                                        deltaNodeSite[x.valueOf()]
                                                            .symbols
                                                            .forEach((y, j) => {


                                                                // modifying according to increment
                                                                if (zChild[y[0]]?.extras?.delta?.type === "increment" && j === deltaNodeSite[x.valueOf()].symbols.length - 1) {

                                                                    try {
                                                                        let counterString = zChild[y[0]].innerText.item.split("");
                                                                        zChild[y[0]].innerText.item.split("")
                                                                            .forEach((z, k) => {
                                                                                if (+z !== NaN) {
                                                                                    counterString.splice(k, 1, +z + j + 1);
                                                                                    zChild[y[0]].innerText.item = counterString.join("");
                                                                                    throw ('e');
                                                                                }
                                                                            });
                                                                    }
                                                                    catch (e) {
                                                                        this.ref.detectChanges();
                                                                        zChild[y[0]].extras.delta.type = "incrementDone";
                                                                    }
                                                                }
                                                                //
                                                                // nested zChild have their own formatting scheme
                                                                // console.log(zChild[y[0]])
                                                                if (zChild[y[0]].extras?.appNest?.confirm === "true") {
                                                                    return;
                                                                }
                                                                //
                                                                //stack and xAlign Setup
                                                                let keepRef = y[0];
                                                                let duplicateKeep = [];
                                                                y
                                                                    .reduce((acc, z, k, src) => {
                                                                        let myTop = parseInt(numberParse(deltaNodeSite[x.valueOf()].elements[j][k].css.top));
                                                                        // console.log(
                                                                        //     myTop,
                                                                        //     z
                                                                        // )
                                                                        if (myTop !== acc[1]) {
                                                                            let max = 0;
                                                                            let mySymbol = src[k - 1];
                                                                            duplicateKeep
                                                                                .forEach((w, l) => {
                                                                                    if (w[1] === acc[0]) {
                                                                                        let larger = numberParse(zChild[w[0]].css.top) +
                                                                                            numberParse(zChild[w[0]].css.height);
                                                                                        if (max < larger) {
                                                                                            max = larger;
                                                                                            mySymbol = w[0];
                                                                                        }
                                                                                    }

                                                                                });

                                                                            acc = [mySymbol, myTop];
                                                                            // debugger
                                                                        }
                                                                        duplicateKeep.push([z, acc[0]]);
                                                                        return acc;

                                                                    }, [keepRef, parseInt(numberParse(deltaNodeSite[x.valueOf()].elements[j][0].css.top))]);

                                                                let duplicateAlign = [];
                                                                let duplicateAlignCurrent = [];
                                                                duplicateKeep
                                                                    .reduce((acc, z, k, src) => {
                                                                        // console.log(z,acc)
                                                                        if (z[1] !== acc) {
                                                                            acc = z[1];
                                                                            duplicateAlign.push(duplicateAlignCurrent);
                                                                            duplicateAlignCurrent = [];
                                                                        }
                                                                        duplicateAlignCurrent.push(z[0]);
                                                                        if (k === src.length - 1) {
                                                                            duplicateAlign.push(duplicateAlignCurrent);
                                                                        }
                                                                        return acc;
                                                                    }, "");
                                                                duplicateAlign.splice(0, 1);
                                                                //
                                                                //stack spacing setup
                                                                let duplicateSpacing = y
                                                                    .map((z: any, k) => {
                                                                        if (zChild[z].extras?.component?.top !== undefined) {
                                                                            return zChild[z].extras.component.top;
                                                                        }
                                                                        else {
                                                                            return section.stack;
                                                                        }
                                                                    });
                                                                duplicateSpacing.unshift(null);
                                                                //
                                                                // stack
                                                                stack({
                                                                    zChildKeys: y,
                                                                    ref: this.ref,
                                                                    zChild,
                                                                    start: 400,
                                                                    spacing: duplicateSpacing,
                                                                    keep: duplicateKeep,
                                                                    type: 'keepSomeAligned',
                                                                    heightInclude: [...Array.from(duplicateAlign[0], (x, i) => { return 'f'; }), 't']
                                                                });
                                                                //
                                                                // xAlign
                                                                xContain({
                                                                    preserve: {
                                                                        align: duplicateAlign,
                                                                        zChild,
                                                                        ref: this.ref,
                                                                        width: section.area,
                                                                        left: section.left
                                                                    },
                                                                    type: 'preserve'
                                                                });
                                                                this.ref.detectChanges();
                                                                // console.log(duplicateAlign,duplicateKeep,duplicateSpacing)
                                                                //
                                                            });
                                                    }

                                                });


                                        }


                                    }
                                    //
                                    //position
                                    {


                                        // console.log(topLevelZChild)
                                        stack({
                                            type: "yPosition",
                                            yPosition: {
                                                zChild: topLevelZChild,
                                                moving: {
                                                    top: moving.boardTop,
                                                    height: moving.boardHeight
                                                },
                                                ref: this.ref
                                            }
                                        });

                                        // making sure we setup moving properly
                                        let movingZAttachVal = cmsZKeys
                                            .reduce((acc, x, i) => {
                                                if (zChild[x]?.extras?.multipleGroup !== undefined) {
                                                    return x;
                                                }
                                                return acc;
                                            });
                                        let movingZKeys = cmsZKeys.slice(cmsZKeys.indexOf(movingZAttachVal) + 1);
                                        let movingFlag = "false";
                                        let movingAttachVal = "";
                                        let movingKeep = keep
                                            .reduce((acc, x, i) => {
                                                if (movingZKeys[0] === x[0]) {
                                                    movingFlag = "true";
                                                    movingAttachVal = x[1];
                                                }
                                                if (movingFlag === "true") {
                                                    if (movingAttachVal === x[1]) {
                                                        acc.push([x[0], "replace me"]);
                                                    }
                                                    else {
                                                        acc.push(x);
                                                    }
                                                }
                                                return acc;
                                            }, []);
                                        //
                                        let attach = this.dynamicPosition({
                                            deltaDiff: 50,
                                            group,
                                            deltaNodeSite,
                                            zChild,
                                            current,
                                            attachVal: movingZAttachVal,
                                            zChildKeys: movingZKeys,
                                            section,
                                            keep: movingKeep
                                        });




                                        // position board
                                        this.ryber[this.appTV].metadata.ngAfterViewInitFinished.next("");
                                        this.positionBoard({ zChild: topLevelZChild, current, deltaNodeSite });
                                        //
                                    }
                                    //
                                    //moving
                                    {
                                    }
                                    //
                                }
                                //
                            }


                            else if (numberParse(getComputedStyle(zChild["&#8353"].element).width) > 0) {


                                //element management
                                {
                                    // functionality
                                    {


                                        //clean up
                                        //
                                        // same start
                                        // staticZKeys
                                        cmsZKeys
                                            .forEach((x, i) => {
                                                zChild[x].css["width"] = (
                                                    .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                ).toString() + "px";
                                                this.ref.detectChanges();
                                                zChild[x].css["left"] = xPosition({
                                                    target: numberParse(zChild[x].css["width"]),
                                                    contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                }).toString() + "px";
                                            });
                                        this.ref.detectChanges();
                                        //
                                        //serveral targets
                                        let mobileShrinkFonts = cmsZKeys
                                            .reduce((acc, x, i) => {
                                                if (zChild[x]?.extras?.appFocusFont?.mobileShrink === "true") {
                                                    acc.push(x);
                                                }
                                                return acc;
                                            }, []);


                                        mobileShrinkFonts
                                            .forEach((x, i) => {
                                                zChild[x].css["font-size"] = (
                                                    resize({
                                                        default: numberParse(zChild[x].cssDefault["font-size"]),
                                                        containActual: numberParse(getComputedStyle(zChild["&#8353"].element).width),
                                                        containDefault: 540,
                                                        type: 'nonUniform',
                                                        misc: [.052, .06],
                                                        mediaQuery: [379, 286, 0]
                                                    })
                                                ).toString() + "px";
                                            });
                                        this.ref.detectChanges();
                                        //
                                        //responsive height
                                        staticZKeys
                                            .forEach((x, i) => {
                                                if (!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[x].bool)) {
                                                    zChild[x].css["height"] = null;
                                                    zChild[x].css["display"] = "table";
                                                    this.ref.detectChanges();
                                                    zChild[x].css["height"] = (zChild[x].element.getBoundingClientRect().height).toString() + "px";
                                                }
                                            });
                                        //
                                        let responsiveMeasureTargets = cmsZKeys
                                            .reduce((acc, x, i) => {

                                                if (zChild[x].bool === "ta" || zChild[x].bool === "c") {
                                                    acc.push(zChild[x]);
                                                }
                                                return acc;
                                            }, []);
                                        responsiveMeasure({
                                            item: {
                                                target: responsiveMeasureTargets,
                                                prop: [...Array.from(Array(responsiveMeasureTargets.length), () => { return "height"; })]
                                            },
                                            values: [
                                                ...Array.from(Array(responsiveMeasureTargets.length), () => { return [[1190, 163], [770, 303], [495, 343], [391, 385], [305, 426], [216, 487], [175, 650]]; })
                                            ],
                                            measure: {
                                                target: zChild["&#8353"].element,
                                                prop: "width"
                                            }
                                        });
                                        this.ref.detectChanges();

                                        stack({
                                            zChildKeys: [
                                                "&#8353",
                                                ...cmsZKeys
                                            ],
                                            ref: this.ref,
                                            zChild,
                                            spacing: [null, 100, section.stack],
                                            type: 'simpleStack',
                                            heightInclude: [null, 'f', 't']
                                        });
                                        this.ref.detectChanges();


                                        if (group !== undefined && deltaNodeSite !== undefined) {

                                            Object.keys(group)
                                                .forEach((x, i) => {


                                                    let myGroup = deltaNodeSite[x.valueOf()];
                                                    if (myGroup !== undefined) {

                                                        myGroup
                                                            .symbols
                                                            .forEach((y, j) => {


                                                                // modifying according to increment
                                                                if (zChild[y[0]]?.extras?.delta?.type === "increment" && j === deltaNodeSite[x.valueOf()].symbols.length - 1) {
                                                                    try {
                                                                        let counterString = zChild[y[0]].innerText.item.split("");
                                                                        zChild[y[0]].innerText.item.split("")
                                                                            .forEach((z, k) => {
                                                                                if (+z !== NaN) {
                                                                                    counterString.splice(k, 1, +z + j + 1);
                                                                                    zChild[y[0]].innerText.item = counterString.join("");
                                                                                    throw ('e');
                                                                                }
                                                                            });
                                                                    }
                                                                    catch (e) {
                                                                        this.ref.detectChanges();
                                                                        zChild[y[0]].extras.delta.type = "incrementDone";
                                                                    }
                                                                }
                                                                //
                                                                // nested zChild have their own formatting scheme
                                                                if (zChild[y[0]].extras?.appNest?.confirm === "true") {
                                                                    return;
                                                                }
                                                                //
                                                                // same start
                                                                y
                                                                    .forEach((z, k) => {
                                                                        zChild[z].css["width"] = (
                                                                            .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                                        ).toString() + "px";
                                                                        this.ref.detectChanges();
                                                                        zChild[z].css["left"] = xPosition({
                                                                            target: numberParse(zChild[z].css["width"]),
                                                                            contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                                        }).toString() + "px";
                                                                    });
                                                                this.ref.detectChanges();
                                                                //
                                                                //serveral font shrink targets
                                                                let dynamicMobileShrinkFonts = y
                                                                    .reduce((acc, z, k) => {
                                                                        if (zChild[z]?.extras?.appFocusFont?.mobileShrink === "true") {
                                                                            acc.push(z);
                                                                        }
                                                                        return acc;
                                                                    }, []);
                                                                dynamicMobileShrinkFonts
                                                                    .forEach((z, k) => {
                                                                        zChild[z].css["font-size"] = (
                                                                            resize({
                                                                                default: numberParse(zChild[z].cssDefault["font-size"]),
                                                                                containActual: numberParse(getComputedStyle(zChild["&#8353"].element).width),
                                                                                containDefault: 540,
                                                                                type: 'nonUniform',
                                                                                misc: [.052, .06],
                                                                                mediaQuery: [379, 286, 0]
                                                                            })
                                                                        ).toString() + "px";
                                                                    });
                                                                this.ref.detectChanges();
                                                                //
                                                                //responsive height
                                                                y
                                                                    .forEach((z, k) => {
                                                                        if (!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[z].bool)) {
                                                                            zChild[z].css["height"] = null;
                                                                            zChild[z].css["display"] = "table";
                                                                            this.ref.detectChanges();
                                                                            zChild[z].css["height"] = (zChild[z].element.getBoundingClientRect().height).toString() + "px";
                                                                        }
                                                                    });
                                                                //
                                                                stack({
                                                                    zChildKeys: y,
                                                                    ref: this.ref,
                                                                    zChild,
                                                                    spacing: section.stack,
                                                                    type: 'simpleStack',
                                                                    heightInclude: [null, 't']
                                                                });
                                                                this.ref.detectChanges();

                                                            });

                                                    }

                                                });
                                        }


                                    }
                                    //
                                    //position
                                    {

                                        stack({
                                            type: "yPosition",
                                            yPosition: {
                                                zChild: topLevelZChild,
                                                moving: {
                                                    top: moving.boardTop,
                                                    height: moving.boardHeight
                                                },
                                                ref: this.ref
                                            }
                                        });


                                        // making sure we setup moving properly
                                        let movingZAttachVal = cmsZKeys
                                            .reduce((acc, x, i) => {
                                                if (zChild[x]?.extras?.multipleGroup !== undefined) {
                                                    return x;
                                                }
                                                return acc;
                                            });
                                        let movingZKeys = cmsZKeys.slice(cmsZKeys.indexOf(movingZAttachVal) + 1);
                                        if (ii == 3) {
                                            // console.log(zChild)
                                            // console.log(movingZAttachVal,movingZKeys)
                                        }
                                        //
                                        let attach = this.dynamicPosition({
                                            deltaDiff: 50,
                                            group,
                                            zChild,
                                            current,
                                            deltaNodeSite,
                                            attachVal: movingZAttachVal,
                                            section,
                                            keep: [],
                                            zChildKeys: movingZKeys,
                                            type: 'custom',
                                            customFn: ((devObj) => {
                                                stack({
                                                    zChildKeys: [
                                                        // devObj.attach, //mabye a good fix idek man
                                                        ...movingZKeys,
                                                    ]
                                                        .filter((z: any, k) => {
                                                            return zChild[z].extras?.appNest?.confirm !== "true";
                                                        }),
                                                    ref: this.ref,
                                                    zChild,
                                                    spacing: [null, section.stack],
                                                    keep: [],
                                                    type: 'simpleStack',
                                                    heightInclude: [null, 't', 't']
                                                });
                                                this.ref.detectChanges();
                                            })
                                        });



                                        // position board
                                        this.ryber[this.appTV].metadata.ngAfterViewInitFinished.next("");
                                        this.positionBoard({ zChild: topLevelZChild, current, deltaNodeSite });
                                        //
                                    }
                                    //
                                    //moving
                                    {
                                    }
                                    //
                                }
                                //
                            }


                            // so you wont have to find the panel
                            if (ii === env.component?.[this.appTV.split("C")[0].valueOf()]?.panelView) {
                                this.currentScroll(zChild);
                            }
                            //
                            //send moving data to the next CO
                            this.ryber[this.appTV].metadata?.[this.ryber['formCO'][ii + 1]]?.next?.({
                                boardTop: zChild["&#8353"].css["top"],
                                boardHeight: zChild["&#8353"].css["height"]
                            });
                            //
                        })
                });


                //duplicates setup
                if (group !== undefined) {


                    Object.keys(group)
                        .slice(0, 1)
                        .forEach((x, i) => {
                            let a = staticZKeys
                                .filter((y, j) => {
                                    return zChild[y].extras.multipleGroup === x;
                                });
                            // console.log(a)
                            // console.log(this.ryber[this.appTV].quantity[1][1])
                            if (group[x].add !== undefined) {
                                this.ryber.appEvents({
                                    typesES: this.typesES,
                                    event: 'click',
                                    of: fromEvent(zChild[group[x].add].element, 'click')
                                        .subscribe(() => {


                                            if (this.ryber[this.appTV.valueOf()].metadata.coDropDown !== undefined) {
                                                this.ryber[this.appTV.valueOf()].metadata.coDropDown.init = "false";
                                            }


                                            deltaNode({
                                                intent: 'add',
                                                elements: a.map((y, j) => { return zChild[y]; }),
                                                co: this.ryber[this.appTV.valueOf()],
                                                subCO: 1,
                                                group: x,
                                                symbolDeltaStart: 8410,
                                            });
                                            this.ref.detectChanges();
                                            zChild = this.zChildInit();


                                            this.directivesSendData({
                                                directivesZChild: zChild,
                                                random: Math.random(),
                                            });

                                            eventDispatcher(({
                                                event: 'resize',
                                                element: window
                                            }));
                                            // console.log(zChild)
                                        })
                                });


                            }

                            if (group[x].remove !== undefined) {
                                this.ryber.appEvents({
                                    typesES: this.typesES,
                                    event: 'click',
                                    of: fromEvent(zChild[group[x].remove].element, 'click')
                                        .subscribe(() => {


                                            if (this.ryber[this.appTV.valueOf()].metadata.deltaNodeSite === undefined) {
                                                return;
                                            }

                                            deltaNode({
                                                intent: 'minus',
                                                co: this.ryber[this.appTV.valueOf()],
                                                group: x,
                                                hook: 'prepare'
                                            });

                                            //remove dropdown elements
                                            if (this.ryber[this.appTV.valueOf()].metadata.deltaNodeSite[x] !== undefined) {
                                                let { symbols } = this.ryber[this.appTV.valueOf()].metadata.deltaNodeSite[x];
                                                symbols[symbols.length - 1]
                                                    .forEach((y, j) => {
                                                        if (zChild[y]?.extras?.appDropDown?.change === "ontheDOM") {
                                                            // console.log(zChild[y])
                                                            deltaNode({
                                                                intent: 'minus',
                                                                group: zChild[y]?.extras?.appDropDown?.group,
                                                                co: this.ryber[this.appTV.valueOf()],
                                                            });
                                                        }
                                                    });
                                            }
                                            //
                                            //clean up then take out DOM
                                            eventDispatcher(({
                                                event: 'resize',
                                                element: window
                                            }));
                                            //
                                            deltaNode({
                                                intent: 'minus',
                                                co: this.ryber[this.appTV.valueOf()],
                                                group: x,
                                            });


                                            this.ref.detectChanges();
                                            zChild = this.zChildInit();
                                        })
                                });
                            }

                        });

                }
                //
            });
        //
        // help app.component.ts trigger and make the website using the FPM for each component
        this.ryber.appViewComplete.next(
            (function (qq) {
                qq.ryber.appViewCompleteArray.push(qq.appTV);
            })(this)
        );
    }

    ngOnDestroy(): void {
        if(env.lifecycleHooks) console.log(this.appTV+ '  ngOnDestroy fires on dismount')
        Object
        .values(this.ryber[this.typesES])
        .forEach((x:any,i)=>{
            Object
            .values(x)
            .forEach((y:any,j)=>{
                if(y.unsubscribe !== undefined ){
                    y.unsubscribe()
                }
            })
        })
    }

    private positionBoard(devObj?:any) {
        let {zChild,current,deltaNodeSite}= devObj
        let max:any = Object.keys(zChild)
            .slice(2)

            if(current?.intent === "minus" && current.hook === "prepare"){
                let leftJoin = deltaNodeSite?.[current.group].symbols[current.count]
                let mySet = new Set([...leftJoin,...max])
                const toRemoveMap = leftJoin.reduce((memo, item) => ({
                    ...memo,
                    [item]: true
                  }), {});

                max = max.filter(x => !toRemoveMap[x]);

            }

            max = max
            .reduce((acc: any, x, i) => {

                if(zChild[x]?.extras?.appDropDown?.change === "dropdowns"){
                    return acc
                }

                let sum = numberParse(zChild[x].css["top"]) +
                    numberParse(zChild[x].css["height"]);

                if (sum > acc[1]) {
                    acc = [x, sum];
                }
                return acc;
            }, ["", 0])[0];

        if(zChild["&#8353"].extras.component.height !== undefined){
            zChild["&#8353"].css["height"] = zChild["&#8353"].extras.component.height.toString() + "px"
        }

        else{
            zChild["&#8353"].css["height"] = (
                numberParse(zChild[max].css["top"]) +
                numberParse(zChild[max].css["height"]) +
                50 -
                numberParse(zChild["&#8353"].css["top"])
            ).toString() + "px";
        }
        this.ref.detectChanges();
    }

    private _topLevelZChildInit (){
        let topLevelZChild = this.zChildInit()
        Object.keys(topLevelZChild)
        .forEach((x:any,i)=>{
            if(topLevelZChild[x]?.extras?.appNest !== undefined){
                if( topLevelZChild[x].extras.appNest.nestUnder !== undefined &&
                    topLevelZChild[x].extras.appNest.nestGroup !== undefined
                ){
                    delete topLevelZChild[x]
                }
            }
        })
        return topLevelZChild
    }

    private _latchZChildInit(){
        let latchZChild = this.zChildInit()
        Object.keys(latchZChild)
        .filter((x:any,i)=>{
            if(latchZChild[x]?.extras?.judima?.format === "false"){
                delete latchZChild[x]
            }
        })
        return latchZChild
    }

    private dropDownInit(devObj) {


        let {deltaNodeSite,dropDownGroup,zChild} = devObj
        Object
            .keys(deltaNodeSite)
            .forEach((x, i) => {
                if (x.includes("dropDownGroup")) {
                    dropDownGroup[x] = deltaNodeSite[x];
                }
            });
        // debugger
        // console.log(Object.keys(zChild).slice(2))
        // making sure we reinit zChild once
        if (this.ryber[this.appTV.valueOf()].metadata.coDropDown?.init === "false") {

            Object
                .keys(zChild)
                .slice(2)
                .forEach((x, i) => {
                    // console.log(zChild[x].extras.appDropDown)
                    // console.log(x)
                    if (zChild[x].extras?.appDropDown !== undefined) {
                        // this memans there are new elements on the DOM , update the zChild
                        if (zChild[x].extras.appDropDown.change === 'modified'){
                            this.ref.detectChanges();
                            zChild = this.zChildInit();
                            // debugger
                            zChild[x].extras.appDropDown.change = 'ontheDOM';
                            zChild[x].extras.appDropDown.options = {
                                symbols: deltaNodeSite[zChild[x].extras.appDropDown.group.valueOf()].symbols[0]
                            };

                            // modifiying the options as appropriate
                            zChild[x].extras.appDropDown.options.symbols
                            .forEach((y,j)=>{

                                zChild[y].innerText.item =  zChild[x].extras.appDropDown.values[j]
                                zChild[y].css["height"] = "0px"
                                zChild[y].css["width"] = "0px"
                                zChild[y].css["z-index"] =   -1
                                zChild[y].css["opacity"] =   0
                                zChild[y].css["top"] =  "0px"
                                // if issues look at top
                                zChild[y].css["left"] =  "0px"
                                zChild[y].extras.appDropDown.mySymbol = y
                                if(j === zChild[x].extras.appDropDown.options.symbols.length - 1){
                                    this.renderer2
                                    .removeClass(
                                        zChild[y].element,
                                        "a_p_p_DropDownMiddle"
                                    )
                                    this.renderer2
                                    .addClass(
                                        zChild[y].element,
                                        "a_p_p_DropDownLast"
                                    )
                                    return
                                }
                            })
                            this.ref.detectChanges()
                            //

                            zChild[x].extras.appDropDown.confirm = "true";
                        }
                    }
                });
            this.ryber[this.appTV.valueOf()].metadata.coDropDown.init = "true";
            this.ryber[this.appTV.valueOf()].metadata.zChildren = zChild;
            this.ref.detectChanges();

        }
        // making sure we do reinit the zChild too many
        // console.log(zChild);
        return zChild;
    }

    private directivesSendData(devObj?:{
        directivesZChild:zChildren,
        random?:any,
        templateMyElements?:any,
        ref?:any,
        duplicate?
    }):void{


        let {directivesZChild,random,duplicate,templateMyElements,ref} = devObj
        // subjects meeded for input handle to work
        Object
        .keys(directivesZChild)
        .forEach((x,i)=>{
            if(directivesZChild[x].extras !== undefined && directivesZChild[x].extras !== null ){
                if( directivesZChild[x].extras.appInputHandle !== undefined){
                    directivesZChild[x].extras.appInputHandle.zSymbol = x
                }
                if( directivesZChild[x].extras.appNest !== undefined){
                    directivesZChild[x].extras.appNest.zSymbol = x
                }
                if( directivesZChild[x].extras.appLatch !== undefined){
                    directivesZChild[x].extras.appLatch.zSymbol = x
                }
                if( directivesZChild[x].extras.appDropDown !== undefined){
                    if(   directivesZChild[x].extras.appDropDown.change !== "dropdowns"){
                        directivesZChild[x].extras.appDropDown.zSymbol = x
                    }
                }
            }
        })
        this.ryber[this.appTV.valueOf()].metadata.zChildrenSubject.next(({directivesZChild,random,templateMyElements,ref}))

    }

    private inputHandleModifyName(devObj:{
        group:any, // part of deltaNODE
        current:any,
        inputZChild:zChildren
    }):void{
        let {group,current,inputZChild} = devObj
        if(group !== undefined && current.intent === 'add' && current.hook === 'done'){
            group.symbols[current.count]
            .forEach((x,i)=>{
                if(inputZChild[x].extras.appInputHandle === undefined){
                    return
                }
                else if(inputZChild[x].extras.appInputHandle.name !== group.elements[0][i].extras.appInputHandle.name ){
                    return
                }
                inputZChild[x].extras.appInputHandle.name += "_" + current.count
            })
        }
    }

    private dynamicPosition(devObj:{
        deltaDiff:number, // spacing between dynamics
        group:any,// deltaNode group
        zChild:zChildren,
        deltaNodeSite?:any
        current:any // deltaNode current current
        attachVal:string //zChildKey
        zChildKeys:Array<string>
        type?:string,
        section?:any
        keep?:any
        customFn?:Function
    }):any{
        let {keep,section,deltaDiff,group,zChild,current,attachVal,type,zChildKeys,customFn,deltaNodeSite} = devObj
        let zChildMovingKeys = zChildKeys
        if(group !== undefined && deltaNodeSite !== undefined){

            Object.keys(group)
            .forEach((x,i)=>{
                let myGroup = deltaNodeSite[x.valueOf()]

                if( myGroup !== undefined){
                    myGroup
                    .symbols
                    .forEach((y,j)=>{
                        let {delta} = minMaxDelta({
                            items:myGroup.elements[j]
                            .filter((z:any,k)=>{
                                return z.extras?.appNest?.confirm !== "true"
                            }),
                            min:(item)=>{
                                return numberParse(item.css["top"])
                            },
                            max:(item)=>{
                                return numberParse(item.css["top"]) +
                                numberParse(item.css["height"])
                            }
                        })
                        delta  += deltaDiff
                        y.forEach((z,k) => {
                            if(zChild[z].extras?.appNest?.confirm === "true"){
                                return
                            }
                            zChild[z].css["top"] = (
                                numberParse(myGroup.elements[j][k].css["top"]) +
                                (
                                    delta *
                                    (j +1)
                                )
                            ).toString() + "px"
                        })
                        this.ref.detectChanges()
                        myGroup.extras[j].positioned = 'true'
                    })

                    let j = (myGroup.intent[myGroup.intent.length-1] === 'minus' && myGroup.hook[myGroup.hook.length-1] === 'prepare') ?
                    myGroup.symbols.length-2 :
                    myGroup.symbols.length-1


                    let y = j !== -1 ?
                    myGroup.symbols[j]:
                    myGroup.elements[0]

                    let attach =  (j !== -1 ? y[y.length-1] : attachVal)
                    zChildKeys.unshift(attach)
                    keep
                    .forEach((z,k)=>{
                        if(z[1] === "replace me"){
                            z[1] = attach
                        }
                    })
                    // console.log(keep)


                    if(type === 'stack' || type === undefined){


                        stack({
                            zChildKeys:zChildMovingKeys
                            .filter((z:any,k)=>{
                                return zChild[z].extras?.appNest?.confirm !== "true"
                            }),
                            ref: this.ref,
                            zChild,
                            spacing:[null,section.stack],
                            keep,
                            type:'keepSomeAligned',
                            heightInclude:[null,...Array.from(Array(14),(x,i)=> {return 't'})]
                        })
                        this.ref.detectChanges()
                    }

                    else if(type === 'custom'){
                        customFn({
                            attach
                        })
                    }
                }
            })


        }
    }

    private zChildInit(devObj?): any {
        return componentBootstrap({
            appTV: this.appTV,
            myElements: this.templateMyElements._results,
            ryber: this.ryber,
            zProps: {
                extras: 'true',
                val:'true',
                quantity:'true'
            }
        });
    }

    private staticZKeysGen(staticZChild:zChildren): Array<string>{
        return Object
        .entries(staticZChild)
        .filter((x:any,i)=>{
            return x[1].quantity === 3
        })
        .map((x,i)=>{return x[0]})
        .slice(2)
    }

    private toPlace (staticZChild:zChildren) : any{
        return  Object.keys(staticZChild)
        .filter((x,i)=>{  return x.match("&#") !== null })
        .slice(2)
        .forEach((x,i)=>{
            dragElement(staticZChild[x].element)
        })
    }

    private highlights (staticZChild:zChildren,amount:number): void{
        Array.from(Array(2),(x,i)=> {return "&#" +(8354 + i)})
        .forEach((x,i)=>{
            staticZChild[x].css["background-color"]= "red"
        })
    }

    private currentScroll(staticZChild:zChildren,reverse?:number): void{
        let current = null
        if( reverse === undefined){
        }
        else{
            current = Object
            .keys(staticZChild)
            .reduce((acc,x,i,src)=>{
                if(i ===  reverse){
                    acc = x
                }
                return acc
            })
        }
        scrollTo(0,numberParse(getComputedStyle(staticZChild[current === null ? "&#8353" :current].element).top)-30)
    }
}
