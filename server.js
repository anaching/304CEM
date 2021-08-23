var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
		if (action === "/register") {
			console.log("Register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if( action ==="/newpage")
		{
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			return res.end("<h1>welcome to new page</h1><p><a href=\"/alexpage\">register</a></p>");
		}
		
		else if (action === "/login"){
			console.log("Login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return res.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/index"){
			console.log("Index");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/VIP"){
			console.log("Member_page");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"Email" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}

		else
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "VIP.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
						}
					});
				}
		}
		else if (action === "/readfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("favlist").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			});
		});
	}
}

else if (req.url === "/getapi")
			{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
	sendFileContent(res, "outputapi.html", "text/html");
}

else if (action === "/findapi"){
console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
}

else if (action === "/editfavlist21"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"about":"hi"};
									var newvalues = { $set: {"about" : splitFavlist[1]}};
									dbo.collection("index").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}


else if (action === "/addfavcar")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"trainer1.jpg","Category":"Strength","TrainerName":"BretD.Bowers"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																															
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"trainer2.jpg","Category":"Muscle","TrainerName":"HectorT.Daigl"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer2.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																	
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"trainer3.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer3.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer4.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer4.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer5.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer5.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer6.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"traine6.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar7")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer7.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer7.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar8")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer8.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer8.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar9")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer9.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer9.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	

		else if (action === "/addfavcar10")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"trainer10.jpg","Category":"Power","TrainerName":"PaulD.Newman"}];
								dbo.collection("MyTrainer").countDocuments({"Email" : splitName[1], "image":"trainer10.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("MyTrainer").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
else if (action === "/clearfavT")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1]};

								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						} 
		
						});
					});
				});
			} 
		
		}	
else if (action === "/removefavT")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer1.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/removefavT2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer2.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/removefavT3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer3.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}		
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer4.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}	
	
else if (action === "/removefavT5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer5.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer6.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT7")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer7.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT8")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer8.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT9")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer9.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/removefavT10")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"trainer10.jpg"};
								{
								
										dbo.collection("MyTrainer").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("Trainer deleted");
											db.close();
										});
									

						}
						});
					});
				});
			} 
		
		}

else if (action === "/editfavlist"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "TrainerName":"BretD.Bowers"};
									var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
									dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		} 
		

else if (action === "/editfavlist2"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "TrainerName":"HectorT.Daigl"};
									var newvalues = { $set: { "TrainerName" : splitFavlist[1]}};
									dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		} 
		

else if (action === "/editfavlist3"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
									var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
									dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist4"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
									var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
									dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}

		else if (action === "/editfavlist5"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);	
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 													
			
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
		else if (action === "/editfavlist6"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);														
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
		else if (action === "/editfavlist7"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);														
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
		else if (action === "/editfavlist8"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);														
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
		else if (action === "/editfavlist9"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);														
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res) 
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
		else if (action === "/editfavlist10"){
			var usernameData = '';
					if (req.method === "POST") {
						console.log("action = post");
						favlistData = '';
						fav = '';
						return req.on('data', function(data) {
							favlistData += data;
							console.log("favlist data="+ favlistData);
							return req.on('end', function() {
								var favlist;
								favlist = qs.parse(favlistData);
								fav = JSON.stringify(favlist);
								console.log("fav"+fav);
								stringFav = JSON.parse(fav);
								var splitFav = favlistData.split("&");
								console.log("splitFav="+splitFav);
								var tempSplitName = splitFav[1];
		
								var tempSplitFavlist = splitFav[2];
								
								var splitName = tempSplitName.split("=");
								var splitFavlist = tempSplitFavlist.split("=");
								console.log("mess="+fav);
								
								//console.log("split=" + msg[1]);
									MongoClient.connect(dbUrl, function(err, db) {
									var finalcount;
									if (err) throw err;
									var dbo = db.db("database");
									console.log(favlist);														
											var myquery = {"Email" : splitName[1], "TrainerName":"PaulD.Newman"};
											var newvalues = { $set: {"Email" : splitName[1], "TrainerName" : splitFavlist[1]}};
											dbo.collection("MyTrainer").updateMany(myquery, newvalues, function(err, res)  
											{
											if (err) throw err;
											//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
											//{
											console.log("1 document updated");
											db.close();
										});
											
									
									
									
								});
							});
						});
					}
					
				}
				
				
		
		else if (action === "/findfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("MyTrainer").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
					});
				});
			}
		}
			
						
		else if (action === "/removefavourlist")
		{
			if (req.method === "POST") {
				console.log("action = post");
				delfavData = '';
				delfav = '';
				return req.on('data', function(data) {
					delfavData += data;
					console.log("delfavlist data="+ delfavData);
					return req.on('end', function() {
						var delfavlist;
						delfavlist = qs.parse(delfavData);
						delfav = JSON.stringify(delfavlist);
						console.log("delfav"+delfav);
						stringdelfav = JSON.parse(delfav);
						var splitdelfav = delfavData.split("&");
						console.log("splitdelfav="+splitdelfav);
						var tempSplitName = splitdelfav[1];

						var tempSplitDelfavlist = splitdelfav[2];
						
						var splitName = tempSplitName.split("=");
						var splitDelfavlist = tempSplitDelfavlist.split("=");
						console.log(splitName[1]);
						console.log(splitDelfavlist[1]);
				MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("database");
				dbo.collection("favlist").remove({"Email" : splitName[1], "favlist" : splitDelfavlist[1]}, function(err, obj)
                {
    				if (err) throw err;
    				console.log("1 document deleted");
    				db.close();
					return res.end("OK");
					});
                
              });
            });
          });
		}
	}	
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "loginindex.html", "text/html");
				}
				else
				{
					sendFileContent(res, "finalindex.html", "text/html");
				}
			}
		
			else if (req.url === "/Signuppage")
			{
				sendFileContent(res, "signuppage.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "loginpage.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}
			else if (req.url === "/hklawprivacy")
			{
				sendFileContent(res, "text_hklawprivacy.html", "text/html");
			}
      else if (req.url === "/protectdata")
			{
				sendFileContent(res, "text_protectdata.html", "text/html");
			}	
	  else if (req.url === "/myfavourlist")
			{
				sendFileContent(res, "myfavourlist.html", "text/html");
			}
	else if (req.url === "/edit1")
			{
				sendFileContent(res, "edit1.html", "text/html");
			}
      else if (req.url === "/socialnetwork")
			{
				sendFileContent(res, "text_socialnetwork.html", "text/html");
			}
      else if (req.url === "/favlistpage")
			{
				sendFileContent(res, "favouritelistpage.html", "text/html");
			}else if (req.url === "/abuse")
			{
				sendFileContent(res, "article4.html", "text/html");
			}else if (req.url === "/manage")
			{
				sendFileContent(res, "article3.html", "text/html");
			}else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}else if (req.url === "/food")
			{
				sendFileContent(res, "article1.html", "text/html");
			}
else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}	  
			
			
else if (req.url === "/passdata")
			{
			
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
                   
					return req.on('data', function(data) {
						formData += data;
						console.log("form data="+ formData);
						
						var obj=JSON.parse(formData);
						
			
						
						return req.on('end', function() {
							/////////////////////
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"image":"trainer1.jpg","Category":"Strength","TrainerName":"BretD.Bowers"},
								{"image":"trainer2.jpg","Category":"Muscle","TrainerName":"HectorT.Daigl"},
								{"image":"trainer3.jpg","Category":"Power","TrainerName":"PaulD.Newman"},
								{"about":"hi"}
					   ];

						dbo.collection("index").count({"image":"trainer1.jpg"}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									db.close();
								}
								else
								{
								
										dbo.collection("index").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});  
			} 
		} 
	
			
			else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		 }
	});

	server.listen(2323);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);