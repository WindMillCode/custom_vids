import { Component,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';


// make availbable your script import

//

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})



export class AppComponent {

    constructor(
        private ref:ChangeDetectorRef
    ){

    }
    title = 'xmlParser';
    stringXml = `<?xml version="1.0" encoding="UTF-8"?>
    <breakfast_menu>
      <food>
        <name>Belgian Waffles</name>
        <price>$5.95</price>
        <description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
        <calories>650</calories>
      </food>
      <food>
        <name>Strawberry Belgian Waffles</name>
        <price>$7.95</price>
        <description>Light Belgian waffles covered with strawberries and whipped cream</description>
        <calories>900</calories>
      </food>
      <food>
        <name>Berry-Berry Belgian Waffles</name>
        <price>$8.95</price>
        <description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description>
        <calories>900</calories>
      </food>
      <food>
        <name>French Toast</name>
        <price>$4.50</price>
        <description>Thick slices made from our homemade sourdough bread</description>
        <calories>600</calories>
      </food>
      <food>
        <name>Homestyle Breakfast</name>
        <price>$6.95</price>
        <description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
        <calories>950</calories>
      </food>
    </breakfast_menu>

    `
    items:Array<any> = []

    // practical application
    parseMyXml=()=>{
        
    }
    //
}
