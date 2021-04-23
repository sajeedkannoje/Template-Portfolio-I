var universe = function(){
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var starDensity = .216;
var speedCoeff = .05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '180,184,240';
var starColor = '226,225,142';
var cometColor = '226,225,224';
var canva = document.getElementById('universe');
var stars = [];

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext('2d');

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {

  this.reset = function() {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
    this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
  };

  this.fadeIn = function() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function() {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
        universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
        universe.fill();
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - (width / 4) || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function() {
    setTimeout(function() {
      first = false;
    }, 50)
  })()
}

function getProbability(percents) {
  return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

function getRandInterval(min, max) {
  return (Math.random() * (max - min) + min);
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = (width > height ? height / 2 : width / 2);
  circleCenter = {
    x: width / 2,
    y: height / 2
  }

  canva.setAttribute('width', width);
  canva.setAttribute('height', height);
}
}

var moving_bg = function(){
  /*
Short && Basic, Custom Shaped 3D Particle Object.
*/
var c = document.getElementById('canv'),
$ = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

var arr = [],
midX = c.width / 2,
midY = c.height / 2,
rotX = 0,
rotY = 0,
u = 0,
vp = 350,
d, currX, currY,
x, y, z, g;

var pt = function(x, y, z) {
var zpos = z * Math.cos(rotX) - x * Math.sin(rotX),
  xpos = z * Math.sin(rotX) + x * Math.cos(rotX),
  ypos = y * Math.cos(rotY) - zpos * Math.sin(rotY),
  zpos = y * Math.sin(rotY) + zpos * Math.cos(rotY);
  d = 1 / (zpos / vp + 1);
  currX = xpos * d + midX;
  currY = ypos * d + midY;
}

for (var i = -Math.PI; i < Math.PI; i += Math.PI / 20) {
for (var j = -Math.PI; j < Math.PI; j += Math.PI / 20) {
var px = Math.sin(i) % Math.abs(Math.sqrt(2) + Math.cos(j)),
    py = Math.sin(i * 2 * Math.PI / 3) / 
    Math.abs(Math.sqrt(2) * Math.cos(j + 2 * Math.PI / 3)),
    pz = Math.cos(i * 2 * Math.PI / 3) / 
    Math.abs(Math.sqrt(2) * Math.cos(j - 2 * Math.PI / 3));
    arr.push(px * c.width * 0.18);
    arr.push(py * c.width * 0.18);
    arr.push(pz * c.width * 0.18);
}

}

var rnd = function(min, max) {
return Math.random() * (max - min) + min;
}

var draw = function() {
var g_ = $.createLinearGradient(c.width + c.width,
    c.height + c.height * 1.5,
    c.width + c.width, 1);
    g_.addColorStop(0, 'hsla(253, 5%, 95%, 1)');
    g_.addColorStop(0.5, 'hsla(314, 95%, 25%, 1)');
    g_.addColorStop(0.8, 'hsla(259, 95%, 15%, 1)');
    g_.addColorStop(1, 'hsla(0, 0%, 5%, 1)');
    $.clearRect(0, 0, c.width, c.height);
    $.fillStyle = g_;
    $.fillRect(0, 0, c.width, c.height);

var a = arr.length;
    rotX += 0.02;
    rotY += 0.02;
    u -= .2;

for (var i = 0; i < a; i += 3) {
  pt(arr[i], arr[i + 1], arr[i + 2]);
  $.globalCompositeOperation = 'lighter';
  $.fillStyle = 'hsla(' + u * i / 100 + ',85%,70%,.8)';
  //performance boost w fillRect() instead of arc()
  $.fillRect(currX, currY, rnd(1, 5), rnd(1, 5));
  $.fill();
}
}

//animate && resize
window.requestAnimFrame = (function() {
return window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
  window.setTimeout(callback, 1000 / 60);
};
})();

var run = function() {
window.requestAnimFrame(run);
draw();
}
run();

window.addEventListener('resize', function() {
c.width = window.innerWidth;
c.height = window.innerHeight;
}, false);
}

var xoxx = function(){
  var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time
var time = 0.0;

//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

//Base values modified with depth later
float intensity = 1.0;
float radius = 0.05;

//Distance functions from 
//https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
float triangleDist(vec2 p){ 
	const float k = sqrt(3.0);
  p.x = abs(p.x) - 1.0;
  p.y = p.y + 1.0/k;
  if( p.x+k*p.y>0.0 ) p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
  p.x -= clamp( p.x, -2.0, 0.0 );
  return -length(p)*sign(p.y);
}

float boxDist(vec2 p){
  vec2 d = abs(p)-1.0;
  return length(max(d,vec2(0))) + min(max(d.x,d.y),0.0);
}

float circleDist( vec2 p){
  return length(p) - 1.0;
}

//https://www.shadertoy.com/view/3s3GDn
float getGlow(float dist, float radius, float intensity){
  return pow(radius/dist, intensity);
}

void main(){
    
	vec2 uv = gl_FragCoord.xy/resolution.xy;
  float widthHeightRatio = resolution.x/resolution.y;
  vec2 centre;
  vec2 pos;
	
  float t = time * 0.05;
    
  float dist;
  float glow;
  vec3 col = vec3(0);
    
  //The spacing between shapes
  float scale = 500.0;
  //Number of shapes
  const int layers = 15;
    
  float depth;
  vec2 bend;
    
  vec3 purple = vec3(0.611, 0.129, 0.909);
  vec3 green = vec3(0.133, 0.62, 0.698);
    
  float angle;
  float rotationAngle;
  mat2 rotation;
    
  //For movement of the anchor point in time
  float d = 2.5*(sin(t) + sin(3.0*t));

  //Create an out of frame anchor point where all shapes converge to    
  vec2 anchor = vec2(0.5 + cos(d), 0.5 + sin(d));
    
  //Create light purple glow at the anchor loaction
  pos = anchor - uv;
  pos.y /= widthHeightRatio;
  dist = length(pos);
  glow = getGlow(dist, 0.25, 3.5);
  col += glow * vec3(0.6,0.4,1.0);
    
	for(int i = 0; i < layers; i++){
        
  	//Time varying depth information depending on layer
    depth = fract(float(i)/float(layers) + t);

    //Move the focus of the camera in a circle
    centre = vec2(0.5 + 0.2 * sin(t), 0.5 + 0.2 * cos(t));
        
   	//Position shapes between the anchor and the camera focus based on depth
   	bend = mix(anchor, centre, depth);
     	
    pos = bend - uv;
   	pos.y /= widthHeightRatio;

    //Rotate shapes
    rotationAngle = 3.14 * sin(depth + fract(t) * 6.28) + float(i);
    rotation = mat2(cos(rotationAngle), -sin(rotationAngle), 
                    sin(rotationAngle),  cos(rotationAngle));
        
    pos *= rotation;
        
    //Position shapes according to depth
    pos *= mix(scale, 0.0, depth);
    	
    float m = mod(float(i), 3.0);
    if(m == 0.0){
    	dist = abs(boxDist(pos));
    }else if(m == 1.0){
      dist = abs(triangleDist(pos));
    }else{
    	dist = abs(circleDist(pos));
    }
       
    //Get glow from base radius and intensity modified by depth
    glow = getGlow(dist, radius+(1.0-depth)*2.0, intensity + depth);
        
    //Find angle along shape and map from [-PI; PI] to [0; 1]
    angle = (atan(pos.y, pos.x)+3.14)/6.28;
    //Shift angle depending on layer and map to [1...0...1]
		angle = abs((2.0*fract(angle + float(i)/float(layers))) - 1.0);
        
    //White core
   	//col += 10.0*vec3(smoothstep(0.03, 0.02, dist));
        
    //Glow according to angle value
    col += glow * mix(green, purple, angle);
	}
    
  //Tone mapping
  col = 1.0 - exp(-col);

  //Gamma
  col = pow(col, vec3(0.4545));
    
  //Output to screen
  gl_FragColor = vec4(col,1.0);
}
`;

//************** Utility functions **************

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}


//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
  	throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0, 	// top left
  -1.0, -1.0, 	// bottom left
   1.0,  1.0, 	// top right
   1.0, -1.0, 	// bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 				// position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false, 		// don't normalize values
  2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
  0 				// how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

var lastFrame = Date.now();
var thisFrame;

function draw(){
	
  //Update time
	thisFrame = Date.now();
	time += (thisFrame - lastFrame)/1000;	
	lastFrame = thisFrame;

	//Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();
}

var infinte = function(){
  var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time
var time = 0.0;

//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

#define POINT_COUNT 8

vec2 points[POINT_COUNT];
const float speed = -0.7;
const float len = 0.25;
float intensity = 1.2;
float radius = 0.015;

//https://www.shadertoy.com/view/MlKcDD
//Signed distance to a quadratic bezier
float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C){    
	vec2 a = B - A;
	vec2 b = A - 2.0*B + C;
	vec2 c = a * 2.0;
	vec2 d = A - pos;

	float kk = 1.0 / dot(b,b);
	float kx = kk * dot(a,b);
	float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
	float kz = kk * dot(d,a);      

	float res = 0.0;

	float p = ky - kx*kx;
	float p3 = p*p*p;
	float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
	float h = q*q + 4.0*p3;

	if(h >= 0.0){ 
		h = sqrt(h);
		vec2 x = (vec2(h, -h) - q) / 2.0;
		vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
		float t = uv.x + uv.y - kx;
		t = clamp( t, 0.0, 1.0 );

		// 1 root
		vec2 qos = d + (c + b*t)*t;
		res = length(qos);
	}else{
		float z = sqrt(-p);
		float v = acos( q/(p*z*2.0) ) / 3.0;
		float m = cos(v);
		float n = sin(v)*1.732050808;
		vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
		t = clamp( t, 0.0, 1.0 );

		// 3 roots
		vec2 qos = d + (c + b*t.x)*t.x;
		float dis = dot(qos,qos);
        
		res = dis;

		qos = d + (c + b*t.y)*t.y;
		dis = dot(qos,qos);
		res = min(res,dis);
		
		qos = d + (c + b*t.z)*t.z;
		dis = dot(qos,qos);
		res = min(res,dis);

		res = sqrt( res );
	}
    
	return res;
}

//http://mathworld.wolfram.com/Lemniscate.html
vec2 getLemniscatePosition(float t){
	//Set the width of the lemniscate to depend on the location parameter, leading to a skewed path
	float a = (1.0 + 0.5 + 0.5 * sin(t)) * 15.0;

	return vec2((a * cos(t)) / (1.0 + (sin(t) * sin(t))), (a * sin(t) * cos(t))/ (1.0 + (sin(t) * sin(t))));
}

//https://www.shadertoy.com/view/3s3GDn
float getGlow(float dist, float radius, float intensity){
	return pow(radius/dist, intensity);
}

float getSegment(float t, vec2 pos, float offset, float scale){
	for(int i = 0; i < POINT_COUNT; i++){
		points[i] = getLemniscatePosition(offset + float(i)*len + fract(speed * t) * 6.28);
	}
    
	vec2 c = (points[0] + points[1]) / 2.0;
	vec2 c_prev;
	float dist = 10000.0;
    
	for(int i = 0; i < POINT_COUNT-1; i++){
		//https://tinyurl.com/y2htbwkm
		c_prev = c;
		c = (points[i] + points[i+1]) / 2.0;
		dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));
	}
	return max(0.0, dist);
}

void main(){
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	float widthHeightRatio = resolution.x/resolution.y;
	vec2 centre = vec2(0.5, 0.5);
	vec2 pos = centre - uv;
	pos.y /= widthHeightRatio;
	float scale = 0.000015 * height;
	
	float t = time;
    
	//Get first segment
	float dist = getSegment(t, pos, 0.0, scale);
	float glow = getGlow(dist, radius, intensity);
    
	vec3 col = vec3(0.0);
    
	//White core
    col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
    //Purple glow
    col += glow * vec3(0.8, 0.2, 1.0);
    
    //Get second segment
    dist = getSegment(t, pos, 3.7, scale);
    glow = getGlow(dist, radius, intensity);
    
    //White core
    col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
    //Blue glow
    col += glow * vec3(0.15, 0.35, 1.0);
        
	//Tone mapping
	col = 1.0 - exp(-col);

	//Gamma
  col = pow(col, vec3(0.4545));

	//Output to screen
 	gl_FragColor = vec4(col,1.0);
}
`;

//************** Utility functions **************

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}


//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
  	throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0, 	// top left
  -1.0, -1.0, 	// bottom left
   1.0,  1.0, 	// top right
   1.0, -1.0, 	// bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 				// position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false, 		// don't normalize values
  2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
  0 				// how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

var lastFrame = Date.now();
var thisFrame;

function draw(){
	
  //Update time
	thisFrame = Date.now();
  time += (thisFrame - lastFrame)/1000;	
	lastFrame = thisFrame;

	//Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();
}


var partical = function(){
  // 粒子特效
var ParticleEffect = {
  ctx: null,
  canvas: null,
  particles: [],
  mouseCoordinates: {
      x: 0,
      y: 0
  },
  config: {
      count: 100, // 默认创建粒子数量
      radius: 5, // 默认粒子半径
      vxRange: [-1, 1], // 默认粒子横向移动速度范围
      vyRange: [-1, 1], // 默认粒子纵向移动速度范围
      scaleRange: [.5, 1], // 默认粒子缩放比例范围
      lineLenThreshold: 125, // 默认连线长度阈值
      color: 'rgba(255,255,255,.2)' // 默认粒子、线条的颜色
  },
  init: function(newConfig) {

      var _this = this;
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');

      // 只有在浏览器支持canvas的情况下才有效
      if (this.ctx) {

          Utils.updateWindowSize();
          var windowSize = Utils.getWindowSize();

          // 设置canvas宽高
          this.canvas.width = windowSize.width;
          this.canvas.height = windowSize.height;

          // 更新config配置
          newConfig && Object.keys(newConfig).forEach(function(key) {
              _this.config[key] = newConfig[key];
          });

          // 生成粒子
          var times = this.config.count;
          this.particles = [];
          while (times--) {
              this.particles.push(new Particle({
                  x: Utils.rangeRandom(this.config.radius, windowSize.width - this.config.radius),
                  y: Utils.rangeRandom(this.config.radius, windowSize.height - this.config.radius),
                  vx: Utils.rangeRandom(this.config.vxRange[0], this.config.vxRange[1]),
                  vy: Utils.rangeRandom(this.config.vyRange[0], this.config.vyRange[1]),
                  color: this.config.color,
                  scale: Utils.rangeRandom(this.config.scaleRange[0], this.config.scaleRange[1]),
                  radius: this.config.radius
              }));
          }

          // 监听鼠标的mouseMove事件，记录下鼠标的x,y坐标
          window.addEventListener('mousemove', this.handleMouseMove.bind(this), false);

          // 监听窗口大小改变事件
          window.addEventListener('resize', this.handleWindowResize.bind(this), false);

          // 兼容requestAnimationFrame
          this.supportRequestAnimationFrame();
      }
  },
  move: function() {

      var windowSize = Utils.getWindowSize();

      this.particles.forEach(function(item) {

          // 更新粒子坐标
          item.x += item.vx;
          item.y += item.vy;

          // 如果粒子碰到了左墙壁或右墙壁，则改变粒子的横向运动方向
          if ((item.x - item.radius < 0) || (item.x + item.radius > windowSize.width)) {
              item.vx *= -1;
          }

          // 如果粒子碰到了上墙壁或下墙壁，则改变粒子的纵向运动方向
          if ((item.y - item.radius < 0) || (item.y + item.radius > windowSize.height)) {
              item.vy *= -1;
          }
      });
  },
  draw: function() {

      var _this = this;
      var lineLenThreshold = this.config.lineLenThreshold;
      var windowSize = Utils.getWindowSize();

      // 每次重新绘制之前，需要先清空画布，把上一次的内容清空
      this.ctx.clearRect(0, 0, windowSize.width, windowSize.height);

      // 绘制粒子
      this.particles.forEach(function(item) {
          item.draw(_this.ctx);
      });

      // 绘制粒子之间的连线
      for (var i = 0; i < this.particles.length; i++) {
          for (var j = i + 1; j < this.particles.length; j++) {
              var distance = Math.sqrt(Math.pow(this.particles[i].x - this.particles[j].x, 2) + Math.pow(this.particles[i].y - this.particles[j].y, 2));
              if (distance < lineLenThreshold) {
                  // 这里我们让距离远的线透明度淡一点，距离近的线透明度深一点
                  this.ctx.strokeStyle = this.translateColors(this.config.color, (1 - distance / lineLenThreshold));
                  this.ctx.beginPath();
                  this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                  this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                  this.ctx.closePath();
                  this.ctx.stroke();
              }
          }
      }

      // 绘制粒子和鼠标之间的连线
      for (i = 0; i < this.particles.length; i++) {
          distance = Math.sqrt(Math.pow(this.particles[i].x - this.mouseCoordinates.x, 2) + Math.pow(this.particles[i].y - this.mouseCoordinates.y, 2));
          if (distance < lineLenThreshold) {
              this.ctx.strokeStyle = this.translateColors(this.config.color, (1 - distance / lineLenThreshold));
              this.ctx.beginPath();
              this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
              this.ctx.lineTo(this.mouseCoordinates.x, this.mouseCoordinates.y);
              this.ctx.closePath();
              this.ctx.stroke();
          }
      }

      // 粒子移动，更新相应的x, y坐标
      this.move();

      // 循环调用draw方法
      window.requestAnimationFrame(this.draw.bind(this));
  },
  handleMouseMove: function(event) {

      var x, y;
      event = event || window.event;

      if (event.pageX || event.pageY) {
          x = event.pageX;
          y = event.pageY;
      } else {
          x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      this.mouseCoordinates = {
          x: x,
          y: y
      };
  },
  handleWindowResize: function() {
      Utils.updateWindowSize();
      var windowSize = Utils.getWindowSize();
      this.canvas.width = windowSize.width;
      this.canvas.height = windowSize.height;
  },
  translateColors: function(colorStr, ratio) {

      var r, g, b, a = 1,
          colorValues;

      if (colorStr[0] === '#') { // 传的是#RRGGBB形式
          r = parseInt(colorStr.slice(1, 3), 16);
          g = parseInt(colorStr.slice(3, 5), 16);
          b = parseInt(colorStr.slice(5, 7), 16);
      } else if (colorStr.startsWith('rgb(')) { // 传的是rgb(r,g,b)形式
          colorStr = colorStr.slice(4, colorStr.length - 1);
          colorValues = colorStr.split(',');
          r = parseInt(colorValues[0].trim());
          g = parseInt(colorValues[1].trim());
          b = parseInt(colorValues[2].trim());
      } else if (colorStr.startsWith('rgba(')) { // 传的是rgba(r,g,b,a)形式
          colorStr = colorStr.slice(5, colorStr.length - 1);
          colorValues = colorStr.split(',');
          r = parseInt(colorValues[0].trim());
          g = parseInt(colorValues[1].trim());
          b = parseInt(colorValues[2].trim());
          a = parseFloat(colorValues[3].trim());
      }

      return 'rgba(' + r + ',' + g + ',' + b + ',' + a * ratio + ')';
  },
  supportRequestAnimationFrame: function() {
      if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = (
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function(callback) {
                  setInterval(callback, 1000 / 60)
              }
          );
      }
  },
  run: function(config) {
      this.init(config);
      window.requestAnimationFrame(this.draw.bind(this));
  }
};

/**
* Particle 粒子类
*/
function Particle(attr) {

  // 粒子属性
  this.x = attr.x; // 粒子在画布中的横坐标
  this.y = attr.y; // 粒子在画布中的纵坐标
  this.vx = attr.vx; // 粒子的横向运动速度
  this.vy = attr.vy; // 粒子的纵向运动速度
  this.color = attr.color; // 粒子的颜色
  this.scale = attr.scale; // 粒子的缩放比例
  this.radius = attr.radius; // 粒子的半径大小

  // 绘制方法
  if (typeof Particle.prototype.draw === 'undefined') {
      Particle.prototype.draw = function(ctx) {
          // canvas画圆方法
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.strokeStyle = this.color;
          ctx.arc(this.x, this.y, this.radius * this.scale, 0, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fill();
      }
  }
}

// 工具
var Utils = {
  _windowSize: {
      width: 0,
      height: 0
  },
  getWindowSize: function() {
      return this._windowSize;
  },
  updateWindowSize: function() {
      this._windowSize.width = this.getWindowWidth();
      this._windowSize.height = this.getWindowHeight();
  },
  getWindowWidth: function() {
      return window.innerWidth || document.documentElement.clientWidth;
  },
  getWindowHeight: function() {
      return window.innerHeight || document.documentElement.clientHeight;
  },
  rangeRandom: function(min, max) {
      const diff = max - min;
      return min + Math.random() * diff;
  }
};

ParticleEffect.run({
  count: 50
});

  

}