var config = {
	apiKey: "AIzaSyC0YrC-DGKO56czWh-cSv3orXg50o6UpYg",
	authDomain: "taller-firebase-1b5ea.firebaseapp.com",
	databaseURL: "https://taller-firebase-1b5ea.firebaseio.com",
	projectId: "taller-firebase-1b5ea",
	storageBucket: "taller-firebase-1b5ea.appspot.com",
	messagingSenderId: "1029951671616"
};
firebase.initializeApp(config);

var objDb = {
	usuarios: []
};

// Get a reference to the database service
//Nos permite interactuar con la base de datos como tal
var database = firebase.database();


var formulario = document.getElementById("crear-usuario");
formulario.addEventListener("submit", function(e){
	e.preventDefault();
	var nombre = document.getElementById("name").value;
	var correo = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	objDb.usuarios.push({
		name: nombre,
		email: correo,
		password: password
	});
	

	guardarDatos(objDb);
});


function guardarDatos(usuarios) {
	// Para guardar en base de dato usar el metodo .set()

	database.ref("/").set(usuarios);
}

function mostrarUsuarios(usuarios) {
	document.getElementById("usuarios").innerHTML = "";
	usuarios.forEach(function(usuario){
		var div = document.createElement("div");
		var h3 = document.createElement("h3");
		var p = document.createElement("p");
		
		h3.textContent = usuario.name;
		p.innerHTML = "<strong>Email:</strong> " + usuario.email;
		
		div.appendChild(h3);
		div.appendChild(p);
		
		document.getElementById("usuarios").appendChild(div);
	});
}

//Leer datos: Usar el metodo .on('value')
database.ref("/usuarios").on("value", function(snapshot){
	var usuarios = snapshot.val();
	objDb.usuarios = usuarios;
	mostrarUsuarios(usuarios);
});

