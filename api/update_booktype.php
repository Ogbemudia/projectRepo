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
$post->id =$_POST['id'];
$post->name=$_POST['name'];

//create post
if($post->update_booktype()){
    $returnData = msg(1, 201, "Book Type updated.");
} else {
    $returnData = msg(1, 422, "Book Type not updated.");
}

echo json_encode($returnData);

