// Remote Script Loader for JsHook/Frida
// Loads and executes script from GitHub
// Author: LilYoopug
// Version: 1.0.0

(function() {
    console.log('[*] Remote Script Loader v1.0.0');
    console.log('[*] Initializing...');
    
    // Configuration
    const REMOTE_SCRIPT_URL = 'https://raw.githubusercontent.com/LilYoopug/frida-script/main/script.js';
    const TIMEOUT_MS = 10000; // 10 seconds timeout
    
    // Function to fetch remote script
    function fetchRemoteScript(url, callback) {
        console.log('[*] Fetching script from: ' + url);
        
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
                
                console.log('[+] Script fetched successfully');
                console.log('[+] Script size: ' + code.length + ' bytes');
                
                callback(null, code);
                
            } catch(e) {
                console.log('[-] Error fetching script: ' + e);
                console.log('[-] Stack: ' + e.stack);
                callback(e, null);
            }
        });
    }
    
    // Function to execute fetched code
    function executeScript(code) {
        try {
            console.log('[*] Executing remote script...');
            eval(code);
            console.log('[+] Remote script executed successfully!');
        } catch(e) {
            console.log('[-] Error executing script: ' + e);
            console.log('[-] Stack: ' + e.stack);
        }
    }
    
    // Main execution
    console.log('[*] Starting remote script loader...');
    
    fetchRemoteScript(REMOTE_SCRIPT_URL, function(error, code) {
        if (error) {
            console.log('[-] Failed to load remote script');
            console.log('[-] Please check your internet connection');
            return;
        }
        
        if (!code || code.length === 0) {
            console.log('[-] Remote script is empty');
            return;
        }
        
        executeScript(code);
    });
    
})();
