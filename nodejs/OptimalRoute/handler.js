exports.handler = function(context, event) {
    var imgurl = event.body.toString(); // event.body is a Buffer
    context.logger.info('image url provided: ' + imgurl);
	var API_KEY = 'f81b2a01a7654476a233b3499fdcd578';
	var input = {    
     "inputs": [      
       {        
          "data": {          
             "image": {            
                "url": imgurl               }    
          }      
       }    
     ]  
		var url = 'https://api.clarifai.com/v2/models/BestRoute/outputs';
  return axios.post(url, input, {
    'headers': {
      'Authorization': 'Key ' + API_KEY,
		'Content-Type': 'application/json'
    }
  }).then(function(r) {
   var tags = [];
  if (resp.status.code === 10000) {
    var results = resp.outputs;
    tags = results[0].data.concepts;
	 //tagCloud(results[0].result.tag.classes);
  } else {
    console.logger.info('Sorry, something is wrong.');
  }
	  
	 if (tags[1].value > 0.08){
		 context.callback("Well Optimized Transit System Detected");
	 }else{
		 context.callback("Poorly Optimized Transit System Detected");
	 }
  }, function(err) {
    console.logger.info('Sorry, something is wrong: ' + err);
  });
    //context.callback(body.split('').reverse().join(''));
};