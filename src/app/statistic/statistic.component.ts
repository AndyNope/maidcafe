import { Component, OnInit } from '@angular/core';

import { MessageService } from '../shared/services/message.service';
import { UserService } from '../shared/services/user.service';

declare function timeLineChart(array1: Array<number>, array2: Array<number>): any;
declare function trafficWeekdays(
  mon: number,
  tue: number,
  wed: number,
  thu: number,
  fri: number,
  sat: number,
  sun: number
): any;
declare function doughnutChart(
  canvasId: string,
  admin: number,
  service: number,
  helper: number
): any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html'
})
export class StatisticComponent implements OnInit {

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.userService.getAmountUserStatistics().subscribe(value => {
      if (value === "You don't have permission to do that.") {
        this.messageService.setNegativeMessage('Bitte melden Sie sich zuerst an.');
      }
      doughnutChart("doughnutChart", value['admin'], value['service'], value['helper']);
    });
    this.userService.getTrafficOfWeekdays().subscribe(value => {
      if (value === "You don't have permission to do that.") {
        this.messageService.setNegativeMessage('Bitte melden Sie sich zuerst an.');
      }
      trafficWeekdays(
        value['Monday'],
        value['Tuesday'],
        value['Wednesday'],
        value['Thursday'],
        value['Friday'],
        value['Saturday'],
        value['Sunday']);
    });
    timeLineChart([10, 20, 30, 40, 30, 70, 12], [11, 23, 12, 53, 13, 12, 11]);
  }

}
