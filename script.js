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
            
            // Terminal colors with white accent
            const TERMINAL_BG = '#0D0208';
            const TERMINAL_GREEN = '#FFFFFF';       // White accent
            const TERMINAL_DIM = '#808080';         // Gray
            const TERMINAL_HIGHLIGHT = '#FFFFFF';   // White highlight
            const TERMINAL_RED = '#FF0000';
            
            // Load classes
            const classLoader = {
                Gravity: Java.use('android.view.Gravity'),
                TextView: Java.use('android.widget.TextView'),
                LinearLayout: Java.use('android.widget.LinearLayout'),
                ViewGroup_LayoutParams: Java.use('android.view.ViewGroup$LayoutParams'),
                LinearLayout_LayoutParams: Java.use('android.widget.LinearLayout$LayoutParams'),
                Color: Java.use('android.graphics.Color'),
                View: Java.use('android.view.View'),
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
            menuStart.setTextSize(pixelDensityToPixels(activity, 12));
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
            
            // Create menu bar (header)
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
            
            // Create tab bar
            const tabBar = classLoader.LinearLayout.$new(activity);
            const tabBarParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            tabBar.setLayoutParams(tabBarParams);
            tabBar.setOrientation(0); // HORIZONTAL
            const tabPadding = pixelDensityToPixels(activity, 4);
            tabBar.setPadding(tabPadding, tabPadding, tabPadding, tabPadding);
            
            // Tab state
            let currentTab = 0;
            const tabButtons = [];
            const tabBackgrounds = [];
            const tabContents = [];
            
            // Function to create tab button
            function createTab(index, name) {
                const tab = classLoader.TextView.$new(activity);
                const tabParams = classLoader.LinearLayout_LayoutParams.$new(0, WRAP_CONTENT, 1.0);
                tabParams.setMargins(
                    pixelDensityToPixels(activity, 2),
                    0,
                    pixelDensityToPixels(activity, 2),
                    0
                );
                tab.setLayoutParams(tabParams);
                tab.setText(classLoader.String.$new('> ' + name.toUpperCase()));
                tab.setTextSize(10);
                tab.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
                tab.setTypeface(classLoader.Typeface.MONOSPACE.value);
                tab.setGravity(classLoader.Gravity.CENTER.value);
                tab.setPadding(
                    pixelDensityToPixels(activity, 6),
                    pixelDensityToPixels(activity, 6),
                    pixelDensityToPixels(activity, 6),
                    pixelDensityToPixels(activity, 6)
                );
                
                const tabBg = classLoader.GradientDrawable.$new();
                tabBg.setShape(classLoader.GradientDrawable.RECTANGLE.value);
                tabBg.setColor(classLoader.Color.parseColor('#001100'));
                tabBg.setStroke(pixelDensityToPixels(activity, 1), classLoader.Color.parseColor(TERMINAL_DIM));
                tab.setBackground(tabBg);
                tab.setClickable(true);
                tab.setFocusable(true);
                
                // Create content container for this tab
                const tabContent = classLoader.LinearLayout.$new(activity);
                const contentParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                tabContent.setLayoutParams(contentParams);
                tabContent.setOrientation(1); // VERTICAL
                tabContent.setVisibility(index === 0 ? classLoader.View.VISIBLE.value : classLoader.View.GONE.value);
                
                tabButtons.push(tab);
                tabBackgrounds.push(tabBg);
                tabContents.push(tabContent);
                tabBar.addView(tab);
                
                return { tab: tab, index: index, name: name };
            }
            
            // Create 4 tabs
            const tabData = [];
            tabData.push(createTab(0, 'Main'));
            tabData.push(createTab(1, 'Player'));
            tabData.push(createTab(2, 'World'));
            tabData.push(createTab(3, 'Misc'));
            
            // Now set up click listeners after all tabs are created
            for (let t = 0; t < tabData.length; t++) {
                const data = tabData[t];
                const TabClickListener = Java.registerClass({
                    name: 'com.terminal.tab' + Math.random().toString(36).substr(2, 9),
                    implements: [classLoader.View_OnClickListener],
                    methods: {
                        onClick(view) {
                            console.log('[*] Tab clicked: ' + data.name + ' (index: ' + data.index + ')');
                            currentTab = data.index;
                            // Update all tabs
                            for (let i = 0; i < tabButtons.length; i++) {
                                try {
                                    const btn = tabButtons[i];
                                    const bg = tabBackgrounds[i];
                                    if (i === currentTab) {
                                        bg.setColor(classLoader.Color.parseColor(TERMINAL_GREEN));
                                        bg.setStroke(pixelDensityToPixels(activity, 2), classLoader.Color.parseColor(TERMINAL_GREEN));
                                        btn.setTextColor(classLoader.Color.parseColor('#000000'));
                                        tabContents[i].setVisibility(classLoader.View.VISIBLE.value);
                                    } else {
                                        bg.setColor(classLoader.Color.parseColor('#001100'));
                                        bg.setStroke(pixelDensityToPixels(activity, 1), classLoader.Color.parseColor(TERMINAL_DIM));
                                        btn.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
                                        tabContents[i].setVisibility(classLoader.View.GONE.value);
                                    }
                                } catch(e) {
                                    console.log('[!] Tab update error for index ' + i + ': ' + e);
                                }
                            }
                            console.log('[+] Switched to tab: ' + data.name);
                        }
                    }
                });
                data.tab.setOnClickListener(TabClickListener.$new());
            }
            
            // Set first tab as active (delayed to ensure UI is ready)
            Java.scheduleOnMainThread(function() {
                try {
                    const firstTabBg = tabButtons[0].getBackground();
                    firstTabBg.setColor(classLoader.Color.parseColor(TERMINAL_GREEN));
                    firstTabBg.setStroke(pixelDensityToPixels(activity, 2), classLoader.Color.parseColor(TERMINAL_GREEN));
                    tabButtons[0].setTextColor(classLoader.Color.parseColor('#000000'));
                } catch(e) {
                    console.log('[!] Could not set initial tab: ' + e);
                }
            });
            
            menuScrollLayout.addView(tabBar);
            
            // Add separator
            const separator = classLoader.TextView.$new(activity);
            const sepParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            sepParams.setMargins(0, pixelDensityToPixels(activity, 4), 0, pixelDensityToPixels(activity, 4));
            separator.setLayoutParams(sepParams);
            separator.setText(classLoader.String.$new('> ========================'));
            separator.setTextSize(9);
            separator.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
            separator.setTypeface(classLoader.Typeface.MONOSPACE.value);
            menuScrollLayout.addView(separator);
            
            // Add all tab content containers
            for (let i = 0; i < tabContents.length; i++) {
                menuScrollLayout.addView(tabContents[i]);
            }
            
            // Function to add options to specific tab
            function addOption(tabIndex, id, name, description) {
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
                optionName.setTextColor(classLoader.Color.parseColor('#FFFFFF'));
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
                
                tabContents[tabIndex].addView(optionLayout);
            }
            
            // Function to add slider option
            function addSlider(tabIndex, id, name, min, max, defaultValue) {
                const SeekBar = Java.use('android.widget.SeekBar');
                const SeekBar_OnSeekBarChangeListener = Java.use('android.widget.SeekBar$OnSeekBarChangeListener');
                
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
                
                // Header
                const header = classLoader.LinearLayout.$new(activity);
                const headerParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                header.setLayoutParams(headerParams);
                header.setOrientation(0); // HORIZONTAL
                
                const label = classLoader.TextView.$new(activity);
                const labelParams = classLoader.LinearLayout_LayoutParams.$new(0, WRAP_CONTENT, 1.0);
                label.setLayoutParams(labelParams);
                label.setText(classLoader.String.$new('> ' + name));
                label.setTextSize(11);
                label.setTextColor(classLoader.Color.parseColor('#FFFFFF'));
                label.setTypeface(classLoader.Typeface.MONOSPACE.value);
                
                const valueText = classLoader.TextView.$new(activity);
                const valueParams = classLoader.LinearLayout_LayoutParams.$new(WRAP_CONTENT, WRAP_CONTENT);
                valueText.setLayoutParams(valueParams);
                valueText.setText(classLoader.String.$new('[' + defaultValue + ']'));
                valueText.setTextSize(10);
                valueText.setTextColor(classLoader.Color.parseColor(TERMINAL_GREEN));
                valueText.setTypeface(classLoader.Typeface.MONOSPACE.value);
                
                header.addView(label);
                header.addView(valueText);
                optionLayout.addView(header);
                
                // Slider
                const slider = SeekBar.$new(activity);
                const sliderParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                sliderParams.setMargins(0, pixelDensityToPixels(activity, 4), 0, 0);
                slider.setLayoutParams(sliderParams);
                slider.setMax(max - min);
                slider.setProgress(defaultValue - min);
                
                const SeekBarListener = Java.registerClass({
                    name: 'com.terminal.slider' + Math.random().toString(36).substr(2, 9),
                    implements: [SeekBar_OnSeekBarChangeListener],
                    methods: {
                        onProgressChanged(seekBar, progress, fromUser) {
                            const value = progress + min;
                            valueText.setText(classLoader.String.$new('[' + value + ']'));
                            console.log('[*] ' + id + ' = ' + value);
                        },
                        onStartTrackingTouch(seekBar) {},
                        onStopTrackingTouch(seekBar) {}
                    }
                });
                slider.setOnSeekBarChangeListener(SeekBarListener.$new());
                
                optionLayout.addView(slider);
                tabContents[tabIndex].addView(optionLayout);
            }
            
            // Function to add radio buttons
            function addRadio(tabIndex, id, name, options) {
                const RadioGroup = Java.use('android.widget.RadioGroup');
                const RadioButton = Java.use('android.widget.RadioButton');
                
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
                
                // Label
                const label = classLoader.TextView.$new(activity);
                const labelParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                label.setLayoutParams(labelParams);
                label.setText(classLoader.String.$new('> ' + name));
                label.setTextSize(11);
                label.setTextColor(classLoader.Color.parseColor('#FFFFFF'));
                label.setTypeface(classLoader.Typeface.MONOSPACE.value);
                optionLayout.addView(label);
                
                // Radio group
                const radioGroup = RadioGroup.$new(activity);
                const radioParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                radioParams.setMargins(pixelDensityToPixels(activity, 4), pixelDensityToPixels(activity, 4), 0, 0);
                radioGroup.setLayoutParams(radioParams);
                radioGroup.setOrientation(1); // VERTICAL
                
                for (let i = 0; i < options.length; i++) {
                    const radio = RadioButton.$new(activity);
                    radio.setText(classLoader.String.$new('  ' + options[i]));
                    radio.setTextSize(10);
                    radio.setTextColor(classLoader.Color.parseColor(TERMINAL_DIM));
                    radio.setTypeface(classLoader.Typeface.MONOSPACE.value);
                    if (i === 0) radio.setChecked(true);
                    radioGroup.addView(radio);
                }
                
                optionLayout.addView(radioGroup);
                tabContents[tabIndex].addView(optionLayout);
            }
            
            // Function to add select/spinner
            function addSelect(tabIndex, id, name, options) {
                const Spinner = Java.use('android.widget.Spinner');
                const ArrayAdapter = Java.use('android.widget.ArrayAdapter');
                
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
                
                // Label
                const label = classLoader.TextView.$new(activity);
                const labelParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                label.setLayoutParams(labelParams);
                label.setText(classLoader.String.$new('> ' + name));
                label.setTextSize(11);
                label.setTextColor(classLoader.Color.parseColor('#FFFFFF'));
                label.setTypeface(classLoader.Typeface.MONOSPACE.value);
                optionLayout.addView(label);
                
                // Spinner
                const spinner = Spinner.$new(activity);
                const spinnerParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
                spinnerParams.setMargins(0, pixelDensityToPixels(activity, 4), 0, 0);
                spinner.setLayoutParams(spinnerParams);
                
                const adapter = ArrayAdapter.createFromResource(
                    activity,
                    Java.use('android.R$layout').simple_spinner_item.value,
                    options
                );
                adapter.setDropDownViewResource(Java.use('android.R$layout').simple_spinner_dropdown_item.value);
                spinner.setAdapter(adapter);
                
                optionLayout.addView(spinner);
                tabContents[tabIndex].addView(optionLayout);
            }
            
            // Add options to tabs
            // Main tab (0)
            addOption(0, 'speed', 'SPEED_HACK', 'Modify movement velocity');
            addSlider(0, 'speed_multiplier', 'SPEED_MULTIPLIER', 1, 10, 5);
            addOption(0, 'god', 'GOD_MODE', 'Invulnerability enabled');
            
            // Player tab (1)
            addOption(1, 'items', 'UNLIMITED_ITEMS', 'Infinite inventory');
            addSlider(1, 'health', 'HEALTH', 0, 100, 100);
            addRadio(1, 'character', 'CHARACTER_SELECT', ['Warrior', 'Mage', 'Archer', 'Rogue']);
            addOption(1, 'fly', 'FLY_MODE', 'Gravity override');
            
            // World tab (2)
            addOption(2, 'noclip', 'NO_CLIP', 'Phase through walls');
            addSelect(2, 'time', 'TIME_OF_DAY', ['Morning', 'Noon', 'Evening', 'Night']);
            addOption(2, 'esp', 'ESP_HACK', 'Entity position display');
            
            // Misc tab (3)
            addSlider(3, 'fov', 'FIELD_OF_VIEW', 60, 120, 90);
            addRadio(3, 'quality', 'GRAPHICS_QUALITY', ['Low', 'Medium', 'High', 'Ultra']);
            
            // Footer
            const footer = classLoader.TextView.$new(activity);
            const footerParams = classLoader.LinearLayout_LayoutParams.$new(MATCH_PARENT, WRAP_CONTENT);
            footerParams.setMargins(0, pixelDensityToPixels(activity, 8), 0, 0);
            footer.setLayoutParams(footerParams);
            footer.setText(classLoader.String.$new('> root@terminal:~$ █'));
            footer.setTextSize(9);
            footer.setTextColor(classLoader.Color.parseColor(TERMINAL_GREEN));
            footer.setTypeface(classLoader.Typeface.MONOSPACE.value);
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
            
            const MainLayoutOnTouchListener = Java.registerClass({
                name: 'com.terminal.drag' + Math.random().toString(36).substr(2, 9),
                implements: [classLoader.View_OnTouchListener],
                methods: {
                    onTouch(view, event) {
                        switch (event.getAction()) {
                            case classLoader.MotionEvent.ACTION_DOWN.value:
                                initialX = view.getX() - event.getRawX();
                                initialY = view.getY() - event.getRawY();
                                isMove = false;
                                initialTouchTime = Date.now();
                                break;
                            case classLoader.MotionEvent.ACTION_UP.value:
                                if (!isMove) {
                                    if (!isMenuLayout) {
                                        mainLayout.removeView(menuStart);
                                        mainLayout.addView(menuLayout);
                                        isMenuLayout = true;
                                    } else {
                                        mainLayout.removeView(menuLayout);
                                        mainLayout.addView(menuStart);
                                        isMenuLayout = false;
                                    }
                                }
                                break;
                            case classLoader.MotionEvent.ACTION_MOVE.value:
                                view.setX(event.getRawX() + initialX);
                                view.setY(event.getRawY() + initialY);
                                let deltaTime = Date.now() - initialTouchTime;
                                if (deltaTime > 200) isMove = true;
                                break;
                            default:
                                return false;
                        }
                        return true;
                    }
                }
            });
            mainLayout.setOnTouchListener(MainLayoutOnTouchListener.$new());
            
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
