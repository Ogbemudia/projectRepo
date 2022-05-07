<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//header('Access-Control-Allow-Methods: GET');
//header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);
//get the raw posted data

$post->id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $post->read_singlepayment();

    $post_arr = array(
        
        
        'id'            => $post->id,
        'bank_logo'         => $post->bank_logo,
        'bank_name'      => $post->bank_name,
        'acc_number'  => $post->acc_number,
        'acc_name'      => $post->acc_name,
        'phone'    => $post->phone
        
        
            
            
        );
        //make a json
print_r(json_encode($post_arr));
