import { Component } from '@angular/core';

@Component({
    selector: 'app-list',
    template: `
    <div
    *ngFor="let row of data; let index = index"
      [class]="myFn(index)"
      [draggable]="true"
      [class.dragging]="index === this.draggingIndex"
      (dragstart)="onDragStart(index)"
      (dragenter)="onDragEnter(index)"
      (dragend)="onDragEnd()">
      <div class="card">
        {{ row.value }}
      </div>
    </div>
  `,

})
export class ListComponent {
    myFn(i) {
        this.data[i].class = 'drag-wrapper drag-wrapper'+i
        return this.data[i].class
    }

    data: {value: string,class?: string}[] = [


        {value:'Melvin Walter Kissling Gam (April 25, 1931 – January 28, 2002) was a Costa Rican businessman who became'},
        {value:'chool campus in Costa Rica, as well as founding the Costa Rican non-profit organization Asociación de Empresarios para el'},
        {value:'Walter Kissling was born to Walter Kissling Rickli and Adela Gam Secen in Limón, Costa Rica on April 25, 1931'},
        {value:'r interview in 1998 he mentioned his mother as driving force in his life. “She was a fighting woman.'},
        {value:'Kissling graduated from Colegio Seminario in San José in 1948. After graduation he worked selling cheese and as a receptionist'},
        {value:'rican businessman who gave him 2 pamphlets and told him that if he learned them by heart he would hire him as'},
    ]
    .map((x:any,i)=>{
        x.class = 'drag-wrapper drag-wrapper'+(i+1)
        return x
    });
    draggingIndex: any;


    onDragStart(index: number): void {
        // update start state
        this.draggingIndex = index;
        //
    }

    onDragEnter(index: number): void {
        // reorder items
        if (this.draggingIndex !== index) {
            let  itemToBeReordered = this.data.splice(this.draggingIndex, 1)[0];
            this.data.splice(index, 0, itemToBeReordered);
            this.draggingIndex = index;
        }
        //
    }

    onDragEnd(): void {
        // update end state
        delete this.draggingIndex
        //
    }
}
