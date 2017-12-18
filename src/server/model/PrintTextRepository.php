<?php

class PrintTextRepository extends DbRepository
{

    var $scheem = "";
    var $layout = array(
            "id"	    =>array("id","int","0",1),
            "print_id"	=>array("print_id","int","0",1),
            "text"		=>array("text","text","0",1),
            "size"	    =>array("size","int","15",1),
            "x"		    =>array("x","int","0",1),
            "y"		    =>array("y","int","0",1),
            "font"	    =>array("font","text","",1),
            "desine"	=>array("desine","text","",1),
            "length"	=>array("length","text","",1),
            "create"	=>array("create","int","111111111111",1),
            "update"	=>array("update","int","111111111111",1)
    );

    public function insert($status){

        $status = $this->validate->add($status);

        $sql = "
            INSERT INTO print_text(
                id, print_id, text, size, x, y, font, desine, length, create, update
                )
            VALUES(
                :id, :print_id, :text, :size, :x, :y, :font, :desine, :length, :create, :update
            )
        ";

        $stmt = $this->execute($sql,array(
                ':id'		=> $status['id'],
                ':print_id'	=> $status['print_id'],
                ':text'		=> $status['text'],
                ':size'     => $status['size'],
                ':x'	    => $status['x'],
                ':y'		=> $status['y'],
                ':font'	    => $status['font'],
                ':desine'	=> $status['desine'],
                ':length'	=> $status['length'],
                ':create'   => $status['create'],
                ':update'	=> $status['update']
            ));
    }

    public function update($status){

        $status = $this->validate->add($status);

        $sql = "
        UPDATE print_text SET
            print_id	= :print_id,
            text		= :text,
            size		= :size,
            x			= :x,
            y			= :y,
            font		= :font,
            desine		= :desine,
            length		= :length,
            create		= :create,
            update		= :update
        WHERE
            id			= :id
        ";

        $stmt = $this->execute($sql,array(
            ':id'		=> $status['id'],
            ':print_id'	=> $status['print_id'],
            ':text'		=> $status['text'],
            ':size'     => $status['size'],
            ':x'	    => $status['x'],
            ':y'		=> $status['y'],
            ':font'	    => $status['font'],
            ':desine'	=> $status['desine'],
            ':length'	=> $status['length'],
            ':create'   => $status['create'],
            ':update'	=> $status['update']
        ));
    }

    public function fetchAll(){
        $sql = "
        SELECT
            id,
            print_id,
            text,
            size,
            x,
            y,
            font,
            desine,
            length,
            create,
            update
        FROM
            print_text
        ";

        return $this->fetchAll($sql,array());
    }

    public function fetchById($status){
        $sql = "
        SELECT
            id,
            print_id,
            text,
            size,
            x,
            y,
            font,
            desine,
            length,
            create,
            update
        FROM
            print_text
        WHERE
            id	= :id
        ";

        return $this->fetch($sql,array(
                ':id'	=> $status['id']
        ));
    }
    public function fetchByPrintId($status){
        $sql = "
        SELECT
            id,
            print_id,
            text,
            size,
            x,
            y,
            font,
            desine,
            length,
            create,
            update
        FROM
            print_text
        WHERE
            print_id	= :id
        ";

        return $this->fetchAll($sql,array(
                ':id'	=> $status['id']
        ));
    }
}

