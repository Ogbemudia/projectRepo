<?php
header("Access-Control-Allow-Origin: localhost/projectGalore/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require __DIR__.'/classes/configdb.php';


function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}




// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];



   // $returnData = msg(1,201,'Login successful.');

   
   
 

    //$returnData = msg(1,201,'You have successfully loggedin.');

    if (empty(trim($_POST["code"]))) {
        $code_err = "Please enter Download Code.";
        $returnData = msg(0, 422, $code_err);
    } else {
        $code = trim($_POST["code"]);
    }

    
    //Validating inputs
    if (empty($code_err)) {

 //Select statement
        $sql = "SELECT id, code, doc, downloads FROM books WHERE code = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            //bind the variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_code);
     
            //set parameters
            $param_code = $code;
    
            //executing the statement
            if (mysqli_stmt_execute($stmt)) {
                //store result
                mysqli_stmt_store_result($stmt);

                //checking if username exits, 
                if (mysqli_stmt_num_rows($stmt) > 0) {
             
             //Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $code, $doc, $downloads);
            
                    
             
                if (mysqli_stmt_fetch($stmt)) {
                   
                    $downloads = $downloads + 1;

                    $updateQuery = "UPDATE books SET downloads=$downloads WHERE id=$id";
                    if (mysqli_query($link, $updateQuery)) {
                        $succ = $doc;
                        $returnData = msg(0, 201, $succ);
                    }
                    } else {
                        $returnData = msg(1, 422, "Error! Please try again later.");
                }
                } else {
                    $code_err = "You have entered wrong code.";
                    $returnData = msg(1, 422, $code_err);
                    
                }
            //close statement
            mysqli_stmt_close($stmt);
        }
    }
    //close connection
 mysqli_close($link);

    echo json_encode($returnData);
};
//print_r(json_encode($post_arr));
