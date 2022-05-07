<?php
header('Access-Control-Allow-Origin: localhost/projectGalore/');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
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

$post->name     =$_POST['name'];

$date1 = date("F j, Y"); 
        $tim = date("g:i a");
        $post->created = $date1. " at ".$tim;


//create post
if($post->book_type()){
    $returnData = msg(0, 201, "Book type created.");
}else{
    $returnData = msg(1, 422, "Book type not created.");
}

echo json_encode($returnData);