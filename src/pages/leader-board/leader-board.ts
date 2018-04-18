import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Chart} from 'chart.js';
import {Parse} from 'parse';
import {Data} from '../../providers/data';


@Component({
  selector: 'page-leader-board',
  templateUrl: 'leader-board.html',
})
export class LeaderBoardPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  group: string = '';
  GroupMembers:string[];
  LineData = [];
  BarData = [];
  PieData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public loadingCtrl: LoadingController) {
    let user = Parse.User.current();
    this.group = user.get("Group");
  }


  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please wait while we load your data.',
      duration: 1500
    });

    loading.present();

    this.GroupMembers = this.dataService.getGroupNames();
    this.LineData = this.dataService.getLineData();
    console.log(this.LineData);
    this.PieData = this.dataService.getPieData();
    this.BarData = this.dataService.getBarData();

    setTimeout(() => {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.GroupMembers,
        datasets: [{
          label: '# of Votes',
          data: this.BarData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: this.GroupMembers,
        datasets: [{
          label: '# of Votes',
          data: this.PieData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.GroupMembers,
          datasets: [{
            label: '# of Ounces drank',
            data: this.LineData,
            backgroundColor: [
              'rgba(198, 40, 40, 0.2)'
            ],
            borderColor: [
              'rgba(198, 40, 40, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }

      });
    }, 2500);
  }

}
