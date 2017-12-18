<?php

/**
 * AjaxController.
 *
 */
class AjaxController extends Controller
{
    private $_job = "";
    private $_id = "";
    private $_data = [];

    public function mainAction()
    {
        $this->_data = $this->request->getJson();
        $this->_job = $this->_data['job'];
        $this->_id = (isset($this->_data['id']))?$this->_data['id']:false;

        if(!is_null($this->_job)){

            switch ($this->_job) {
                /**
                * データ取得
                **/
                case 'get_p':   $this->getPrintData('PrintData');   break;
                case 'get_t':   $this->getTextData('PrintText');   break;
                /**
                * データ追加
                **/
                case 'add_p':   $this->addNewData('PrintData');   break;
                case 'add_t':   $this->addNewData('PrintText');   break;
                /**
                * データ更新
                **/
                case 'update_p':  $this->updateData('PrintData');   break;
                case 'update_t':  $this->updateData('PrintText');   break;

            }
        }
    }
    /**
     * 
     * 取得処理
     *
     */

    public function getPrintData($repository){
        if($this->_id == "all"){
            $data = $this->db_manager->get($repository)->fetchAllTitle();
        }else{
            $data = $this->db_manager->get($repository)
            ->fetchById(array("id" => $this->_id));
        }
        $this->json($data);
    }
    public function getTextData($repository){
        if($this->_id == "all"){
            $data = $this->db_manager->get($repository)->fetchAllTitle();
        }else{
            $data = $this->db_manager->get($repository)
            ->fetchByPrintId(array("id" => $this->_id));
        }
        $this->json($data);
    }
    /**
     *
     * 追加処理
     *
     */

     public function addNewData($repository){
        $this->db_manager->get($repository)->insert($this->_data);
        $data = [];
        $data['status'] = "success";
        $this->json($data);
     }


    /**
     *
     * 更新処理
     *
     */
     public function updateData($repository){
        $this->db_manager->get($repository)->update($this->_data);
        $data = [];
        $data["status"] = 'success';
        $this->json($data);         
     }


}
