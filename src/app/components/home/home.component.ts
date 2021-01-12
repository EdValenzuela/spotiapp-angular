import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{

  nuevasCanciones:any[]=[];
  loading: boolean;
  error:boolean;
  mensajeError: string;

  constructor(private spotify:SpotifyService) {
    
    this.loading = true;
    this.error = false;

    this.spotify.getNeWReleases()
      .subscribe( (data:any) => {
        this.nuevasCanciones = data;
        this.loading = false;
    }, (e) => {
      this.error = true;
      this.mensajeError = e.error.error.message;
    });
  }

  

}
