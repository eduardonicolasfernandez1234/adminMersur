import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { PushNotificationService } from './core/services/Data/Notifications/push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AdminMersur';

  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(
    public mediaObserver: MediaObserver,
    private notification: PushNotificationService
  ) {}

  ngOnInit() {
    this.notification.receiveMessage().subscribe((payload) => {
      console.log(payload);
    });
    console.log('estas en angular');
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      }
    );
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
