import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from "../get-employees.service";
import { Employee } from './employeeInterface';

@Component({
    selector: 'app-tabella',
    templateUrl: './tabella.component.html',
    styleUrls: ['./tabella.component.css']
})

export class TabellaComponent
{
    generaID: number;
    ges : GetEmployeesService; //var del tipo della classe passata tramite import { GetEmployeesService } from "../get-employees.service";
    array : Employee[]; //array di impiegati (import { Employee } from './employeeInterface';)
    idCanc: number[] = []; //array per memorizzare temporaneamente gli ID degli impiegati che si vogliono modificare/cancellare

    constructor(ges : GetEmployeesService) 
    {
        this.generaID = 0;
        this.ges = ges;
        this.array = [];
        this.load();
    }

    load() : void //metodo che carica dati tramite metodo GET alla url delle API
    {
        this.ges.getData("http://localhost:4200/student.php")
            .subscribe(data => this.array = data.students);
    }

    add(name : string, surname : string, sidi_code : string, tax_code : string) : void
    {
        let emp : Employee = { //variabile temporanea (type let) di tipo Employee con la quale inserisco i dati del nuovo impiegato
			      id: this.createID(),
			      name: name,
			      surname: surname,
			      sidi_code: sidi_code,
			      tax_code: tax_code
		};
        this.ges.postData("http://localhost:4200/student.php", emp) //metodo che inserisce nuovi dati con metodo POST
            .subscribe(data => this.load());
    }

    remove(id : number) : void
    {
        this.ges.deleteData("http://localhost:4200/student.php" + id)
            .subscribe(data => this.load());
    }

    modify(id : number, name : string, surname : string, sidi_code : string, tax_code : string) : void
    {
        let emp : Employee = {
			id: id,
			name: name,
			      surname: surname,
			      sidi_code: sidi_code,
			      tax_code: tax_code
		};

        this.ges.putData("http://localhost:4200/student.php" + id, emp)
            .subscribe(data => this.load());
    }

    message(message : string) : any //metodo richiamato da tag in html per aggiungere un parametro
    {
        return window.prompt(message);
    }

    private createID() : number 
    {
        return this.generaID++;
    }
}