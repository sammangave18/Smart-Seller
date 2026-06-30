import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor() {}

  getRevenueData() {

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

      revenue: [2500, 4200, 3800, 6900, 8100, 9500]

    };

  }

}