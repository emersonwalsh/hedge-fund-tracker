import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as highchartsSankey from 'highcharts/modules/sankey';

import  *  as  data  from  './../data.json';
import { ArrayType } from '@angular/compiler/src/output/output_ast';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let highchartsSankey = require('highcharts/modules/sankey');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
highchartsSankey(Highcharts);

@Component({
	selector: 'app-sankey',
	templateUrl: './sankey.component.html',
	styleUrls: ['./sankey.component.scss']
})

export class SankeyComponent implements OnInit {
	rawData: any = (data as any).default;
	cleanData: any = [];
	numberOfHoldings: number = 5;

	constructor() { 
	}

	formatData() {
		for (let i = 0; i < this.rawData.length; i++) {
			if (this.rawData[i]['Ranking'] < this.numberOfHoldings + 1) {
				this.cleanData.push([
					this.rawData[i]['Hedge Fund'],
					this.rawData[i]['Symbol'],
					this.rawData[i]['% of Portfolio']
				]);
			}
		}
	}

	ngOnInit() {
		this.formatData();
		console.log('rawData', this.rawData);
		console.log('cleanData', this.cleanData);


		Highcharts.chart('container', {
			title: {
				text: '2020 Q1: Top 3 Holdings'
			},
			accessibility: {
				point: {
					valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
				}
			},
			series: [{
				keys: ['from', 'to', 'weight'],
				data: this.cleanData,
				type: 'sankey',
				name: 'Percentage of Portfolio'
			}]
		});
	}
}