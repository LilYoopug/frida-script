// Example Frida Hook Script
// Author: LilYoopug
// Version: 1.0.0

Java.perform(function() {
    console.log("[*] Frida script loaded successfully");
    console.log("[*] Starting hook operations...");
    
    try {
        // Example 1: Hook Activity onCreate
        var Activity = Java.use("android.app.Activity");
        Activity.onCreate.overload("android.os.Bundle").implementation = function(bundle) {
            console.log("[+] Activity.onCreate() called");
            console.log("[+] Activity: " + this.getClass().getName());
            this.onCreate(bundle);
        };
        console.log("[*] Hooked: Activity.onCreate()");
        
        // Example 2: Hook String comparison
        var String = Java.use("java.lang.String");
        String.equals.implementation = function(other) {
            var result = this.equals(other);
            if (this.length() > 0 && other != null) {
                console.log("[+] String.equals() called");
                console.log("[+] this: " + this.toString());
                console.log("[+] other: " + other.toString());
                console.log("[+] result: " + result);
            }
            return result;
        };
        console.log("[*] Hooked: String.equals()");
        
        // Example 3: Hook SharedPreferences
        var SharedPreferences = Java.use("android.content.SharedPreferences");
        var Editor = Java.use("android.content.SharedPreferences$Editor");
        
        Editor.putString.overload("java.lang.String", "java.lang.String").implementation = function(key, value) {
            console.log("[+] SharedPreferences.Editor.putString() called");
            console.log("[+] Key: " + key);
            console.log("[+] Value: " + value);
            return this.putString(key, value);
        };
        console.log("[*] Hooked: SharedPreferences.Editor.putString()");
        
        // Example 4: Hook network requests (OkHttp3)
        try {
            var OkHttpClient = Java.use("okhttp3.OkHttpClient");
            var Request = Java.use("okhttp3.Request");
            
            OkHttpClient.newCall.implementation = function(request) {
                console.log("[+] OkHttp3 Request detected");
                console.log("[+] URL: " + request.url().toString());
                console.log("[+] Method: " + request.method());
                return this.newCall(request);
            };
            console.log("[*] Hooked: OkHttp3.newCall()");
        } catch(e) {
            console.log("[-] OkHttp3 not found in this app");
        }
        
        console.log("[*] All hooks installed successfully!");
        
    } catch(e) {
        console.log("[-] Error: " + e.message);
        console.log("[-] Stack: " + e.stack);
    }
});
