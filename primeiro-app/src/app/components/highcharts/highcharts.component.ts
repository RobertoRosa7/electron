import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts'
import * as actionsDashboard from '../../actions/dashboard.actions'

const Boost = require('highcharts/modules/boost')
const noData = require('highcharts/modules/no-data-to-display')
const More = require('highcharts/highcharts-more')

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
  @ViewChild('highchartEvoution', { static: true }) highchartEvoution: ElementRef

  public chartLine: any = {
    chart: {},
    navigator: { enabled: false },
    scrollbar: { enabled: false },
    rangeSelector: { enabled: false },
    title: { text: '' },
    subtitle: { text: '' },
    credits: { enabled: false },
    legend: { enabled: false, },
    yAxis: {
      gridLineDashStyle: 'longdash',
      title: { text: '' },
      opposite: false,
      labels: {
        formatter(): any {
          const self: any = this
          return self.value + ' %'
        },
        style: {
          color: ''
        }
      }
    },
    xAxis: {
      tickInterval: 20,
      categories: [],
      labels: {
        formatter: function (): any {
          const self: any = this
          return Highcharts.dateFormat('%m/%Y', self.value * 1000)
        },
        style: {
          color: ''
        }
      },
    },
    tooltip: {
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      padding: 10,
      zIndex: 1,
      useHTML: true,
      shared: true,
      crosshairs: true,
      formatter: function (): any {
        const self: any = this
        let s = `
          <div class="highchart-tooltip">
            <strong>${Highcharts.dateFormat('%d/%m/%Y', self.x * 1000)}</strong>
          </div>`;
        for (let i in self.points) {
          s += `<span style="color:${self.points[i].series.color}">●</span>
                <span class="highchart-text">${self.points[i].series.name}:</span>
                <b class="highchart-text">${Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })
              .format(self.points[i].y.toFixed(2))} %</b>
              <br/>
          `
        }
        return s
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    lang: {
      noData: ''
    },
    series: [{
      name: 'Alimentação',
      data: [0, 1, 2, 3, 0.3, 0.4, 1, 0.9, 12, 243]
    }, {
      name: 'Água & Luz',
      data: [0, 1, 2, 3, 0.3, 0.4, 1, 0.9]
    }, {
      name: 'Outros',
      data: [0, 1, 2, 3, 0.3, 0.4, 1, 0.9]
    }, {
      name: 'Transporte',
      data: [0, 1, 2, 3, 0.3, 0.4, 1, 0.9]
    }, {
      name: 'Banco',
      data: [0, 1, 20.5, 3, 0.3, 0.4, 1, 0.9]
    }],
  }

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {

    this._store.select(({ dashboard }: any) => dashboard.dark_mode).subscribe(mode => {
      var theme = mode === 'light-mode' ? 'var(--color-white)' : 'var(--color-default-dark)'
      var themeInverse = mode != 'light-mode' ? 'var(--color-white)' : 'var(--color-default-dark)'

      this.chartLine.chart.backgroundColor = theme
      this.chartLine.tooltip.backgroundColor = theme
      this.chartLine.yAxis.gridLineColor = themeInverse
      this.chartLine.yAxis.labels.style.color = themeInverse
      this.chartLine.xAxis.labels.style.color = themeInverse
    })

    this.chartLine.xAxis.categories = [
      1593486000,
      1593572400,
      1593658800,
      1593745200,
      1593831600,
      1593918000,
      1594004400,
      1594090800,
      1594177200,
      1594263600,
      1594350000,
      1594436400,
      1594522800,
      1594609200,
      1594695600
    ]
    Highcharts.chart(this.highchartEvoution.nativeElement, this.chartLine)
  }
}
