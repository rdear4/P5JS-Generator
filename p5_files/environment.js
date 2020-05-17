class Environment {

    constructor(_width, _height, _bg) {

        this.canvas = {
            width: _width,
            height: _height,
            backgroundColor: _bg,
            center: createVector(_width/2, _height/2)
        };

        //DEBUG Optioons
        this.DEBUG = false;
        this.displayHelp = false;
        this.displayDebugCursor = false;
        this.debugDisplayProperties = {
            helpscreenMargin: 30,
            cursorLength: 30
        };
        this.showDebugMouseClicks = false;
        this.mouseClickDebugPoints = [];
        this.lastKeyPressed = {key: undefined, keyCode: undefined};

        this.shortcut_keys = [
            {
                key: "h",
                keyCode: 72,
                description: "Pressing the 'h' key will bring up the help screen",
                fn: () => this.displayHelp = !this.displayHelp
            },
            {
                key: '/',
                keyCode: 191,
                description: "Toggles the mouse targetting cursor on/off. While on it displays the cordinates of the mouse in the canvas.",
                fn: () => this.displayDebugCursor = !this.displayDebugCursor
            },
            {
                key: 'm',
                keyCode: 77,
                description: "Toggles the debug mouse click point show",
                fn: () => this.showDebugMouseClicks = !this.showDebugMouseClicks
            },
            {
                key: 'q',
                keyCode: 81,
                description: "Clears all the debug mouse click points",
                fn: () => this.mouseClickDebugPoints = []
            }

        ]

    }

    displayHelpScreen() {

        push();
        
        let screenWidth = this.canvas.width-this.debugDisplayPropertieshelpScreenMargin*2;
        let screenHeight = this.canvas.height - this.debugDisplayPropertieshelpScreenMargin*2;
        let titleSize = 16;
        let titleAreaHeight = 40;

        fill(0,0,0,200);
        noStroke();
        
        rect(this.debugDisplayPropertieshelpScreenMargin, this.debugDisplayPropertieshelpScreenMargin, screenWidth, screenHeight);

        //Draw the title of the Help screen
        textAlign(CENTER, CENTER);

        noStroke();
        fill('white');

        textSize(titleSize);
        text("Help Menu", this.canvas.width/2, this.debugDisplayPropertieshelpScreenMargin+titleAreaHeight/2);

        stroke('white');
        strokeWeight(2);

        
        line(this.debugDisplayPropertieshelpScreenMargin+5, this.debugDisplayPropertieshelpScreenMargin+titleAreaHeight, this.canvas.width-this.debugDisplayPropertieshelpScreenMargin-5, helpScreenMargin+titleAreaHeight);

        

        pop();

    }

    keyPressed(kc, k) {
        console.log(kc, k);
        //Update the last key pressed info
        this.lastKeyPressed.key = k;
        this.lastKeyPressed.keyCode = kc;
        
        //Check the shortcut_keys array to see if there are events to react to
        for (let sc of this.shortcut_keys) {
            
            if (kc === sc.keyCode || k === sc.key) {
                
                sc.fn();
                
            }
        }
    }

    mouseClicked(x, y) {

        if (this.showDebugMouseClicks) {

            //Add point to the debug mouse click points
            let newDebugPoint = {
                x: x,
                y: y,
                fill: `rgb(${Math.floor(Math.random() * 8)*32}, ${Math.floor(Math.random() * 8)*32}, ${Math.floor(Math.random() * 8)*32})`
            }
    
            this.mouseClickDebugPoints.push(newDebugPoint);
    
        }

    }

    addKeyboardShortcut(shortcut_obj) {

        /*

            The command object will be added to the shortcut_keys array
            Keyboard command objects are structured as follows:

                {

                    key: 'c',
                    keyCode: 67,
                    description: "Pressing this command will toggle the graphic overlay of the ship on or off",
                    fn: () => { ship.toggleGraphicOverlay() }

                }

        */

        this.shortcut_keys.push(shortcut_obj);

    }

    addDebugInfo(key, description, fn) {

        //let newShortcut

    }

    checkEnv() {

        //Check to see if help screen needs displayed
        if (this.displayHelp) {
            this.displayHelpScreen();
        }

        if (this.displayDebugCursor) {
            
            push();

            stroke('lime');
            strokeWeight(2);
            line(mouseX-this.debugDisplayProperties.cursorLength/2, mouseY, mouseX+this.debugDisplayProperties.cursorLength/2, mouseY);
            line(mouseX, mouseY-this.debugDisplayProperties.cursorLength/2, mouseX, mouseY+this.debugDisplayProperties.cursorLength/2);

            textAlign(LEFT, BOTTOM);
            stroke('black');
            strokeWeight(1);
            fill('white');
            
            text(`(${mouseX}, ${mouseY})`, mouseX+10, mouseY-10);
            pop();
        }

        if (this.showDebugMouseClicks) {

            for (let dp of this.mouseClickDebugPoints) {
                
                push();
                fill(dp.fill);
                noStroke();
                circle(dp.x, dp.y, 20)
                textAlign(LEFT, BOTTOM);
                stroke('black');
                strokeWeight(1);
                fill('white');
                text(`(${dp.x}, ${dp.y})`, dp.x+10, dp.y-10);
                pop();
            }

        }

    }
}