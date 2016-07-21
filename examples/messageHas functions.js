function messageHas(input, message) {
	if (
		   (message.indexOf(" " + input + " ") > -1)
		|| (message.indexOf(" " + input + ",") > -1)
		|| (message.indexOf(" " + input + ".") > -1)
		|| (inputAtFront(input, message))
		|| (inputAtBack(input, message))
		|| (inputIsMessage(input, message))
	){
		return true;
	 } else {
		 return false;
	 }
}

function inputAtFront(input, message){
	var messageLength = message.length;
	var inputLength = input.length;
	var isTrue = 0;
	
	for (i = 0; i < inputLength; i++) {
		if 	   (message[i] == input[i] 
			&& (message[inputLength] == " " 
			||  message[inputLength] == "," 
			||  message[inputLength] == "." 
			||  message[input.length] == "")){
			isTrue++;
		} else {
			return false;
		}
	}
	if (isTrue < inputLength){
		return false;
	} else if (isTrue == inputLength){
		return true;
	}
}

function inputAtBack(input, message){
	var messageLength = message.length;
	var inputLength = input.length;
	var isTrue = 0;
	
	for (i = 0; i < inputLength; i++) {
		if 	   (message[(messageLength - inputLength) -1] == " " 
			&&  message[(messageLength - inputLength) + i] == input[i]){
			isTrue++;
		} else {
			return false;
		}
	}
	if (isTrue < inputLength){
		return false;
	} else if (isTrue == inputLength){
		return true;
	}
}

function inputIsMessage(input, message) {
	if (input === message) {
		return true;
	} else {
		return false;
	}
}