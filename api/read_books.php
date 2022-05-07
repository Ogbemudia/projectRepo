<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);


$result = $post->read_books();
//get the row count
$num = $result->rowCount();

if($num> 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
             

            'id'            => $id,
            'topic'         => $topic,
            'abstract'      =>$abstract,
            'introduction'  => $introduction,
            'category'      => $category,
            'book_types'    =>$book_types,
            'doc'           => $doc,
            'size'          => $size,
            'created_by'    =>$created_by,
            'cost'          => $cost,
            'downloads'     => $downloads,
            'code'          =>$code,
            'book_id'       =>$book_id,
            'last_update'   =>$last_update,
            'created'       =>$created
        );
        array_push($post_arr['data'], $post_item);

    }
    //convert to JSON and output
    echo json_encode($post_arr['data']);
}else{
    echo json_encode(array('message' => ' No post found.'));
}