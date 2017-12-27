<?php

class PrintDataRepository extends DbRepository
{

    var $scheem = "";
    var $layout = array(
            "id"		=>array("id","int","0",1),
            "title"		=>array("title","text","",1),
            "template"	=>array("template","text","",1),
            "size"	    =>array("size","text","a4",1),
            "direction"	=>array("direction","text","vertical",1),
            "careated"	=>array("create","int","111111111111",1),
            "updated"	=>array("update","int","111111111111",1),
    );

    public function insert($status){

        $status = $this->validate->add($status);

        $sql = "
            INSERT INTO print_data(
                title, template, size, direction, created, updated
            ) VALUES (
                :title, :template, :size, :direction, :created, :updated
            )
        ";

        $stmt = $this->execute($sql,array(
                    ':title'		=> $status['title'],
                    ':template'		=> $status['template'],
                    ':size'		    => $status['size'],
                    ':direction'	=> $status['direction'],
                    ':created'		=> time(),
                    ':updated'		=> time(),
                ));
    }

    public function update($status){

        $status = $this->validate->add($status);

        $sql = "
        UPDATE print_data SET
            title	    = :title,
            template	= :template,
            size	    = :size,
            direction	= :direction,
            updated  	= :updated
        WHERE
            id			= :id
        ";

        return $this->execute($sql,array(
                ':id'		=> $status['id'],
                ':title'	=> $status['title'],
                ':template'	=> $status['template'],
                ':size'	    => $status['size'],
                ':direction'=> $status['direction'],
                ':updated'	=> time(),
        ));
    }

    public function delete($status){
        $sql = "
        DELETE FROM
            print_data
        WHERE
            id			= :id
        ";

        return $this->execute($sql,array(
                ':id'		=> $status['id']
        ));
    }

    public function getAll() {
        $sql = "
        SELECT
            id, title, template, size, direction, created, updated
        FROM
            print_data
        ";

        return $this->fetchAll($sql,array());
    }

    public function getAllTitle(){
        $sql = "
        SELECT
            id, title, size, direction, created, updated
        FROM
            print_data
        ";

        return $this->fetchAll($sql, array());
    }
    public function getLatest(){
        $sql = "
        SELECT
            id, title, template, size, direction, created, updated
        FROM
            print_data
        ORDER BY id DESC
        LIMIT 1
        ";

        return $this->fetch($sql,array());
    }
    public function getById($status){
        $sql = "
        SELECT
            id, title, template, size, direction, created, updated
        FROM
            print_data
        WHERE
            id = :id
        ";
        return $this->fetch($sql,array(":id" => $status["id"]));
    }

}
