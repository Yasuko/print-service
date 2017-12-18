<?php

/**
 * View.
 *
 */

class View
{
    protected $base_dir;
    protected $defaults;
    protected $request;
    protected $layout_variables = array();
    protected $twig;

    /**
     * コンストラクタ
     *
     * @param string $base_dir
     * @param array $defaults
     */
    public function __construct($base_dir, $defaults = array(),$request="")
    {
        $this->base_dir = $base_dir;
        $this->defaults = $defaults;
        $this->request = $request;
    }

    /**
     *
     * Twigセットアップ
     *
     */
    public function setupTwig()
    {


        $loader = new Twig_Loader_Filesystem($this->base_dir);
        $this->twig = new Twig_Environment(
                $loader,
                array(
                        'cache' => $this->base_dir."/../app/cache",
                        'debug' => true
                ));

        $this->twig->addExtension(
                new Twig_Myextension_CSJSLoader($this->defaults["base_url"]."/")
        );
        $this->twig->addExtension(
                new Twig_Myextension_Linker($this->defaults["base_url"]."/")
        );
        $this->twig->addExtension(
                new Twig_Myextension_U2date()
        );
    }


    /**
     * レイアウトに渡す変数を指定
     *
     * @param string $name
     * @param mixed $value
     */
    public function setLayoutVar($name, $value)
    {
        $this->layout_variables[$name] = $value;
    }

    /**
     * json出力
     *
     * @param array $_array
     * @return json
     */
    public function json($_array = array())
    {
        ob_start();
        ob_implicit_flush(0);
        header('Content-type: application/json');
        echo json_encode($_array);
        return false;
        //return json_encode($_array);
    }

    /**
     * ビューファイルをレンダリング
     *
     * @param string $_path
     * @param array $_variables
     * @param mixed $_layout
     * @return string
     */
    public function render($_path, $_variables = array(), $_layout = false)
    {
        $_file = $this->base_dir . '/' . $_path . '.php';

        extract(array_merge($this->defaults, $_variables));

        ob_start();
        ob_implicit_flush(0);

        require $_file;

        $content = ob_get_clean();

        if ($_layout) {
            $content = $this->render($_layout,
                array_merge($this->layout_variables, array(
                    '_content' => $content,
                )
            ));
        }

        return $content;
    }
    /**
     * Twigテンプレートをレンダリング
     *
     * @param string $_path
     * @param array $_variables
     * @param mixed $_layout
     * @return string
     */
    public function Twigrender($_path, $_variables = array(), $_layout = false)
    {
        //$_file = $this->base_dir . '/' . $_path . '.html.twig';
        $_file = $_path . '.html.twig';

        //extract(array_merge($this->defaults, $_variables));

        if ($_layout) {
            $content = $this->twig->render($_file,$_variables);
        }

        return $content;
    }

    /**
     * 指定された値をHTMLエスケープする
     *
     * @param string $string
     * @return string
     */
    public function escape($string)
    {
        return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
    }
}
