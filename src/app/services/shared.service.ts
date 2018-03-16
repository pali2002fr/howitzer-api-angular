import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { 
  Shotter, 
  totalUsers,
  totalShots,
  avgShots,
  totalShotsByUser
} from '../models/index';

import {  } from '../services/index';

@Injectable()

export class SharedService {

  private totalShotsByUserSource = new BehaviorSubject<totalShotsByUser>({'total': 0});
  currentTotalShotsByUser = this.totalShotsByUserSource.asObservable();

  private totalShotsSource = new BehaviorSubject<totalShots>({'total': 0});
  currentTotalShots = this.totalShotsSource.asObservable();

  private totalUsersSource = new BehaviorSubject<totalUsers>({'total': 0});
  currentTotalUsers = this.totalUsersSource.asObservable();

  private avgShotsSource = new BehaviorSubject<avgShots>({'avg': 0});
  currentAvgShots = this.avgShotsSource.asObservable();

  private bestShottersSource = new BehaviorSubject<Shotter[]>(null);
  currentBestShotters = this.bestShottersSource.asObservable();

  private shotIdSource = new BehaviorSubject<number>(null);
  currentShotId = this.shotIdSource.asObservable();

  private displaySettingsSource = new BehaviorSubject<boolean>(false);
  currentDisplaySettings = this.displaySettingsSource.asObservable();

  constructor() { }

  changeTotalShotsByUser(total: totalShotsByUser) {
    this.totalShotsByUserSource.next(total)
  }

  changeTotalShots(total: totalShots) {
    this.totalShotsSource.next(total)
  }

  changeTotalUsers(total: totalUsers) {
    this.totalUsersSource.next(total)
  }

  changeAvgShots(avg: avgShots) {
    this.avgShotsSource.next(avg)
  }

  changeBestShotters(bestShotters: Shotter[]) {
    this.bestShottersSource.next(bestShotters)
  }

  changeShotId(shotId: number) {
    this.shotIdSource.next(shotId)
  }

  changeDisplaySettings(displaySettings: boolean) {
    this.displaySettingsSource.next(displaySettings)
  }
}