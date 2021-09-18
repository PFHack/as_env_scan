/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-17 13:33:00
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */
const WIN = require('ui/window');
class SCANNER {
    constructor(opt) {
        this.win = new WIN({
            title: `Application Scan - ${opt['url']}`,
            height: 444,
            width: 350,
        });
        this.createMainLayout();

        this.toolbar.attachEvent('onClick', (id)=>{
            switch(id){
                case 'start':
                    let core = new antSword['core'][opt['type']](opt);
                    // 请求数据
                    core.request({
                    _: this.template[opt['type']]()
                    }).then((ret) => {
                        console.log(ret)
                        this.editor.session.setValue(ret.text);
                        this.win.win.progressOff();
                        toastr.success('扫描成功', antSword['language']['toastr']['success']);
                    })
                    .catch((err)=>{
                        toastr.error('扫描失败', antSword['language']['toastr']['error']);
                        this.win.win.progressOff();
                    });
                    break;
                case 'reset':
                    this.editor.session.setValue('初始化扫描');
                    break;
                }
        });
        
    }

    createMainLayout() {
        let editor;
        editor = ace.edit(this.win.win.cell.lastChild);
        editor.$blockScrolling = Infinity;
        editor.setTheme('ace/theme/tomorrow');
        editor.session.setMode('ace/mode/text');
        editor.session.setUseWrapMode(true);
        editor.session.setWrapLimitRange(null, null);
        editor.setOptions({
          fontSize: '14px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true
        });
        editor.setReadOnly(true);
        this.editor = editor;
        this.editor.session.setValue('初始化扫描');
        let toolbar = this.win.win.attachToolbar();
        toolbar.loadStruct([
            { id: 'start', type: 'button', text: '开始', icon: 'play',}, // 开始按钮
            { id: 'reset', type: 'button', text: '重置', icon: 'undo',}, // 重置按钮
        ]);
        this.toolbar = toolbar;
    }
    
     /**
   * 扫描代码函数
   * @return {[type]}      [description]
   */
  get template() {
    return {
        'php': () => `
        function check()
          {
            $ret = exec("php --version");
            if($ret) {
                echo "[+] PHP Install \n";
            }

            $curl = exec("curl -V");
            if($curl) {
                echo "[+] Curl Install \n";
            }else {
                echo "[-] Curl is not installed \n";
            }

            $git = exec("git --version");
            if($git) {
                echo "[+] Git Install \n";
            }else {
                echo "[-] Git is not installed \n";
            }
            $redis = exec("redis-cli --version");
            if($redis) {
                echo "[+] Redis Install \n";
            }else {
                echo "[-] Redis is not installed \n";
            }

            $go = exec("go version");
            if($go) {
                echo "[+] $go \n";
            }else {
                echo "[-] Go is not installed \n";
            }
            $mysql = exec("mysql --version");
            if($mysql) {
                echo "[+] $mysql \n";
            }else {
                echo "[-] MySql is not installed \n";
            }
            $python = exec("python --version");
            if($python) {
                echo "[+] $python \n";
            }   else {
                echo "[-] Python is not installed \n";
            }
            $python2 = exec("python2 --version");
            if($python2) {
                echo "[+] $python2 \n";
            }   else {
                echo "[-] Python2 is not installed \n";
            }
            $python3 = exec("python3 --version");
            if($python3) {
                echo "[+] $python3 \n";
            }   else {
                echo "[-] Python3 is not installed \n";
            }        
          }
          check();
        `
    }  
  }
}

module.exports = SCANNER;