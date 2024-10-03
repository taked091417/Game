const images = document.querySelectorAll('.bp_image');

let press = false;
let rect;
let scale = 1;
let pos = zoompos = mousepos = mousemove = mousedrag = {
    x: 0,
    y: 0,
};

for(var i = 0; i < images.length; i++){
    images[i].style.transformOrigin = "0 0";

    images[i].addEventListener('mousedown', MouseDown);
    images[i].addEventListener('wheel', MouseWheel);
    images[i].addEventListener('mousemove', MouseMove);
    images[i].addEventListener('mouseout', MouseOut);
}

function MouseDown(){
    if (press == false && scale > 1){
        zoompos = {
            x: pos.x,
            y: pos.y,
        };
        press = true;
    }else{
        press = false;
    }
}

function MouseWheel(event){
    event.preventDefault();// デフォルトの動作をキャンセル

    mousepos = {
        x:event.clientX,
        y:event.clientY,
    }

    if (event.deltaY > 0){
        scale *= 0.9;
        pos.x = pos.x * 0.9 + mousepos.x * 0.1;
        pos.y = pos.y * 0.9 + mousepos.y * 0.1;
    }else if (event.deltaY < 0){
        scale *= 1.1;
        pos.x = pos.x * 1.1 - mousepos.x * 0.1;
        pos.y = pos.y * 1.1 - mousepos.y * 0.1;
    }

    if (scale < 1){
        scale = 1;
        pos.x = pos.y = 0;
    }
    images[event.target.id].style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale})`
}

function MouseMove(event){
    rect = event.target.getBoundingClientRect();

    if (press && scale > 1){
        mousedrag = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        pos.x = zoompos.x + (mousemove.x - mousedrag.x) / scale;
        pos.y = zoompos.y + (mousemove.y - mousedrag.y) / scale;

        console.log(pos);
        images[event.target.id].style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale})`
    }else{
        mousemove = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
}

function MouseOut(event){
    press = false;
    scale = 1;
    pos.x = pos.y = 0;
    images[event.target.id].style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale})`
}