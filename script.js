const formEl = document.querySelector("form");
const outputEl = document.querySelector(".output");
const inputEl = document.querySelector("#input");
const switchEl = document.querySelector(".switch");
const title = document.querySelector(".title");
const copy = document.querySelector(".copy");

formEl.addEventListener("submit", (e)=>{
	e.preventDefault();
	const inputValue = e.target.input.value;
	const inputType = e.target.input.getAttribute("data-type");
	convert(inputType, inputValue);
});

switchEl.addEventListener("click", (e)=>{
	const type = e.target.getAttribute("data-type");
	inputEl.value = "";
	outputEl.innerText = "";
	if (type === "binary"){
		e.target.setAttribute("data-type", "text");
		inputEl.setAttribute("data-type", "text");
		inputEl.setAttribute("placeholder", "Input Plain Text...");
		outputEl.innerText = "Binary Output...";
		title.innerText = "Text to Binary";
	}
	else if (type === "text"){
		e.target.setAttribute("data-type", "binary");
		inputEl.setAttribute("data-type", "binary");
		inputEl.setAttribute("placeholder", "Input Binary Code...");
		outputEl.innerText = "Text Output...";
		title.innerText = "Binary to Text";
	}
});

function convert(type, inputValue){
	let output = "";
	if (type === "binary"){
		output = binaryToText(inputValue);
	}
	else if (type === "text"){
		output = textToBinary(inputValue);
	}
	outputEl.innerText = output;
}

function binaryToText(input){
	let output = "";
	output = input
		.split(" ")
		.map((number) => parseInt(number, 2))
		.map((number) => String.fromCharCode(number))
		.join("");
	return output;
}

function textToBinary(input){
	let output = "";
	output = input
		.split("")
		.map((letter) => letter.charCodeAt())
		.map((letter) => letter.toString(2))
		.join(" ");
	return output;
}

copy.addEventListener("click", (e)=>{
	copyOutput();
});

function copyOutput(){
	const textarea = document.createElement("textarea");
	textarea.setAttribute("readonly", "");
	textarea.style.position = "absolute";
	textarea.style.top = "0";
	textarea.value = outputEl.innerText;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
}
