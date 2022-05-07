<?php
class Post
{
    //db link
    private $conn;
    private $books_table             = 'books';
    private $book_category_table     = 'book_category';
    private $book_type_table         = 'book_type';
    private $payment_table           = 'payment';
    private $userlogin_table         = 'userlogin';
    //private $location = "../upload/" . $filename;
    //private $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
   // private $imageFileType = strtolower($imageFileType);

   
    //post properties
    public $doc;
    public $filename;
    public $file;
    public $image;
    public $size;
    public $id;
    public $topic;
    public $abstract;
    public $created;
    public $introduction;
    public $category;
    public $book_types;
    public $code;
    public $book_id;
    public $created_by;
    public $cost;
    public $downloads;
    public $name;
    public $bank_logo;
    public $bank_name;
    public $acc_number;
    public $acc_name;
    public $last_update;
    public $history;
    public $first_name;
    public $last_name;
    public $username;
    public $email;
    public $phone;
    public $pages;

   

    //constructor with db connection
    public function __construct($db)
    {
        $this->conn=$db;
    }

/******** **** **** **** **** ************ **** **** **** **** ****   upload image  ******** **** **** **** **** ******** **** **** **** **** ********/
public function upload(){
   
 
    /* Location */
    $this->location = "../upload/" . $this->filename;
    $this->imageFileType = pathinfo($this->location, PATHINFO_EXTENSION);
    $this->imageFileType = strtolower($this->imageFileType);

    
       /* Upload file */
        if (move_uploaded_file($this->file, $this->location)) {
            return true;
        }
        //printf("Error %s. \n", $stmt->error);
        return false;
}

/*** download books ***/
public function download_book(){
    $query= 'SELECT
    id,
    cost,
    doc
    FROM '.$this->books_table.' 
    WHERE cost = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->cost);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->cost         = $row['cost'];
    $this->doc          = $row['doc'];
    $this->id          = $row['id'];
    
    
    }

    /***********************************update downloads */
    public function update_downloads(){
                  
        //update downloads
        $query = 'UPDATE '. $this->books_table . " SET 
        downloads           =  :downloads
        WHERE code          =  :code";
        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->downloads        = htmlspecialchars(strip_tags($this->downloads));
        $this->code     = htmlspecialchars(strip_tags($this->code));
        
        //binding param
        $stmt->bindParam(':downloads', $this->downloads);
        $stmt->bindParam(':code', $this->code);
        
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

/******** **** **** **** **** ************ **** **** **** **** ****   Books  ******** **** **** **** **** ******** **** **** **** **** ********/
    /*** create books ***/
    public function books(){
                  
         //create query
         $query = 'INSERT INTO '. $this->books_table . " SET 
         topic             =  :topic,
         abstract          =  :abstract,
         introduction      =  :introduction,
         category          =  :category,
         book_types        =  :book_types,
         doc               =  :doc,
         size              =  :size,
         created_by        =  :created_by,
         created           =  :created,
         cost              =  :cost,
         book_id           =  :book_id,
         pages             =  :pages,
         code              =  :code";
        
         //prepare statement
         $stmt = $this->conn->prepare($query);

         //clean data
         $this->topic        = htmlspecialchars(strip_tags($this->topic));
         $this->abstract     = htmlspecialchars(strip_tags($this->abstract));
         $this->introduction = htmlspecialchars(strip_tags($this->introduction));
         $this->category     = htmlspecialchars(strip_tags($this->category));
         $this->book_types   = htmlspecialchars(strip_tags($this->book_types));
         $this->doc          = htmlspecialchars(strip_tags($this->doc));
         $this->size         = htmlspecialchars(strip_tags($this->size));
         $this->created_by   = htmlspecialchars(strip_tags($this->created_by));
         $this->created      = htmlspecialchars(strip_tags($this->created));
         $this->cost         = htmlspecialchars(strip_tags($this->cost));
         $this->book_id         = htmlspecialchars(strip_tags($this->book_id));
         $this->code         = htmlspecialchars(strip_tags($this->code));
         $this->pages         = htmlspecialchars(strip_tags($this->pages));

         

         //binding param
         $stmt->bindParam(':topic', $this->topic);
         $stmt->bindParam(':abstract', $this->abstract);
         $stmt->bindParam(':introduction', $this->introduction);
         $stmt->bindParam(':category', $this->category);
         $stmt->bindParam(':book_types', $this->book_types);
         $stmt->bindParam(':doc', $this->doc);
         $stmt->bindParam(':size', $this->size);
         $stmt->bindParam(':created_by', $this->created_by);
         $stmt->bindParam(':created', $this->created);
         $stmt->bindParam(':cost', $this->cost);
         $stmt->bindParam(':book_id', $this->book_id);
         $stmt->bindParam(':code', $this->code);
         $stmt->bindParam(':pages', $this->pages);

         //execute
         if($stmt->execute()){
            return true; 
        }
        //error
        printf("Error %s. \n", $stmt->error);
        return false;
    }

/*** read books ***/
    public function read_books(){
        //create query
        $query = 'SELECT
        b.id,
        b.topic,
        b.abstract,
        b.introduction,
        b.category,
        b.book_types,
        b.doc,
        b.size,
        b.created_by,
        b.created,
        b.cost,
        b.downloads,
        b.code,
        b.book_id,
        b.pages,
        b.last_update
        FROM '.$this->books_table.' b
        ORDER BY b.created DESC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }

    /*** read all books ***/
    public function read_allbooks(){
        //create query
        $query = 'SELECT
        b.id,
        b.topic,
        b.abstract,
        b.introduction,
        b.category,
        b.book_types,
        b.cost,
        b.book_id,
        b.pages,
        b.downloads
        FROM '.$this->books_table.' b
        ORDER BY b.created DESC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }
//////////////////////////
/*** read recent downloads ***/
public function read_downloads(){
    //create query
    $query = 'SELECT
    b.id,
    b.topic,
    b.abstract,
    b.introduction,
    b.category,
    b.book_types,
    b.cost,
    b.book_id,
    b.pages,
    b.downloads
    FROM '.$this->books_table.' b
    ORDER BY b.downloads DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}
     /*** read single books ***/
     public function read_singlebook(){
        $query= 'SELECT
        id,
        topic,
        abstract,
        introduction,
        category,
        book_types,
        cost,
        book_id,
        pages,
        downloads
        FROM '.$this->books_table.' 
        WHERE id = ? LIMIT 1';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->topic          = $row['topic'];
        $this->abstract       = $row['abstract'];
        $this->introduction   = $row['introduction'];
        $this->category       = $row['category'];
        $this->book_types     = $row['book_types'];
        $this->cost           = $row['cost'];
        $this->book_id        = $row['book_id'];
        $this->pages          = $row['pages'];
        $this->downloads      = $row['downloads'];
        
        }

        /*** read complete single books ***/
     public function read_comsinglebook(){
        $query= 'SELECT
        id,
        topic,
        abstract,
        introduction,
        category,
        book_types,
        doc,
        size,
        created_by,
        created,
        cost,
        downloads,
        code,
        book_id,
        pages,
        last_update
        FROM '.$this->books_table.' 
        WHERE id = ? LIMIT 1';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->topic          = $row['topic'];
        $this->abstract       = $row['abstract'];
        $this->introduction   = $row['introduction'];
        $this->category       = $row['category'];
        $this->book_types     = $row['book_types'];

        $this->doc            = $row['doc'];
        $this->size           = $row['size'];
        $this->created_by     = $row['created_by'];
        $this->created        = $row['created'];
        $this->book_id        = $row['book_id'];

        $this->cost           = $row['cost'];
        $this->downloads      = $row['downloads'];
        $this->code           = $row['code'];
        $this->pages           = $row['pages'];

        $this->last_update    = $row['last_update'];
        
        }

        /*** read by category ***/
     public function read_catbook(){
        $query= 'SELECT
        b.id,
        b.topic,
        b.abstract,
        b.introduction,
        b.category,
        b.book_types,
        b.cost,
        b.book_id,
        b.pages,
        b.downloads
        FROM '.$this->books_table.' b
        WHERE b.category = ?';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->topic          = $row['topic'];
        $this->abstract       = $row['abstract'];
        $this->introduction   = $row['introduction'];
        $this->category       = $row['category'];
        $this->book_types     = $row['book_types'];
        $this->cost           = $row['cost'];
        $this->book_id        = $row['book_id'];
        $this->pages        = $row['pages'];
        $this->downloads      = $row['downloads'];
        
        }

        
        /*** read by book type ***/
     public function read_bookbytype(){
        $query= 'SELECT
        b.id,
        b.topic,
        b.abstract,
        b.introduction,
        b.category,
        b.book_types,
        b.cost,
        b.book_id,
        b.pages,
        b.downloads
        FROM '.$this->books_table.' b
        WHERE b.book_types = ?';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->topic          = $row['topic'];
        $this->abstract       = $row['abstract'];
        $this->introduction   = $row['introduction'];
        $this->category       = $row['category'];
        $this->book_types     = $row['book_types'];
        $this->cost           = $row['cost'];
        $this->book_id        = $row['book_id'];
        $this->pages        = $row['pages'];
        $this->downloads      = $row['downloads'];
        
        }



    /*** update books ***/
    public function update_books(){
                  
        //create query
        $query = 'UPDATE '. $this->books_table . " SET 
        topic             =  :topic,
        abstract          =  :abstract,
        introduction      =  :introduction,
        category          =  :category,
        book_types        =  :book_types,
        cost              =  :cost,
        last_update       =  :last_update
        WHERE id          =  :id";
        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->topic        = htmlspecialchars(strip_tags($this->topic));
        $this->abstract     = htmlspecialchars(strip_tags($this->abstract));
        $this->introduction = htmlspecialchars(strip_tags($this->introduction));
        $this->category     = htmlspecialchars(strip_tags($this->category));
        $this->book_types   = htmlspecialchars(strip_tags($this->book_types));
        $this->cost         = htmlspecialchars(strip_tags($this->cost));
        $this->last_update  = htmlspecialchars(strip_tags($this->last_update));
        $this->id           = htmlspecialchars(strip_tags($this->id));

        //binding param
        $stmt->bindParam(':topic', $this->topic);
        $stmt->bindParam(':abstract', $this->abstract);
        $stmt->bindParam(':introduction', $this->introduction);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':book_types', $this->book_types);
        $stmt->bindParam(':cost', $this->cost);
        $stmt->bindParam(':last_update', $this->last_update);
        $stmt->bindParam(':id', $this->id);
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

   /*** update books and img ***/
   public function update_booksimg(){
                  
    //create query
    $query = 'UPDATE '. $this->books_table . " SET 
    topic             =  :topic,
    abstract          =  :abstract,
    introduction      =  :introduction,
    category          =  :category,
    book_types        =  :book_types,
    doc               =  :doc,
    size              =  :size,
    cost              =  :cost,
    pages              =  :pages,
    last_update       =  :last_update
    WHERE id          =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->topic        = htmlspecialchars(strip_tags($this->topic));
    $this->abstract     = htmlspecialchars(strip_tags($this->abstract));
    $this->introduction = htmlspecialchars(strip_tags($this->introduction));
    $this->category     = htmlspecialchars(strip_tags($this->category));
    $this->book_types   = htmlspecialchars(strip_tags($this->book_types));
    $this->doc          = htmlspecialchars(strip_tags($this->doc));
    $this->size         = htmlspecialchars(strip_tags($this->size));
    $this->cost         = htmlspecialchars(strip_tags($this->cost));
    $this->last_update  = htmlspecialchars(strip_tags($this->last_update));
    $this->pages        = htmlspecialchars(strip_tags($this->pages));
    $this->id           = htmlspecialchars(strip_tags($this->id));

    //binding param
    $stmt->bindParam(':topic', $this->topic);
    $stmt->bindParam(':abstract', $this->abstract);
    $stmt->bindParam(':introduction', $this->introduction);
    $stmt->bindParam(':category', $this->category);
    $stmt->bindParam(':book_types', $this->book_types);
    $stmt->bindParam(':doc', $this->doc);
    $stmt->bindParam(':size', $this->size);
    $stmt->bindParam(':cost', $this->cost);
    $stmt->bindParam(':last_update', $this->last_update);
    $stmt->bindParam(':pages', $this->pages);
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


   /*** delete books ***/
   public function delete_books(){
                  
    //create query
    $query = 'DELETE FROM '. $this->books_table . " WHERE id = :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->id      = htmlspecialchars(strip_tags($this->id));

    //binding param
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   category  ******** **** **** **** **** ******** **** **** **** **** ********/
    /****   create category  ****/
    public function category(){
               
        //create query
        $query = 'INSERT INTO '. $this->book_category_table. ' SET
        category   = :category,
        created    = :created';
        //prepare statement
        $stmt = $this->conn->prepare($query);

         //clean data
         $this->category    = htmlspecialchars(strip_tags($this->category));
         $this->created     = htmlspecialchars(strip_tags($this->created));
         
        //binding param
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':created', $this->created);
        
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

/*** read category ***/
public function read_category(){
    //create query
    $query = 'SELECT
    c.id,
    c.category,
    c.created
    FROM '.$this->book_category_table.' c
    ORDER BY c.category ASC';
    //$this->conn->quote($this->book_category_table);
//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all category ***/
public function read_allcategory(){
    //create query
    $query = 'SELECT
    c.id,
    c.category,
    
    
    FROM '.$this->book_category_table.' c
    ORDER BY c.created DESC';
    //$this->conn->quote($this->book_category_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single category ***/
 public function read_singlecategory(){
    $query= 'SELECT
     id,
     category
     
    FROM '.$this->book_category_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->book_category_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id         = $row['id'];
    $this->category   = $row['category'];
    
    
    }

/*** update category ***/
public function update_category(){
              
    //create query
    $query = 'UPDATE '. $this->book_category_table . " SET 
    category   =  :category
    WHERE id   =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->category    = htmlspecialchars(strip_tags($this->category));
    $this->id          = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':category', $this->category);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete category ***/
public function delete_category(){
              
//create query
$query = 'DELETE FROM '. $this->book_category_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   book_type  ******** **** **** **** **** ******** **** **** **** **** ********/
   /****   create book_type  ****/
   public function book_type(){
    //clean data
    $this->name    = htmlspecialchars(strip_tags($this->name));
    $this->created = htmlspecialchars(strip_tags($this->created));
    
    //create query
    $query = 'INSERT INTO '. $this->book_type_table.' SET
    name    = :name,
    created = :created';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':created', $this->created);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read book_type ***/
public function read_allbook_type(){
    //create query
    $query = 'SELECT
    t.id,
    t.name,
    t.created
    
    FROM '.$this->book_type_table.' t
    ORDER BY t.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}


 /*** read single book_type ***/
 public function read_singlebook_type(){
    $query= 'SELECT
     id,
     name   
     
    FROM '.$this->book_type_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id     = $row['id'];
    $this->name  = $row['name'];
    
       
    }

/*** update book_type ***/
public function update_booktype(){
              
    //create query
    $query = 'UPDATE '. $this->book_type_table . " SET 
    
    name       =  :name
    WHERE id   =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->name        = htmlspecialchars(strip_tags($this->name));
  
    $this->id          = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':name', $this->name);
   
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}



/*** delete book_type ***/
public function delete_book_type(){
              
//create query
$query = 'DELETE FROM '. $this->book_type_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   payment  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   create payment  ****/
public function payment(){
    //clean data
    $this->bank_logo     = htmlspecialchars(strip_tags($this->bank_logo));
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));
    $this->created       = htmlspecialchars(strip_tags($this->created));
    $this->last_update   = htmlspecialchars(strip_tags($this->last_update));
    $this->created_by    = htmlspecialchars(strip_tags($this->created_by));
    
    //create query
    $query = 'INSERT INTO '.$this->payment_table.' SET
    bank_logo    = :bank_logo,
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    created      = :created,
    last_update  = :last_update,
    created_by   = :created_by';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':bank_logo', $this->bank_logo);
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':created', $this->created);
    $stmt->bindParam(':last_update', $this->last_update);
    $stmt->bindParam(':created_by', $this->created_by);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read payment ***/
public function read_payment(){
    //create query
    $query = 'SELECT
    p.id,
    p.bank_logo,
    p.bank_name,
    p.acc_number,
    p.acc_name,
    p.phone,
    p.last_update,
    p.created
    
    FROM '.$this->payment_table.' p
    ORDER BY p.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all payment ***/
public function read_allpayment(){
    //create query
    $query = 'SELECT
    p.id,
    p.bank_logo,
    p.bank_name,
    p.acc_number,
    p.acc_name,
    p.phone,
    p.last_update,
    p.created
   
    FROM '.$this->payment_table.' p
    ORDER BY p.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single payment ***/
 public function read_singlepayment(){
    $query= 'SELECT
    id,
    bank_logo,
    bank_name,
    acc_number,
    acc_name,
    phone
    
     
    FROM '.$this->payment_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->payment_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id         = $row['id'];
    $this->bank_logo  = $row['bank_logo'];
    $this->bank_name  = $row['bank_name'];
    $this->acc_number = $row['acc_number'];
    $this->acc_name   = $row['acc_name'];
    $this->phone      = $row['phone'];
    
       
    }

/*** update payment ***/
public function update_payment(){
              
    //create query
    $query = 'UPDATE '. $this->payment_table . " SET 
    
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    
    last_update  = :last_update
    
    WHERE id      =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));

    $this->last_update   = htmlspecialchars(strip_tags($this->last_update));
    $this->id            = htmlspecialchars(strip_tags($this->id));

   //binding param
  
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':last_update', $this->last_update);
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** update payment img ***/
public function update_payimg(){
              
    //create query
    $query = 'UPDATE '. $this->payment_table . " SET 
    
    bank_logo    = :bank_logo,
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    
    last_update  = :last_update
    
    WHERE id      =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->bank_logo     = htmlspecialchars(strip_tags($this->bank_logo));
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));

    $this->last_update   = htmlspecialchars(strip_tags($this->last_update));
    $this->id            = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':bank_logo', $this->bank_logo);
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':last_update', $this->last_update);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete payment ***/
public function delete_payment(){
              
//create query
$query = 'DELETE FROM '. $this->payment_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   users  ******** **** **** **** **** ******** **** **** **** **** ********/
/*** read users ***/
public function read_login(){
    //create query
    $query = 'SELECT
    l.id,          
    l.created,
    l.first_name,
    l.last_name,
    l.email,
    l.username,
    l.category,
    l.history   
   
    FROM '.$this->userlogin_table.' l
    ORDER BY l.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read single user ***/
public function read_singlelogin(){
    $query= 'SELECT
    id,          
    created,
    first_name,
    last_name,
    email,
    username,
    category,
    history   
     
    FROM '.$this->userlogin_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id           = $row['id'];
    $this->created      = $row['created'];
    $this->first_name   = $row['first_name'];
    $this->last_name    = $row['last_name'];
    $this->email        = $row['email'];
    $this->username     = $row['username'];
    $this->category     = $row['category'];
    $this->history      = $row['history'];

   
    }

}