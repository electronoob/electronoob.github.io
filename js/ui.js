function ui_class(x, y, w, h, title, hwnd) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.hwnd = hwnd;
    this.title = title;
    this.fake = {
        origin: {
            x: theme.img['left_active'].width,
            y: theme.img['top_left_active'].height
        },
        w: this.w,
        h: this.h,
        width: this.w + (theme.img['left_active'].width * 2),
        height: this.h + (theme.img['top_left_active'].height + theme.img['bottom_active'].height),
        x: this.x,
        y: this.y,
        mode: "active",
        active: {},
        inactive: {},
        title: this.title
    };
    this.dom_content = null;
    this.generate_html = function () {
        let w = document.createElement('div');
        w.id = "window_" + this.hwnd;
        w.style.boxShadow = "5px 10px 20px rgba(0,0,0,0.3)";
        let c = document.createElement('div');
        c.id = "content_" + this.hwnd;
        c.style.backgroundColor = "#c0c0c0";

        w.style.width = this.fake.width + "px";
        w.style.height = this.fake.height + "px";
        w.style.top = this.fake.y + "px";
        w.style.left = this.fake.x + "px";
        w.style.position = "absolute";
        w.style.zIndex = "100";
        w.style.backgroundImage = "url(" + this.fake.active.canvas.toDataURL() + ")";
        
        c.style.width = this.fake.w + "px";
        c.style.height = this.fake.h + "px";
        c.style.top = this.fake.origin.y + "px";
        c.style.left = this.fake.origin.x + "px";
        c.style.position = "relative";
        
        w.appendChild(c);
        document.body.appendChild(w);
        this.dragElement(w);

        this.dom_content = c;
    }
    this.generate_gfx = function() {
        var modes = ['active', 'inactive'];
        for (var mode of modes) {
            let i = 0,
                xoffset = 0,
                img = {},
                yoffset = 0;
            this.fake[mode].canvas = document.createElement('canvas');
            this.fake[mode].canvas.width = this.fake.width;
            this.fake[mode].canvas.height = this.fake.height;
            this.fake[mode].canvas.ctx = this.fake[mode].canvas.getContext("2d");


            img = theme.img['title_3_' + mode];
            xoffset = theme.img['top_left_' + mode].width;
            for (i = xoffset; i < this.fake.width - theme.img['top_left_' + mode].width - theme.img['top_right_' + mode].width; i += img.width) {
                this.fake[mode].canvas.ctx.drawImage(img.canvas, i, 0);
                //xoffset+=img.width;
            }

            img = theme.img['bottom_' + mode];
            yoffset = this.fake.height - img.height;
            xoffset = theme.img['top_left_' + mode].width;
            for (i = xoffset; i < this.fake.width - theme.img['top_left_' + mode].width - theme.img['top_right_' + mode].width; i += img.width) {
                this.fake[mode].canvas.ctx.drawImage(img.canvas, i, yoffset);
                //xoffset+=img.width;
            }


            img = theme.img['left_' + mode];
            yoffset = theme.img['top_left_' + mode].height;
            for (i = 0; i < this.fake.height - theme.img['top_left_' + mode].height - theme.img['bottom_left_' + mode].height; i += img.height) {
                this.fake[mode].canvas.ctx.drawImage(img.canvas, 0, yoffset);
                yoffset += img.height;
            }

            img = theme.img['right_' + mode];
            yoffset = theme.img['top_right_' + mode].height;
            for (i = 0; i < this.fake.height - theme.img['top_right_' + mode].height - theme.img['bottom_right_' + mode].height; i += img.height) {
                this.fake[mode].canvas.ctx.drawImage(img.canvas, this.fake.width - img.width, yoffset);
                yoffset += img.height;
            }

            /*
  xoffset = 0;
  img = theme.img['top_left_'+mode];
  this.fake[mode].canvas.ctx.drawImage(img.canvas, 0,0);
  xoffset+=img.width;
  for(i=1;i<=5;i++) {
    img = theme.img['title_'+i+'_'+mode];
  	this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);
		xoffset+=img.width;
  }
  */
            xoffset = 0;
            img = theme.img['top_left_' + mode];
            this.fake[mode].canvas.ctx.drawImage(img.canvas, 0, 0);
            xoffset += img.width;

            img = theme.img['title_1_' + mode];
            this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);
            xoffset += img.width;

            img = theme.img['title_2_' + mode];
            this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);
            xoffset += img.width;

            img = theme.img['top_right_' + mode];
            xoffset = this.fake.width - img.width;
            this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);

            img = theme.img['title_5_' + mode];
            xoffset -= img.width;
            this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);


            img = theme.img['title_4_' + mode];
            xoffset -= img.width;
            this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);

            /*
  img = theme.img['top_right_'+mode];
  xoffset = this.fake.width - img.width;
  this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset,0);
  xoffset-=img.width;
  for(i=5;i>=1;i--) {
    img = theme.img['title_'+i+'_'+mode];
  	this.fake[mode].canvas.ctx.drawImage(img.canvas, xoffset, 0);
		xoffset-=img.width;
  }
  */
            img = theme.img['bottom_left_' + mode];
            this.fake[mode].canvas.ctx.drawImage(img.canvas, 0, this.fake.height - img.height);
            img = theme.img['bottom_right_' + mode];
            this.fake[mode].canvas.ctx.drawImage(img.canvas, this.fake.width - img.width, this.fake.height - img.height);

            /*
              this.fake[mode].canvas.ctx.fillStyle = '#53a600';
              this.fake[mode].canvas.ctx.fillRect(this.fake.origin.x, this.fake.origin.y, w, h);
            */
            this.fake[mode].canvas.ctx.fillStyle = '#ffffff';
            this.fake[mode].canvas.ctx.font = "18px Arial";
            let text_width = this.fake[mode].canvas.ctx.measureText(this.fake.title).width;
            let text_height = this.fake[mode].canvas.ctx.measureText("M").width + 4;
            this.fake[mode].canvas.ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            this.fake[mode].canvas.ctx.lineWidth = 2;
            this.fake[mode].canvas.ctx.strokeText(this.fake.title, (this.fake.width / 2) - (text_width / 2) + 1, text_height + 1);
            this.fake[mode].canvas.ctx.fillText(this.fake.title, (this.fake.width / 2) - (text_width / 2), text_height);
        }
    }
    this.dragElement = function(decoration) {
        var oldx = 0,
            oldy = 0;
        decoration.onmousedown = function(e) {
            if (e.target.id == decoration.id) {
                oldx = e.clientX;
                oldy = e.clientY;
                document.onmouseup = function() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                };
                document.onmousemove = function(e) {
                    let x = oldx - e.clientX;
                    let y = oldy - e.clientY;
                    oldx = e.clientX;
                    oldy = e.clientY;
                    decoration.style.top = (decoration.offsetTop - y) + "px";
                    decoration.style.left = (decoration.offsetLeft - x) + "px";
                };
            }
        }
    };

}