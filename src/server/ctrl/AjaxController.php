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
                case 'add_p':   $this->addNewPrint('PrintData');   break;
                case 'add_t':   $this->addNewText('PrintText');   break;
                /**
                * データ更新
                **/
                case 'update_p':  $this->updatePrint('PrintData');   break;
                case 'update_t':  $this->updateText('PrintText');   break;

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
            $data = $this->db_manager->get($repository)->getAll();
        }else{
            $data = $this->db_manager->get($repository)
                ->getById(array("id" => $this->_id));
        }
        $this->json($data);
    }
    public function getTextData($repository){
        if($this->_id == "all"){
            $data = $this->db_manager->get($repository)->getAll();
        }else{
            $data = $this->db_manager->get($repository)
                ->getByPrintId(array("print_id" => $this->_data['print_id']));
        }
        $this->json($data);
    }
    /**
     *
     * 追加処理
     *
     */

    public function addNewPrint($repository){
        // $this->_data['template'] = $this->_data['template']['changingThisBreaksApplicationSecurity'];
        $this->db_manager->get($repository)->insert($this->_data);
        $last = $this->db_manager->get($repository)->getLatest();;
        if ($last['title'] == $this->_data['title']) {
            $this->json($last);
        } else {
            $data['status'] = "false";
            $this->json($data);
        }
    }

    public function addNewText($repository){
        $num = count($this->_data['data']) - 1;
        for($i = 0; $i <= $num; $i++){
            $this->db_manager->get($repository)->insert($this->_data['data'][$i]);
        }

        $last = $this->db_manager->get($repository)->getLatest();;
        if ($last['text'] == $this->_data['data'][$num]['text']) {
            $this->json($last);
        } else {
            $data['status'] = "false";
            $this->json($data);
        }
    }

    /**
     *
     * 更新処理
     *
     */
     public function updatePrint($repository){
        $this->db_manager->get($repository)->update($this->_data);
        $data = $this->db_manager->get($repository)
            ->getById(array('id' => $this->_data['id']));
        $this->_data['created'] = $data['created'];
        $this->_data['updated'] = $data['updated'];
        $data['job'] = $this->_data['job'];
        $diff = array_diff($this->_data, $data);
        // var_dump($diff);
        if (count($diff) > 0) {
            $data = [];
            $data["status"] = 'false';
            $this->json($data);
            return;
        }
        $this->json($data);
     }
     public function updateText($repository){

        $this->db_manager->get($repository)
            ->deleteByPrintId(array('print_id' => $this->_data['data'][0]['print_id']));

        foreach ($this->_data['data'] as $key => $value) {
            $this->db_manager->get($repository)
                ->insert($value);
        }

        $data = $this->db_manager->get($repository)
            ->getByPrintId(array('print_id' => $this->_data['data'][0]['print_id']));

        foreach ($this->_data['data'] as $key => $value) {

            $diff = array_diff($value, $data[$key]);
            if (count($diff) > 3) {
                $data = [];
                $data["status"] = 'false';
                $this->json($data);
                return;
            }
        }
        $this->json($data);
     }

}
