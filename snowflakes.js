function LetItSnow(sum,toggleBtn) {
    var self = this;
    this.factor = {
        x: 0,
        y: 1
    };
    this.sum = sum;
    window.addEventListener("deviceorientation",function(e) {
        self.factor.x = Math.sin(e.gamma / 180 * Math.PI);
        self.factor.y = Math.cos(e.gamma / 180 * Math.PI);
    })
    this.snowflakes = [];
    this.isOn = false;
    this.start = function() {
        self.isOn = true;
        if("btn" in self) {
            self.btn.style.textDecoration = "red line-through";
        }
        self.adder = setInterval(function() {
            if(self.snowflakes.length < self.sum) {
                var size = Math.random() < 0.5;
                var snowflake = document.createElement("div");
                snowflake.ariaHidden = "true";
                snowflake.style.position = "fixed";
                snowflake.style.width = "15px";
                snowflake.style.height = "15px";
                snowflake.style.fontSize = size ? "2.4rem" : "1.8rem";
                snowflake.style.color = "white";
                snowflake.style.opacity = size ? "0.9" : "0.5";
                snowflake.style.transition = "none";
                snowflake.style.pointerEvents = "none";
                snowflake.style.zIndex = size ? "100" : "99";
                snowflake.setAttribute("data-size",size ? "big" : "small");
                snowflake.innerText = (Math.random() < 0.5) ? "❅" : "❆";
                document.body.append(snowflake);
                self.snowflakes.push({
                    element: snowflake,
                    x: Math.floor(Math.random() * (window.innerWidth + 2000) - 1000),
                    y: -20
                });
            }
        },Math.round((outerHeight * 10) / self.sum));
        self.looper = setInterval(function() {
            self.isOn = true;
            if("btn" in self) {
                self.btn.style.textDecoration = "red line-through";
            }
            for(var i = 0; i < self.snowflakes.length; i++) {
                if(
                    self.snowflakes[i].x < -innerWidth - 20 ||
                    self.snowflakes[i].x > innerWidth + 20 ||
                    self.snowflakes[i].y > outerHeight + 20
                ) {
                    self.snowflakes[i].x = Math.floor(Math.random() * (window.innerWidth - 10)),
                        self.snowflakes[i].y = -Math.floor(Math.random() * 100) - 20;
                } else {
                    var speed = self.snowflakes[i].element.getAttribute("data-size") === "big" ? 2 : 1;
                    self.snowflakes[i].x += speed * self.factor.x;
                    self.snowflakes[i].y += speed * self.factor.y;
                    self.snowflakes[i].element.style.left = self.snowflakes[i].x + "px";
                    self.snowflakes[i].element.style.top = self.snowflakes[i].y + "px";
                }
            }
        },2);
    };
    this.stop = function() {
        self.isOn = false;
        if("btn" in self) {
            self.btn.style.textDecoration = "none";
        }
        clearInterval(self.adder);
        clearInterval(self.looper);
        for(var i = 0; i < self.snowflakes.length; i++) {
            self.snowflakes[i].element.remove();
        }
        self.snowflakes = [];
    };
    if(toggleBtn) {
        this.btn = document.createElement("button");
        this.btn.innerText = "❆";
        this.btn.style = "position:fixed;right:0.2rem;bottom:0.2rem;background-color:rgb(7, 88, 153);" +
            "box-shadow:rgba(17, 17, 26, 0.9) 0px 8px 24px, rgba(17, 17, 26, 0.9) 0px 16px 56px, rgba(17, 17, 26, 0.9) 0px 24px 80px;" +
            "border-radius:100%;font-size:3rem;height:3rem;width:3rem;line-height:3rem;text-align:center;z-index:200";
        this.btn.onclick = function() {
            if(self.isOn) {
                self.stop();
            } else {
                self.start();
            }
        }
        document.body.append(this.btn);
    }
}
