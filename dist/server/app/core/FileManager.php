<?php

/**
 * 
 * FileManager.
 * 
 **/


class FileManager
{
	
	protected $Path;
	protected $Handle;
	
	private $Files = array();
	private $Dirs = array();
	
	/**
	 * ディレクトリを開き
	 * ファイル、ディレクトリの一覧を取得
	 *
	 */
	private function opendirs(){
		
		$this->Handle = @opendir($this->Path);
		
		while($name = readdir($this->Handle)){
			if(is_dir($this->Path.$name)){
				
				array_push($this->Dirs, $name);
				
			}elseif(is_file($this->Path.$name)){
				
				array_push($this->Files, $name);
				
			}
		}
	}
	
	
	public function __construct(){

	}
	
	/**
	 * ディレクトリを検証し登録
	 *
	 * @param string $dir_path
	 */
	public function setPath($dir_path){
		if(is_dir($dir_path)){
			
			$this->Path = $dir_path;
			$this->opendirs();
			
		}else{
			throw new Exeption('Can\'t open directions directory');
		}
	}
	
	/**
	 * ファイル一覧を取得
	 *
	 * @return array ファイル名の配列を返す
	 */
	public function getFiles(){
		return $this->Files;
	}
	
	/**
	 * ファイル一覧を取得
	 *
	 * @return array フォルダ名の配列を返す
	 */
	public function getDirs(){
		return $this->Dirs;
	}
	
	public function deleteFile($file){
		
	}
	
	public function deleteDir($dir){
		
	}
	
	public function makeDir($dir){
		
	}
	
	public function readFile($file,$mode){
		
	}
}