import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Shotter } from '../models/index';

import {  } from '../services/index';

@Injectable()

export class SharedService {

  private totalShotsByUserSource = new BehaviorSubject<number>(0);
  currentTotalShotsByUser = this.totalShotsByUserSource.asObservable();

  private totalShotsSource = new BehaviorSubject<number>(0);
  currentTotalShots = this.totalShotsSource.asObservable();

  private totalUsersSource = new BehaviorSubject<number>(0);
  currentTotalUsers = this.totalUsersSource.asObservable();

  private avgShotsSource = new BehaviorSubject<number>(0);
  currentAvgShots = this.avgShotsSource.asObservable();

  private bestShottersSource = new BehaviorSubject<Shotter[]>(null);
  currentBestShotters = this.bestShottersSource.asObservable();

  private shotIdSource = new BehaviorSubject<number>(null);
  currentShotId = this.shotIdSource.asObservable();

  private displaySettingsSource = new BehaviorSubject<boolean>(false);
  currentDisplaySettings = this.displaySettingsSource.asObservable();

  constructor() { }

  changeTotalShotsByUser(total: number) {
    this.totalShotsByUserSource.next(total)
  }

  changeTotalShots(total: number) {
    this.totalShotsSource.next(total)
  }

  changeTotalUsers(total: number) {
    this.totalUsersSource.next(total)
  }

  changeAvgShots(avg: number) {
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