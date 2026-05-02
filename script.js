// Frida Script Example
// Hook and intercept function calls

Java.perform(function() {
    console.log("[*] Frida script loaded");
    
    // Example: Hook a Java method
    var targetClass = Java.use("com.example.app.MainActivity");
    
    targetClass.onCreate.implementation = function(savedInstanceState) {
        console.log("[+] onCreate hooked!");
        console.log("[+] savedInstanceState: " + savedInstanceState);
        
        // Call original method
        this.onCreate(savedInstanceState);
    };
    
    console.log("[*] Hooks installed successfully");
});
