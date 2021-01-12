import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;
    const myToken='BQDBnUY4whJ2pSqqG15Fc24xD40e9iQteeAtuCjefUwRdR4oIYUH20tcRtnDVnvEIREfxG5Qrjwi1XCLbqc';
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${myToken}`
    })

    return this.http.get(url, {headers});
  }

  getNeWReleases(){

  return this.getQuery('browse/new-releases?limit=20')
            .pipe( map( data => data['albums'].items))

    // .pipe( map( data => {
    //   return data['albums'].items;
    // }));
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers})
    //           .pipe( map( data => {
    //             return data['albums'].items;
    //           }));
  }

  getArtistas(termino:string){

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
              .pipe( map (data => data['artists'].items))

    // .pipe( map (data => {
    //   return data['artists'].items;
    // }))

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
    //           .pipe( map (data => {
    //             return data['artists'].items;
    //           }))
  
  }

  getArtista(id:string){

    return this.getQuery(`artists/${id}`);
              // .pipe( map (data => data['artists'].items))
  }

  getTopTracks(id:string){

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
              .pipe( map (data => data['tracks']))
  }
}
