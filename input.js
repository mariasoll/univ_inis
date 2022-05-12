const draggableElements = document.querySelectorAll('.target');
const workSpace = document.querySelector('#workspace');
let object;
let startCoordX;
let startCoordY;
let dragInProcess = false;
let obj;
let obj2;
let isDraged = false;

for(let i = 0; i < draggableElements.length; i++)
{
draggableElements[i].draggable = true;



workspace.addEventListener("dragover", (e) => {
e.preventDefault();
});
workspace.addEventListener("drop", () => {
drop = true;
});


workSpace.addEventListener('touchstart', (e) => {
if(e.targetTouches[1] != undefined){
workspace.ontouchmove=null;
obj2.style.top = startCoordY;
obj2.style.left = startCoordX;
startCoordX = 0;
startCoordY = 0;
dragInProcess = false;
isDraged = false;
}
if (dragInProcess){
obj.ontouchend = null;
obj.ontouchmove = null;
obj.style.left = startCoordX;
obj.style.top = startCoordY;
dragInProcess = false;
}
if (e.target != workspace){
obj = e.target;
startCoordX = obj.style.left;
startCoordY = obj.style.top;
obj.ontouchmove = (e) => {
dragInProcess = true;
obj.style.top = e.targetTouches[0].pageY - obj.offsetHeight / 2 + 'px';
obj.style.left = e.targetTouches[0].pageX - obj.offsetWidth / 2 + 'px';
}
obj.ontouchend = () => {
dragInProcess = false;
obj.ontouchmove = null;
}
}
})



draggableElements[i].addEventListener('dragend', (e)=>{
if (drop)
{
draggableElements[i].style.top = e.pageY - positionY + 'px';
draggableElements[i].style.left = e.pageX - positionX + 'px';
drop = false;
}
})
draggableElements[i].addEventListener('dragstart', (e)=>{
positionX = e.offsetX;
positionY = e.offsetY;
})


draggableElements[i].addEventListener('click', (e)=>{
e.stopPropagation();
workSpace.onmousemove = null;
for (let j = 0; j < draggableElements.length; ++j)
{
if (j == i)
draggableElements[j].style.background = 'blue';
else
draggableElements[j].style.background = 'red';
}
})

workSpace.addEventListener('click', (e) => {
if (isDraged)
{
workSpace.onmousemove = null;
isDraged = false;
}
})

draggableElements[i].addEventListener('dblclick', (e)=>{
positionX = e.offsetX;
positionY = e.offsetY;
workSpace.onmousemove = (e)=>
{
draggableElements[i].style.top = e.pageY - positionY + 'px';
draggableElements[i].style.left = e.pageX - positionX + 'px';
}

obj2 = e.target;
startCoordX = obj2.style.left;
startCoordY = obj2.style.top;
workspace.ontouchmove = (e) => {
isDraged = true;
obj2.style.top = e.targetTouches[0].pageY - obj2.offsetHeight / 2 + 'px';
obj2.style.left = e.targetTouches[0].pageX - obj2.offsetWidth / 2 + 'px';
}
})

document.addEventListener('keydown', function(e) {
let str = e.code;
if (str[0] != 'F')
{
str = str[str.length - 1];
let code = Number(str);
if (code >= 0 && code < 10)
{
draggableElements[0].style.width = (10 * code) + 'px';
}
}
});


}