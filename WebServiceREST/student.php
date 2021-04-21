<?php
$method = $_SERVER["REQUEST_METHOD"];
include('./class/Student.php');
$student = new Student();
$controllo = false;
switch($method) {
  case 'GET':
    $id = $_GET['id'];
    if (isset($id)){//da lo studente con l'id indicato 
      $student = $student->find($id);
      $js_encode = json_encode(array('state'=>TRUE, 'student'=>$student),true);
    }else{//da tutti gli studenti
      $students = $student->all();
      $js_encode = json_encode(array('state'=>TRUE, 'students'=>$students),true);
    }
    header("Content-Type: application/json");
    echo($js_encode);
    break;

  case 'POST':
    
    // curl --header "Content-Type: application/json" --request POST --data {"""_id""":3,"""_name""":"""nameBello""","""_surname""":"""surnameBello""","""_sidiCode""":"""452121""","""_taxCode""":"""RJDIJEIJWEJ9FDIEF"""} http://localhost:8000/student.php
    
    $body = file_get_contents("php://input");
    //echo "BODYY: ".$body;
    
    $js_decoded = json_decode($body, true);
    /*
    echo "TEST1: ".$js_decoded["_id"];
    echo "TEST2: ".$js_decoded["_name"];
    echo "TEST3: ".$js_decoded["_surname"];
    echo "TEST4: ".$js_decoded["_sidiCode"];
    echo "TEST5: ".$js_decoded["_taxCode"];
    */
    
    
    
      //echo "dati inseriti";
      
    
      
        
    $student->addStudent($js_decoded["_name"],$js_decoded["_surname"],$js_decoded["_sidiCode"],$js_decoded["_taxCode"]);
        
    



      
    



     
    
    
    break;

  case 'DELETE':
    $body = file_get_contents("php://input");
    $js_decoded = json_decode($body, true);
    if(isset($js_decoded["_id"])){
      $controllo = $student->find($js_decoded["_id"]);
      if($controllo == true){
        //RIMOZIONE COLLEGAMENTI 
        $student->removeColl($js_decoded["_id"]);
        if($controllo==true){
          echo "collegamenti rimossi!";
          $student->removeStudent($js_decoded["_id"]);
          if($controllo==true){
            echo "studente rimosso!";
          }
          else{
            echo "errore nella rimozione";
            
          }


        }
        else{
          echo "errore nella rimozione dei collegamenti";
          
        }
        
      }else {
        echo "id non trovato";
      }

    }
    else {
      echo "id mancante, imposibile eseguire l'eliminazione";
    }
    break;

  case 'PUT':


    
    $body = file_get_contents("php://input");
    $js_decoded = json_decode($body, true);
    if(isset($js_decoded["_name"])){
      $name = $js_decoded["_name"];
    }else{
      $name = "";
    }
    if(isset($js_decoded["_surname"])){
      $surname = $js_decoded["_surname"];
    }else{
      $surname = "";
    }
    if(isset($js_decoded["_sidiCode"])){
      $sidiCode = $js_decoded["_sidiCode"];
    }else{
      $sidiCode = "";
    }
    if(isset($js_decoded["_taxCode"])){
      $taxCode = $js_decoded["_taxCode"];
    }else{
      $taxCode = "";
    }
    
    
    
    
    if(isset($js_decoded["_id"])){
      $controllo = $student->find($js_decoded["_id"]);
      if($controllo == true){
        
        $student->changeStudent($js_decoded["_id"],$name,$surname,$sidiCode,$taxCode);
        if($controllo==true){
          echo "studente modificato!";
        }
        else{
          echo "errore nella modifica";
          
        }
      }else {
        echo "id non trovato";
      }
    }else {
      echo "id mancante, imposibile eseguire la modifica";
    }



    break;

  default:
    break;
}


?>