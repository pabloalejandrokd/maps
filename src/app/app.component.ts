declare var require: any

import { Component } from '@angular/core';

import * as Highcharts from 'highcharts/highstock';
import * as HC_map from 'highcharts/modules/map';
import * as HC_exporting from 'highcharts/modules/exporting';
import * as HC_ce from 'highcharts-custom-events';

HC_map(Highcharts);
require('../assets/mapas/europe')(Highcharts);

HC_exporting(Highcharts);
HC_ce(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'orange'
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  	title = 'app';

	@ViewChild('chartTarget') chartTarget: ElementRef;

	chart: Highcharts.ChartObject;

	ngAfterViewInit() {
    	const options: Highcharts.Options = {
    		chart: {
		        map: 'europe'
		    },
	      	title: {
	       	 text: 'Fruit Consumption'
	      	},
	      	legend: {
        enabled: true
    },

    plotOptions: {
        map: {
            allAreas: false,
            joinBy: ['iso-a2', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                style: {
                    fontWeight: 'bold'
                },
                // Only show dataLabels for areas with high label rank
                format: null,
                formatter: function () {
                    if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                        return this.point.properties['iso-a2'];
                    }
                }
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}: <b>{series.name}</b>'
            }
        }
    },
	      series: [{
        name: 'UTC',
        data: ['IE', 'IS', 'GB', 'PT'].map(function (code) {
            return { code: code };
        })
    }, {
        name: 'UTC + 1',
        data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU',
            'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
                return { code: code };
            })
    }, {
        name: 'UTC + 2',
        data: ['FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR', 'TR', 'CY'].map(function (code) {
            return { code: code };
        })
    }, {
        name: 'UTC + 3',
        data: [{
            code: 'RU'
        }]
    }]
		};
  
    	this.chart = chart(this.chartTarget.nativeElement, options);
	}
}
