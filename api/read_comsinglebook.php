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

$result = $post->read_comsinglebook();

    $post_arr = array(
        
        
        'id'            => $post->id,
        'topic'         => $post->topic,
        'abstract'      => $post->abstract,
        'introduction'  => $post->introduction,
        'category'      => $post->category,
        'book_types'    => $post->book_types,
        'cost'          => $post->cost,
        'downloads'     => $post->downloads,
        'doc'           => $post->doc,
        'size'          => $post->size,
        'created_by'    => $post->created_by,
        'created'       => $post->created,
        'book_id'          => $post->book_id,
        'code'          => $post->code,
        'last_update'   => $post->last_update
        
            
            
        );
        //make a json
print_r(json_encode($post_arr));
