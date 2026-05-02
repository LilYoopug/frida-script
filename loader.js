// Remote Script Loader for JsHook/Frida
// Loads and executes script from GitHub
// Author: LilYoopug
// Version: 1.0.0

(function() {
    // Configuration
    const REMOTE_SCRIPT_URL = 'https://raw.githubusercontent.com/LilYoopug/frida-script/main/script.js';
    const TIMEOUT_MS = 10000; // 10 seconds timeout
    
    // Toast helper function
    function showToast(message) {
        Java.scheduleOnMainThread(function() {
            try {
                const Toast = Java.use('android.widget.Toast');
                const UnityPlayer = Java.use('com.unity3d.player.UnityPlayer');
                const activity = UnityPlayer.currentActivity.value;
                
                if (activity) {
                    Toast.makeText(activity, Java.use('java.lang.String').$new(message), Toast.LENGTH_SHORT.value).show();
                }
            } catch(e) {
                console.log(message); // Fallback to console
            }
        });
    }
    
    showToast('[*] Remote Script Loader v1.0.0');
    showToast('[*] Initializing...');
    
    // Function to fetch remote script
    function fetchRemoteScript(url, callback) {
        showToast('[*] Fetching script from GitHub...');
        
        Java.perform(function() {
            try {
                // Use Java HTTP classes for fetching
                const URL = Java.use('java.net.URL');
                const BufferedReader = Java.use('java.io.BufferedReader');
                const InputStreamReader = Java.use('java.io.InputStreamReader');
                const StringBuilder = Java.use('java.lang.StringBuilder');
                
                // Create URL object
                const urlObj = URL.$new(url);
                const connection = urlObj.openConnection();
                connection.setConnectTimeout(TIMEOUT_MS);
                connection.setReadTimeout(TIMEOUT_MS);
                connection.connect();
                
                // Read response
                const reader = BufferedReader.$new(
                    InputStreamReader.$new(connection.getInputStream())
                );
                
                const sb = StringBuilder.$new();
                let line = null;
                
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                    sb.append('\n');
                }
                
                reader.close();
                const code = sb.toString();
                
                showToast('[+] Script fetched: ' + (code.length / 1024).toFixed(1) + ' KB');
                
                callback(null, code);
                
            } catch(e) {
                showToast('[-] Error fetching script: ' + e);
                callback(e, null);
            }
        });
    }
    
    // Function to execute fetched code
    function executeScript(code) {
        try {
            showToast('[*] Executing remote script...');
            eval(code);
            showToast('[+] Script loaded successfully!');
        } catch(e) {
            showToast('[-] Error executing script: ' + e);
        }
    }
    
    // Main execution
    showToast('[*] Starting remote loader...');
    
    fetchRemoteScript(REMOTE_SCRIPT_URL, function(error, code) {
        if (error) {
            showToast('[-] Failed to load remote script');
            showToast('[-] Check internet connection');
            return;
        }
        
        if (!code || code.length === 0) {
            showToast('[-] Remote script is empty');
            return;
        }
        
        executeScript(code);
    });
    
})();
