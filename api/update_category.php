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
$post->id         =$_POST['id'];
$post->category   =$_POST['category'];



/*$post->calendardate = $data->calendardate;
$post->details      = $data->details;
$post->id           = $data->id;

 */
//create post
if($post->update_category()){
    $returnData = msg(1, 201, "Category updated.");
} else {
    $returnData = msg(1, 422, "Category not updated.");
}

echo json_encode($returnData);

