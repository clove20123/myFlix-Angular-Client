import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.scss']
})


export class DescriptionCardComponent implements OnInit {

/**
 * 
 * @param data 
 */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
