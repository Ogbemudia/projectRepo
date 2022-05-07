<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();

//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);



//get the raw posted data
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if (empty($_FILES['file']['name'])){
    $post->id =$_POST['id'];
    $post->bank_name =$_POST['bank_name'];
    $post->acc_name=$_POST['acc_name'];
    $post->acc_number=$_POST['acc_number'];
    $post->phone=$_POST['phone'];
    

   

    $date1 = date("F j, Y");
    $tim = date("g:i a");
    $post->last_update = $date1. " at ".$tim;
   
    

//create post
if ($post->update_payment()) {
    $returnData = msg(0, 201, "Account Updated.");
} else {
    $returnData = msg(1, 422, "Account not Updated.");
}
   

    

}else{

 /* Getting file name */
    $post->filename = $_FILES['file']['name'];
    $post->file = $_FILES['file']['tmp_name'];
   // $size = $_FILES['file']['size'];
   if($post->upload()) {
        // $upsucc= "Doc uploaded.";
        // $returnData = msg(0, 201, $upsucc);
        //}
       

        $post->id =$_POST['id'];
        $post->bank_name =$_POST['bank_name'];
        $post->acc_name=$_POST['acc_name'];
        $post->acc_number=$_POST['acc_number'];
        $post->phone=$_POST['phone'];

        $post->bank_logo = $_FILES['file']['name'];
        //$post->size = $_FILES['file']['size'];

        $date1 = date("F j, Y");
        $tim = date("g:i a");
        $post->last_update = $date1. " at ".$tim;

        //create post
        if ($post->update_payimg()) {
            $returnData = msg(0, 201, "Book Updated.");
        } else {
            $returnData = msg(1, 422, "Book not Updated.");
        }
    }
}
        
    


echo json_encode($returnData);