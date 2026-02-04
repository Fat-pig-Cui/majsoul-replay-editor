from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
import json
import time


class ConsoleExecutor:
    def __init__(self, headless=True):
        self.options = Options()
        if headless:
            self.options.add_argument("--headless")
        self.options.add_argument("--disable-blink-features=AutomationControlled")

        # 防止检测
        self.options.add_experimental_option("excludeSwitches", ["enable-automation"])
        self.options.add_experimental_option('useAutomationExtension', False)

        self.driver = webdriver.Chrome(options=self.options)

    def wait_for_object(self, object_name, timeout=10):
        """等待特定对象/函数加载完成"""
        try:
            WebDriverWait(self.driver, timeout).until(
                lambda d: d.execute_script(f"return typeof {object_name} !== 'undefined'")
            )
            print(f"✅ {object_name} 已加载")
            return True
        except TimeoutException:
            print(f"❌ {object_name} 加载超时")
            return False

    def check_dependencies(self, commands):
        """从命令中提取依赖对象并检查"""
        dependencies = set()

        # 简单的依赖提取（可根据需要扩展）
        import re
        for cmd in commands:
            # 匹配可能的外部依赖
            patterns = [
                r'(\w+)\.\w+\(',  # object.method(
                r'new\s+(\w+)',  # new Object
                r'(\w+)\.\w+\s*=',  # object.property =
                r'window\.(\w+)',  # window.object
            ]

            for pattern in patterns:
                matches = re.findall(pattern, cmd)
                dependencies.update(matches)

        # 过滤掉 JavaScript 内置对象
        js_builtins = {
            'console', 'document', 'window', 'navigator', 'location',
            'history', 'localStorage', 'sessionStorage', 'JSON',
            'Math', 'Date', 'Array', 'Object', 'String', 'Number',
            'Boolean', 'Function', 'RegExp', 'Error', 'Promise',
            'fetch', 'XMLHttpRequest', 'setTimeout', 'setInterval',
            'clearTimeout', 'clearInterval', 'alert', 'confirm',
            'prompt', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
            'encodeURI', 'decodeURI', 'encodeURIComponent', 'decodeURIComponent'
        }

        external_deps = dependencies - js_builtins
        print(f"检测到外部依赖: {external_deps}")

        return external_deps

    def execute_with_deps(self, url, commands, wait_time=3):
        """执行命令，确保依赖加载"""
        print(f"🌐 访问: {url}, 等待时间: {wait_time}s")
        self.driver.get(url)

        # 等待页面基本加载
        time.sleep(wait_time)

        # 检查依赖
        dependencies = self.check_dependencies(commands)

        # 等待关键依赖加载
        loaded_deps = []
        for dep in dependencies:
            if self.wait_for_object(dep, timeout=5):
                loaded_deps.append(dep)

        # 执行命令
        results = []
        for i, cmd in enumerate(commands):
            print(f"📝 执行命令 {i + 1}: {cmd[:50]}...")

            try:
                # 尝试执行
                result = self.driver.execute_script(f"""
                    try {{
                        return eval(`{cmd}`);
                    }} catch(e) {{
                        return {{
                            error: e.toString(),
                            stack: e.stack,
                            message: e.message
                        }};
                    }}
                """)

                # 处理结果
                if isinstance(result, dict) and 'error' in result:
                    results.append({
                        'command': cmd,
                        'success': False,
                        'error': result['error'],
                        'stack': result.get('stack'),
                        'message': result.get('message')
                    })
                    print(f"❌ 执行失败: {result['error']}")
                else:
                    results.append({
                        'command': cmd,
                        'success': True,
                        'result': result
                    })
                    print(f"✅ 执行成功")

            except Exception as e:
                results.append({
                    'command': cmd,
                    'success': False,
                    'error': str(e)
                })
                print(f"❌ 框架错误: {e}")

        return {
            'results': results,
            'dependencies_found': list(dependencies),
            'dependencies_loaded': loaded_deps
        }

    def close(self):
        self.driver.quit()


executor = ConsoleExecutor(headless=True)

jquery_commands = [
    "cfg.item_definition.character.map_",
    "cfg.item_definition.skin.map_",
    "cfg.item_definition.item.map_",
    "cfg.item_definition.title.map_",
]
url = "https://game.maj-soul.com/1/"

jquery_result = executor.execute_with_deps(
    url=url,
    commands=jquery_commands,
    wait_time=10
)

with open("DatabaseRAW.py", "w", encoding='utf-8') as f:
    f.write('CHARACTER = ' + json.dumps(jquery_result['results'][0]['result'], ensure_ascii=False, indent=4))
    f.write('\n\nSKIN = ' + json.dumps(jquery_result['results'][1]['result'], ensure_ascii=False, indent=4))
    f.write('\n\nITEM = ' + json.dumps(jquery_result['results'][2]['result'], ensure_ascii=False, indent=4))
    f.write('\n\nTITLE = ' + json.dumps(jquery_result['results'][3]['result'], ensure_ascii=False, indent=4))

executor.close()
