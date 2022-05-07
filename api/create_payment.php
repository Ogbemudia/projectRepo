<?php
header('Access-Control-Allow-Origin: localhost/projectGalore/');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
$username = $_SESSION['userlogin']; 
//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);

/* function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
} */
//get the raw posted data
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if (isset($_POST['bank_name']) || isset($_POST['acc_name']) || isset($_POST['acc_number']) || isset($_POST['phone']) || isset($_POST['created'])|| isset($_POST['logo'])) {

   
    
    
     /* Getting file name */
    $post->filename = $_FILES['file']['name'];
    $post->file = $_FILES['file']['tmp_name'];
   // $size = $_FILES['file']['size'];
    $extension = pathinfo($post->filename, PATHINFO_EXTENSION);
   if($post->upload()) {
        

        $post->bank_name    =$_POST['bank_name'];
        $post->acc_name     =$_POST['acc_name'];
        $post->acc_number   =$_POST['acc_number'];
        $post->phone        =$_POST['phone'];
        

        $post->bank_logo = $_FILES['file']['name'];
       // $post->size = $_FILES['file']['size'];

        $date1 = date("F j, Y");
        $tim = date("g:i a");
        $post->created = $date1. " at ".$tim;
        $post->created_by = $username;
       
        
  
       

        //create post
        if ($post->payment()) {
            $returnData = msg(0, 201, "Account created.");
        } else {
            $returnData = msg(1, 422, "Account not created.");
        }
    }
}
echo json_encode($returnData);


    

