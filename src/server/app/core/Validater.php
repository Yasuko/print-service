<?php

/**
 * Validater.
 *
 */
class Validater
{
    protected $base_dir;
    protected $defaults;
    protected $layout = array();

    /**
     * コンストラクタ
     *
     */
    public function __construct($layout)
    {
        $this->layout = $layout;
    }

    /**
     *
     */
    public function add($status)
    {
        $RepoData = Array();

        foreach ($this->layout as $key => $value){

            if(isset($status[$key]) && $status[$key] != ""){
                $valid_data = $status[$key];
            }else{
                $valid_data = "";
            }

            $RepoData[$key] =
                $this->check($value,$valid_data);
        }

        return $RepoData;
    }

    private function check($cast,$data = ""){
        if($cast[1] === "int"){

            if(isset($data) && is_numeric($data) && $data != ""){
                return $data;
            }else{
                return $cast[2];
            }

        }elseif($cast[1] === "text"){

            if(isset($data) && is_string($data) && $data != ""){
                return $data;
            }else{
                return $cast[2];
            }

        }elseif($cast[1] === "date"){

        }elseif($cast[1] === "mail"){

            if (isset($data) && preg_match(
                "/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@".
                "([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/",
                $data)) {

                return $data;

            }else{

                return "hoge@example.jp";
            }
        }elseif($cast[1] === "url"){

            if (isset($data) && preg_match(
                "/^(https?|ftp)".
                "(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/",
                $data)) {

                return $data;

            }else{

                return "http://example.jp/";

            }

        }elseif($cast[1] === "phone"){
            if(isset($data) && preg_match(
                "/^0\d{9,10}$/",
                str_replace("-", "", $data))){

                return $data;

            }else{

                return "000-0000-0000";
            }


        }elseif($cast[1] === "bool"){

            return is_bool($data)?$data:"";

        }else{

        }
    }
}
