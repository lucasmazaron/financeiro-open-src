import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public post(endpoint: string, object: any, options?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, object, options);
  }

  public get(endpoint: string, options?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${endpoint}`, options);
  }

  public delete(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${endpoint}`, options);
  }

  public put(endpoint: string, object: any, options?: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, object, options);
  }
}
