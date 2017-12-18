<?php

class PrintDataRepository extends DbRepository
{

    var $scheem = "";
    var $layout = array(
            "id"		=>array("id","int","0",1),
            "title"		=>array("title","text","",1),
            "template"	=>array("template","text","",1),
            "careate"	=>array("create","int","111111111111",1),
            "update"	=>array("update","int","111111111111",1),
    );

    public function insert($status){

        $status = $this->validate->add($status);

        $sql = "
            INSERT INTO print_data(
                id, title, template, create, update
            ) VALUES (
                :id,:title,:template, :create, :update
            )
        ";

        $stmt = $this->execute($sql,array(
                    ':id'			=> $status['id'],
                    ':title'		=> $status['title'],
                    ':template'		=> $status['template'],
                    ':create'		=> time(),
                    ':update'		=> time(),
                ));
    }

    public function update($status){

        $status = $this->validate->add($status);

        $sql = "
        UPDATE print_data SET
            title	    = :title,
            template	= :template,
            update  	= :update
        WHERE
            id			= :id
        ";

        return $this->execute($sql,array(
                ':id'		=> $status['id'],
                ':title'	=> $status['title'],
                ':template'	=> $status['template'],
                ':update'	=> time(),
        ));
    }

    public function fetchAll(){
        $sql = "
        SELECT
            id, title, template, create, update
        FROM
            print_data
        ";

        return $this->fetchAll($sql,array());
    }

    public function fetchAllTitle(){
        $sql = "
        SELECT
            id, title, create, update
        FROM
            print_data
        ";

        return $this->fetchAll($sql,array());
    }

    public function fetchById($status){
        $sql = "
        SELECT
            id,title,template,create,update
        FROM
            print_data
        WHERE
            id = :id
        ";
        return $this->fetch($sql,array(":id" => $status["id"]));
    }

}
