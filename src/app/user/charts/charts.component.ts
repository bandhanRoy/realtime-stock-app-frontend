import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexTooltip,
  ApexYAxis
} from 'ng-apexcharts';
import { CommonService } from 'src/app/services/common.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  showChart = false;
  noDataFound = false;
  public chart: ApexChart;
  public chartOptions: any;
  public series: ApexAxisChartSeries;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    // this.initChartData();
    this.commonService.stockEmitter.subscribe(res => {
      if (res) {
        this.initChartData(res);
      }
    });
  }

  public initChartData(res): void {
    if (res.type === 'new') {
      this.commonService.fetchCurrentStock({ company: res.company }).subscribe((result: any) => {
        if (result.data) {
          this.showChart = true;
          this.setChart(this.fetchXAndYAxis(result.data), res.company);
          setTimeout(() => {
            this.showChart = false;
          }, 20000);
        } else {
          this.noDataFound = true;
        }
      }, err => {
        this.noDataFound = false;
        console.error(err);
      });
    } else {
      this.commonService.fetchGraphHistory(res.stockId).subscribe((response: any) => {
        this.showChart = true;
        this.setChart(this.fetchXAndYAxis(response.data), res.companyName);
      }, err => {
        this.noDataFound = true;
        console.error(err);
      });
    }
  }

  setChart(dates, companyName) {
    this.series = [
      {
        name: companyName,
        data: dates
      }
    ];
    this.chart = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: 'Stock Price Movement',
      align: 'left'
    };
    this.fill = {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: (val) => (val).toFixed(0)
      },
      title: {
        text: 'Price'
      }
    };
    this.xaxis = {
      type: 'datetime'
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: (val) => (val).toFixed(0)
      }
    };
  }

  fetchXAndYAxis(data) {
    const chartData = [];
    for (const date of Object.keys(data)) {
      chartData.push([date, data[date]['1. open']]);
    }
    return chartData;
  }

}

