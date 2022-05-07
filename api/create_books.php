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

if (isset($_POST['topic']) || isset($_POST['abstract']) || isset($_POST['introduction']) || isset($_POST['category']) || isset($_POST['book_types'])|| isset($_POST['created_by'])|| isset($_POST['created'])|| isset($_POST['cost'])|| isset($_POST['size']) || isset($_POST['file'])) {

   
    
    
     /* Getting file name */
    $post->filename = $_FILES['file']['name'];
    $post->file = $_FILES['file']['tmp_name'];
    $size = $_FILES['file']['size'];
    $extension = pathinfo($post->filename, PATHINFO_EXTENSION);
    $extension_arr = array("pdf","doc","docx");
    if (!in_array($extension, $extension_arr)) {
        $type_err= "File must be pdf or word format";
        
        $returnData = msg(1, 422, $type_err);
    } elseif ($post->upload()) {
        // $upsucc= "Doc uploaded.";
        // $returnData = msg(0, 201, $upsucc);
        //}
       
      
        /////////////////////////////////////////////////////
       
        
       //////////////////////////////////////////////////////
            $post->topic =$_POST['topic'];
            $post->abstract=$_POST['abstract'];
            $post->introduction=$_POST['introduction'];
            $post->category=$_POST['category'];
            $post->book_types=$_POST['book_type'];
            $post->cost=$_POST['cost'];

            $post->doc = $_FILES['file']['name'];
            $post->size = $_FILES['file']['size'];

            $date1 = date("F j, Y");
            $tim = date("g:i a");
            $post->created = $date1. " at ".$tim;
       
            $post->code = md5(time());
            $post->book_id = substr(sha1(time()), 0, 6);
            $post->created_by = $username;
            //$post->pages=  $pages;
        
            //substr($book_id,0,6);
            //}

            //create post
            if ($post->books()) {
                $returnData = msg(0, 201, "Book created.");
            } else {
                $returnData = msg(1, 422, "Book not created.");
            }
        }
    }


echo json_encode($returnData);


    

