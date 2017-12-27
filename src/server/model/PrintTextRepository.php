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
            "length"	=>array("length","int","10",1),
            "label" 	=>array("label","text","text",1),
            "tag"	    =>array("tag","text","input",1),
            "created"	=>array("created","int","111111111111",1),
            "updated"	=>array("updated","int","111111111111",1)
    );

    public function insert($status){

        $status = $this->validate->add($status);

        $sql = "
            INSERT INTO print_text(
                print_id, text, size, x, y, font,
                desine, length, label, tag, created, updated
                )
            VALUES(
                :print_id, :text, :size, :x, :y, :font, :desine,
                :length, :label, :tag, :created, :updated
            )
        ";

        $stmt = $this->execute($sql,array(
                ':print_id'	=> $status['print_id'],
                ':text'		=> $status['text'],
                ':size'     => $status['size'],
                ':x'	    => $status['x'],
                ':y'		=> $status['y'],
                ':font'	    => $status['font'],
                ':desine'	=> $status['desine'],
                ':length'	=> $status['length'],
                ':label'	=> $status['label'],
                ':tag'  	=> $status['tag'],
                ':created'   => time(),
                ':updated'	=> time()
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
            label		= :label,
            tag 		= :tag,
            updated		= :updated
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
            ':label'	=> $status['label'],
            ':tag'  	=> $status['tag'],
            ':updated'	=> time()
        ));
    }

    public function delete($status){
        $sql = "
        DELETE FROM
            print_text
        WHERE
            id          = :id
        ";

        $stmt = $this->execute($sql,array(
            ':id'		=> $status['id'],
        ));
    }

    public function deleteByPrintId($status){
        $sql = "
        DELETE FROM
            print_text
        WHERE
            print_id          = :print_id
        ";

        $stmt = $this->execute($sql,array(
            ':print_id'		=> $status['print_id'],
        ));
    }

    public function getAll(){
        $sql = "
        SELECT
            id, print_id, text, size, x, y,
            font, desine, length, label, tag, created, updated
        FROM
            print_text
        ";

        return $this->fetchAll($sql,array());
    }
    public function getLatest(){
        $sql = "
        SELECT
            id, print_id, text, size, x, y,
            font, desine, length, label, tag, created, updated
        FROM
            print_text
        ORDER BY id DESC
        LIMIT 1
        ";

        return $this->fetch($sql,array());
    }
    public function getById($status){
        $sql = "
        SELECT
            id, print_id, text, size, x, y,
            font, desine, length, label, tag, created, updated
        FROM
            print_text
        WHERE
            id	= :id
        ";

        return $this->fetch($sql,array(
                ':id'	=> $status['id']
        ));
    }
    public function getByPrintId($status){
        $sql = "
        SELECT
            id, print_id, text, size, x, y,
            font, desine, length, label, tag, created, updated
        FROM
            print_text
        WHERE
            print_id	= :print_id
        ";

        return $this->fetchAll($sql,array(
                ':print_id'	=> $status['print_id']
        ));
    }
}

