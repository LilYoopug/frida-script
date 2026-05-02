// Remote Script Loader for JsHook/Frida
// Loads and executes script from GitHub
// Author: LilYoopug
// Version: 2.0.0 - Enhanced Error Handling

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
                    Toast.makeText(activity, Java.use('java.lang.String').$new(message), Toast.LENGTH_LONG.value).show();
                }
            } catch(e) {
                console.log(message); // Fallback to console
            }
        });
    }
    
    // Error handler with detailed logging
    function handleError(stage, error) {
        const errorMsg = '[ERROR] ' + stage + ': ' + error;
        console.log(errorMsg);
        console.log('[ERROR] Stack: ' + (error.stack || 'No stack trace'));
        showToast('❌ ' + stage + ' failed');
        showToast('Check logs for details');
    }
    
    showToast('🚀 Remote Script Loader v2.0');
    showToast('📡 Initializing...');
    
    // Function to fetch remote script
    function fetchRemoteScript(url, callback) {
        showToast('📥 Fetching from GitHub...');
        console.log('[*] Fetching script from: ' + url);
        
        Java.perform(function() {
            try {
                // Use Java HTTP classes for fetching
                const URL = Java.use('java.net.URL');
                const BufferedReader = Java.use('java.io.BufferedReader');
                const InputStreamReader = Java.use('java.io.InputStreamReader');
                const StringBuilder = Java.use('java.lang.StringBuilder');
                
                console.log('[*] Creating URL connection...');
                
                // Create URL object
                const urlObj = URL.$new(url);
                const connection = urlObj.openConnection();
                connection.setConnectTimeout(TIMEOUT_MS);
                connection.setReadTimeout(TIMEOUT_MS);
                
                console.log('[*] Connecting...');
                connection.connect();
                
                const responseCode = connection.getResponseCode();
                console.log('[*] Response code: ' + responseCode);
                
                if (responseCode !== 200) {
                    throw new Error('HTTP ' + responseCode + ' - Server returned error');
                }
                
                // Read response
                console.log('[*] Reading response...');
                const reader = BufferedReader.$new(
                    InputStreamReader.$new(connection.getInputStream())
                );
                
                const sb = StringBuilder.$new();
                let line = null;
                let lineCount = 0;
                
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                    sb.append('\n');
                    lineCount++;
                }
                
                reader.close();
                const code = sb.toString();
                
                console.log('[+] Script fetched successfully');
                console.log('[+] Lines: ' + lineCount);
                console.log('[+] Size: ' + code.length + ' bytes (' + (code.length / 1024).toFixed(1) + ' KB)');
                
                showToast('✅ Fetched: ' + (code.length / 1024).toFixed(1) + ' KB');
                showToast('📄 Lines: ' + lineCount);
                
                callback(null, code);
                
            } catch(e) {
                handleError('Fetch', e);
                callback(e, null);
            }
        });
    }
    
    // Function to execute fetched code
    function executeScript(code) {
        try {
            showToast('⚙️ Executing script...');
            console.log('[*] Executing remote script...');
            console.log('[*] Code preview (first 100 chars): ' + code.substring(0, 100));
            
            // Validate code
            if (!code || code.length === 0) {
                throw new Error('Script is empty');
            }
            
            if (!code.includes('Java.perform')) {
                throw new Error('Invalid Frida script format');
            }
            
            console.log('[*] Script validation passed');
            
            // Execute with error boundary
            try {
                eval(code);
                console.log('[+] Script executed successfully');
                showToast('✅ Script loaded!');
                showToast('🎮 Check for floating button');
            } catch(execError) {
                handleError('Execution', execError);
                showToast('Script syntax error');
            }
            
        } catch(e) {
            handleError('Validation', e);
        }
    }
    
    // Main execution with error handling
    try {
        console.log('[*] ========================================');
        console.log('[*] Remote Script Loader v2.0');
        console.log('[*] Time: ' + new Date().toISOString());
        console.log('[*] URL: ' + REMOTE_SCRIPT_URL);
        console.log('[*] ========================================');
        
        showToast('🔄 Starting loader...');
        
        fetchRemoteScript(REMOTE_SCRIPT_URL, function(error, code) {
            if (error) {
                console.log('[-] Failed to load remote script');
                console.log('[-] Error details: ' + error);
                showToast('❌ Load failed');
                showToast('Check internet connection');
                return;
            }
            
            if (!code || code.length === 0) {
                console.log('[-] Remote script is empty');
                showToast('❌ Script is empty');
                return;
            }
            
            executeScript(code);
        });
        
    } catch(mainError) {
        handleError('Main', mainError);
    }
    
})();
