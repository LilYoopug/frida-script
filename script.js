Java.perform(function() {
    console.log('[*] Retro Terminal Mod Menu v2 - Draggable');
    
    function pixelDensityToPixels(context, dp) {
        const density = context.getResources().getDisplayMetrics().density.value;
        return parseInt(dp * density);
    }
    
    Java.scheduleOnMainThread(function() {
        try {
            const UnityPlayer = Java.use('com.unity3d.player.UnityPlayer');
            const activity = UnityPlayer.currentActivity.value;
            
            if (!activity) {
                console.log('[!] Activity not found');
                return;
            }
            
            // Terminal colors with Obsidian accent
            const TERMINAL_BG = '#0D0208';
            const TERMINAL_GREEN = '#7C3AED';       // Obsidian purple accent
            const TERMINAL_DIM = '#5B21B6';         // Dimmed purple
            const TERMINAL_HIGHLIGHT = '#A78BFA';   // Light purple
            const TERMINAL_RED = '#FF0000';
            
            // Load classes
            const classLoader = {
                Gravity: Java.use('android.view.Gravity'),
                TextView: Java.use('android.widget.TextView'),
                LinearLayout: Java.use('android.widget.LinearLayout'),
                ViewGroup_LayoutParams: Java.use('android.view.ViewGroup$LayoutParams'),
                LinearLayout_LayoutParams: Java.use('android.widget.LinearLayout$LayoutParams'),
                Color: Java.use('android.graphics.Color'),
                View_OnTouchListener: Java.use('android.view.View$OnTouchListener'),
                MotionEvent: Java.use('android.view.MotionEvent'),
                String: Java.use('java.lang.String'),
                ScrollView: Java.use('android.widget.ScrollView'),
                View_OnClickListener: Java.use('android.view.View$OnClickListener'),
                GradientDrawable: Java.use('android.graphics.drawable.GradientDrawable'),
                Typeface: Java.use('android.graphics.Typeface')
            };
            
            const MATCH_PARENT = classLoader.LinearLayout_LayoutParams.MATCH_PARENT.value;
            const WRAP_CONTENT = classLoader.LinearLayout_LayoutParams.WRAP_CONTENT.value;
            
            // Create content view (root container)
            const contentView = classLoader.LinearLayout.$new(activity);
            const layoutParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, MATCH_PARENT);
            contentView.setLayoutParams(layoutParams);
            contentView.setGravity(classLoader.Gravity.CENTER.value);
            contentView.setBackgroundColor(classLoader.Color.TRANSPARENT.value);
            
            // Create main layout (draggable container)
            const mainLayout = classLoader.LinearLayout.$new(activity);
            const mainLayoutParams = classLoader.LinearLayout_LayoutParams.$new(WRAP_CONTENT, WRAP_CONTENT);
            mainLayout.setLayoutParams(mainLayoutParams);
            mainLayout.setOrientation(1); // VERTICAL
            
            // Create menu start button (minimized state)
            const menuStart = classLoader.TextView.$new(activity);
            const startParams = classLoader.LinearLayout_LayoutParams.$new(WRAP_CONTENT, WRAP_CONTENT);
            menuStart.setLayoutParams(startParams);
            menuStart.setText(classLoader.String.$new('>_'));
            menuStart.setTextSize(pixelDensityToPixels(activity, 14));
            menuStart.setTextColor(classLoader.Color.parseColor(TERMINAL_GREEN));
            menuStart.setTypeface(classLoader.Typeface.MONOSPACE.value);
            menuStart.setGravity(classLoader.Gravity.CENTER.value);
            menuStart.setPadding(
                pixelDensityToPixels(activity, 15),
                pixelDensityToPixels(activity, 10),
                pixelDensityToPixels(activity, 15),
                pixelDensityToPixels(activity, 10)
            );
            
            const startBg = classLoader.GradientDrawable.$new();
            startBg.setShape(classLoader.GradientDrawable.RECTANGLE.value);
            startBg.setColor(classLoader.Color.parseColor(TERMINAL_BG));
            startBg.setStroke(pixelDensityToPixels(activity, 2), classLoader.Color.parseColor(TERMINAL_GREEN));
            startBg.setCornerRadius(pixelDensityToPixels(activity, 4));
            menuStart.setBackground(startBg);
            
            // Create menu layout (expanded state)
            const menuLayout = classLoader.LinearLayout.$new(activity);
            const SIZE_DP = pixelDensityToPixels(activity, 320);
            const menuLayoutParams = classLoader.LinearLayout_LayoutParams.$new(SIZE_DP, WRAP_CONTENT);
            menuLayout.setLayoutParams(menuLayoutParams);
            menuLayout.setOrientation(1); // VERTICAL
            
            const menuBg = classLoader.GradientDrawable.$new();
            menuBg.setShape(classLoader.GradientDrawable.RECTANGLE.value);
            menuBg.setColor(classLoader.Color.parseColor(TERMINAL_BG));
            menuBg.setStroke(pixelDensityToPixels(activity, 2), classLoader.Color.parseColor(TERMINAL_GREEN));
            menuBg.setCornerRadius(pixelDensityToPixels(activity, 4));
            menuLayout.setBackground(menuBg);
            menuLayout.setAlpha(0.95);
            
            // Create menu bar (header) - draggable
            const menuBarLayout = classLoader.LinearLayout.$new(activity);
            const barParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            menuBarLayout.setLayoutParams(barParams);
            menuBarLayout.setOrientation(0); // HORIZONTAL
            const padding = pixelDensityToPixels(activity, 12);
            menuBarLayout.setPadding(padding, padding, padding, padding);
            menuBarLayout.setGravity(classLoader.Gravity.CENTER_VERTICAL.value);
            
            const barBg = classLoader.GradientDrawable.$new();
            barBg.setShape(classLoader.GradientDrawable.RECTANGLE.value);
            barBg.setColor(classLoader.Color.parseColor(TERMINAL_GREEN));
            menuBarLayout.setBackground(barBg);
            
            // Menu bar title
            const menuBarTitle = classLoader.TextView.$new(activity);
            const titleParams = classLoader.LinearLayout_LayoutParams.$new(0, WRAP_CONTENT, 1.0);
            menuBarTitle.setLayoutParams(titleParams);
            menuBarTitle.setText(classLoader.String.$new('█ ROOT@TERMINAL:~$ _'));
            menuBarTitle.setTextColor(classLoader.Color.parseColor(TERMINAL_BG));
            menuBarTitle.setTextSize(11);
            menuBarTitle.setTypeface(classLoader.Typeface.MONOSPACE.value);
            
            menuBarLayout.addView(menuBarTitle);
            
            // Create scroll view
            const menuScrollView = classLoader.ScrollView.$new(activity);
            const scrollParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, pixelDensityToPixels(activity, 400));
            menuScrollView.setLayoutParams(scrollParams);
            const scrollPadding = pixelDensityToPixels(activity, 8);
            menuScrollView.setPadding(scrollPadding, scrollPadding, scrollPadding, scrollPadding);
            menuScrollView.setFillViewport(true);
            
            // Create scroll layout
            const menuScrollLayout = classLoader.LinearLayout.$new(activity);
            const scrollLayoutParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            menuScrollLayout.setLayoutParams(scrollLayoutParams);
            menuScrollLayout.setOrientation(1); // VERTICAL
            
            // Add boot text
            const bootText = classLoader.TextView.$new(activity);
            const bootParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            bootParams.setMargins(0, 0, 0, pixelDensityToPixels(activity, 8));
            bootText.setLayoutParams(bootParams);
            bootText.setText(classLoader.String.$new(
                '> SYSTEM INITIALIZED\n' +
                '> LOADING MOD KERNEL...\n' +
                '> [OK] FRIDA INJECTED\n' +
                '> [OK] HOOKS ACTIVE\n' +
                '> ========================\n'
            ));
            bootText.setTextSize(9);
            bootText.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
            bootText.setTypeface(classLoader.Typeface.MONOSPACE.value);
            menuScrollLayout.addView(bootText);
            
            // Function to add options
            function addOption(id, name, description) {
                const optionLayout = classLoader.LinearLayout.$new(activity);
                const optionParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                optionParams.setMargins(0, 0, 0, pixelDensityToPixels(activity, 6));
                optionLayout.setLayoutParams(optionParams);
                optionLayout.setOrientation(1); // VERTICAL
                const optPadding = pixelDensityToPixels(activity, 8);
                optionLayout.setPadding(optPadding, optPadding, optPadding, optPadding);
                
                const optionBg = classLoader.GradientDrawable.$new();
                optionBg.setShape(classLoader.GradientDrawable.RECTANGLE.value);
                optionBg.setColor(classLoader.Color.parseColor('#001100'));
                optionBg.setStroke(pixelDensityToPixels(activity, 1), classLoader.Color.parseColor(TERMINAL_DIM));
                optionLayout.setBackground(optionBg);
                
                // Option header
                const optionHeader = classLoader.LinearLayout.$new(activity);
                const headerParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                optionHeader.setLayoutParams(headerParams);
                optionHeader.setOrientation(0); // HORIZONTAL
                
                const optionName = classLoader.TextView.$new(activity);
                const nameParams = classLoader.LinearLayout_LayoutParams.$new(0, WRAP_CONTENT, 1.0);
                optionName.setLayoutParams(nameParams);
                optionName.setText(classLoader.String.$new('> ' + name));
                optionName.setTextSize(11);
                optionName.setTextColor(classLoader.Color.parseColor(TERMINAL_GREEN));
                optionName.setTypeface(classLoader.Typeface.MONOSPACE.value);
                
                const statusText = classLoader.TextView.$new(activity);
                const statusParams = classLoader.LinearLayout_LayoutParams.$new(WRAP_CONTENT, WRAP_CONTENT);
                statusText.setLayoutParams(statusParams);
                statusText.setText(classLoader.String.$new('[OFF]'));
                statusText.setTextSize(10);
                statusText.setTextColor(classLoader.Color.parseColor(TERMINAL_RED));
                statusText.setTypeface(classLoader.Typeface.MONOSPACE.value);
                
                optionHeader.addView(optionName);
                optionHeader.addView(statusText);
                
                // Option description
                const optionDesc = classLoader.TextView.$new(activity);
                const descParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                descParams.setMargins(0, pixelDensityToPixels(activity, 2), 0, 0);
                optionDesc.setLayoutParams(descParams);
                optionDesc.setText(classLoader.String.$new('  ' + description));
                optionDesc.setTextSize(8);
                optionDesc.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
                optionDesc.setTypeface(classLoader.Typeface.MONOSPACE.value);
                
                optionLayout.addView(optionHeader);
                optionLayout.addView(optionDesc);
                
                // Click listener
                let isEnabled = false;
                const ClickListener = Java.registerClass({
                    name: 'com.terminal.opt' + Math.random().toString(36).substr(2, 9),
                    implements: [classLoader.View_OnClickListener],
                    methods: {
                        onClick(view) {
                            isEnabled = !isEnabled;
                            if (isEnabled) {
                                statusText.setText(classLoader.String.$new('[ON]'));
                                statusText.setTextColor(classLoader.Color.parseColor(TERMINAL_HIGHLIGHT));
                                optionBg.setColor(classLoader.Color.parseColor('#002200'));
                                optionBg.setStroke(pixelDensityToPixels(activity, 1), classLoader.Color.parseColor(TERMINAL_HIGHLIGHT));
                                console.log('[+] EXEC: enable_' + id);
                            } else {
                                statusText.setText(classLoader.String.$new('[OFF]'));
                                statusText.setTextColor(classLoader.Color.parseColor(TERMINAL_RED));
                                optionBg.setColor(classLoader.Color.parseColor('#001100'));
                                optionBg.setStroke(pixelDensityToPixels(activity, 1), classLoader.Color.parseColor(TERMINAL_DIM));
                                console.log('[-] EXEC: disable_' + id);
                            }
                        }
                    }
                });
                optionLayout.setOnClickListener(ClickListener.$new());
                
                menuScrollLayout.addView(optionLayout);
            }
            
            // Add options
            addOption('speed', 'SPEED_HACK', 'Modify movement velocity');
            addOption('god', 'GOD_MODE', 'Invulnerability enabled');
            addOption('items', 'UNLIMITED_ITEMS', 'Infinite inventory');
            addOption('noclip', 'NO_CLIP', 'Phase through walls');
            addOption('fly', 'FLY_MODE', 'Gravity override');
            addOption('esp', 'ESP_HACK', 'Entity position display');
            
            // Footer (draggable area)
            const footer = classLoader.TextView.$new(activity);
            const footerParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            footerParams.setMargins(0, pixelDensityToPixels(activity, 8), 0, 0);
            footer.setLayoutParams(footerParams);
            footer.setText(classLoader.String.$new('> root@terminal:~$ █'));
            footer.setTextSize(9);
            footer.setTextColor(classLoader.Color.parseColor(TERMINAL_GREEN));
            footer.setTypeface(classLoader.Typeface.MONOSPACE.value);
            footer.setPadding(
                pixelDensityToPixels(activity, 8),
                pixelDensityToPixels(activity, 8),
                pixelDensityToPixels(activity, 8),
                pixelDensityToPixels(activity, 8)
            );
            menuScrollLayout.addView(footer);
            
            // Assemble menu
            menuScrollView.addView(menuScrollLayout);
            menuLayout.addView(menuBarLayout);
            menuLayout.addView(menuScrollView);
            
            // Add to main layout and content view
            contentView.addView(mainLayout);
            mainLayout.addView(menuStart);
            
            // Create drag and toggle functionality
            let initialX = 0;
            let initialY = 0;
            let isMove = false;
            let isMenuLayout = false;
            let initialTouchTime = 0;
            
            // Touch listener for minimized button (tap to expand + drag)
            const MenuStartOnTouchListener = Java.registerClass({
                name: 'com.terminal.start' + Math.random().toString(36).substr(2, 9),
                implements: [classLoader.View_OnTouchListener],
                methods: {
                    onTouch(view, event) {
                        switch (event.getAction()) {
                            case classLoader.MotionEvent.ACTION_DOWN.value:
                                initialX = mainLayout.getX() - event.getRawX();
                                initialY = mainLayout.getY() - event.getRawY();
                                isMove = false;
                                initialTouchTime = Date.now();
                                break;
                            case classLoader.MotionEvent.ACTION_UP.value:
                                if (!isMove) {
                                    mainLayout.removeView(menuStart);
                                    mainLayout.addView(menuLayout);
                                    isMenuLayout = true;
                                }
                                break;
                            case classLoader.MotionEvent.ACTION_MOVE.value:
                                mainLayout.setX(event.getRawX() + initialX);
                                mainLayout.setY(event.getRawY() + initialY);
                                let deltaTime = Date.now() - initialTouchTime;
                                if (deltaTime > 100) isMove = true;
                                break;
                            default:
                                return false;
                        }
                        return true;
                    }
                }
            });
            menuStart.setOnTouchListener(MenuStartOnTouchListener.$new());
            
            // Touch listener for menu bar (drag entire menu)
            const MenuBarOnTouchListener = Java.registerClass({
                name: 'com.terminal.bar' + Math.random().toString(36).substr(2, 9),
                implements: [classLoader.View_OnTouchListener],
                methods: {
                    onTouch(view, event) {
                        switch (event.getAction()) {
                            case classLoader.MotionEvent.ACTION_DOWN.value:
                                initialX = mainLayout.getX() - event.getRawX();
                                initialY = mainLayout.getY() - event.getRawY();
                                isMove = false;
                                initialTouchTime = Date.now();
                                menuScrollView.requestDisallowInterceptTouchEvent(true);
                                break;
                            case classLoader.MotionEvent.ACTION_UP.value:
                                menuScrollView.requestDisallowInterceptTouchEvent(false);
                                if (!isMove) {
                                    // Tap to minimize
                                    mainLayout.removeView(menuLayout);
                                    mainLayout.addView(menuStart);
                                    isMenuLayout = false;
                                }
                                break;
                            case classLoader.MotionEvent.ACTION_MOVE.value:
                                mainLayout.setX(event.getRawX() + initialX);
                                mainLayout.setY(event.getRawY() + initialY);
                                let deltaTime = Date.now() - initialTouchTime;
                                if (deltaTime > 100) isMove = true;
                                break;
                            default:
                                return false;
                        }
                        return true;
                    }
                }
            });
            menuBarLayout.setOnTouchListener(MenuBarOnTouchListener.$new());
            
            // Touch listener for footer (drag entire menu)
            const FooterOnTouchListener = Java.registerClass({
                name: 'com.terminal.footer' + Math.random().toString(36).substr(2, 9),
                implements: [classLoader.View_OnTouchListener],
                methods: {
                    onTouch(view, event) {
                        switch (event.getAction()) {
                            case classLoader.MotionEvent.ACTION_DOWN.value:
                                initialX = mainLayout.getX() - event.getRawX();
                                initialY = mainLayout.getY() - event.getRawY();
                                isMove = false;
                                initialTouchTime = Date.now();
                                menuScrollView.requestDisallowInterceptTouchEvent(true);
                                break;
                            case classLoader.MotionEvent.ACTION_UP.value:
                                menuScrollView.requestDisallowInterceptTouchEvent(false);
                                break;
                            case classLoader.MotionEvent.ACTION_MOVE.value:
                                mainLayout.setX(event.getRawX() + initialX);
                                mainLayout.setY(event.getRawY() + initialY);
                                let deltaTime = Date.now() - initialTouchTime;
                                if (deltaTime > 100) isMove = true;
                                break;
                            default:
                                return false;
                        }
                        return true;
                    }
                }
            });
            footer.setOnTouchListener(FooterOnTouchListener.$new());
            
            // Add to activity
            activity.addContentView(contentView, contentView.getLayoutParams());
            
            console.log('[+] Retro terminal menu injected!');
            console.log('[*] Tap to expand/collapse');
            console.log('[*] Drag to move around');
            
        } catch(e) {
            console.log('[!] Error: ' + e);
            console.log('[!] Stack: ' + e.stack);
        }
    });
});
