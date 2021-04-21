import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from './tabella/employeeInterface';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  	providedIn: 'root'
})

export class GetEmployeesService 
{
	constructor(private http : HttpClient) {} //costruttore della classe GetEmployeesService
	
	getData(apiUrl : string) : Observable <any> //Metodo GET con parametri richiesti da API (per vedere gli impiegati)
	{
    	return this.http.get(apiUrl)
        .pipe(
        	retry(1),
        	catchError(this.handleError)
      	);
	}

  	postData(apiUrl : string, body : any) : Observable<Employee[]> //Metodo POST con parametri richiesti da API (per aggiungere impiegati)
	{
		return this.http.post<Employee[]>(apiUrl, body)
		.pipe(
			retry(1),
		    catchError(this.handleError)
		);
	}

	deleteData(apiUrl : string) : Observable<Employee[]> //Metodo DELETE con parametri richiesti da API (per cancellare impiegati)
	{
		return this.http.delete<Employee[]>(apiUrl)
		.pipe(
			retry(1),
			catchError(this.handleError)
		);
	}

	putData(apiUrl : string, body : any) : Observable<Employee[]> //Metodo DELETE con parametri richiesti da API (per cancellare impiegati)
	{
		return this.http.put<Employee[]>(apiUrl, body)
		.pipe(
			retry(1),
			catchError(this.handleError)
		);
	}

	public handleError(handleError: any): import("rxjs").OperatorFunction<Employee[], any> //Nel caso di errore
  	{
    	throw new Error('Method not implemented.');
  	}
}
