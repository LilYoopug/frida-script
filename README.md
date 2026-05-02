## JsHook Script Repository

- Scripts in this repository are for learning and reference only. Do not use for illegal purposes.

### Self-hosted Repository

It is recommended to use a GitHub repository.

#### Repository Address

- **GitHub:**

https://raw.githubusercontent.com/LilYoopug/frida-script/main/Store-new.json

[Add Repository](jshook://store?url=https://raw.githubusercontent.com/LilYoopug/frida-script/main/Store-new.json)

- **CDN Address:**

https://gh-proxy.com/https://raw.githubusercontent.com/LilYoopug/frida-script/main/Store-new-cdn.json

[Add Repository](jshook://store?url=https://gh-proxy.com/https://raw.githubusercontent.com/LilYoopug/frida-script/main/Store-new-cdn.json)

## Script Notes

### Emulator Translation Mechanism

- **Translation Behavior**: Most emulators (such as LDPlayer, NoxPlayer, etc.) will automatically translate from ARM/ARM64 architecture modules in the APK when the APK does not support x86/x64 architecture.
- **Loading Method**: The translated module will not be loaded into process memory in the normal way, but through the emulator's special mechanism.
- **Hook Failure**: Due to the change in loading method, hooks for native layer functions may fail, which is normal.

### Solutions

1. **Check APK Architecture**: Ensure the APK contains x86/x64 architecture modules to avoid emulator translation.
2. **Adjust Hook Logic**: If you must use translated modules, try using hook methods based on function names or symbols.
3. **Ultimate Solution**: Directly switch to ARM/ARM64 architecture PC devices (such as most Apple devices, Microsoft Surface, etc.).
