'use strict';

class ESDJob
{
		constructor(){

			this.googleBtn = document.querySelector('#sign-in');
			this.snack = document.querySelector("#demo-snackbar-example");






			
			console.log(this.snack);
			this._checkSetup();
			this._initFirebase();
			this._setupEvents();
		}

		_initFirebase(){
			this.auth	= firebase.auth();
			this.db		= firebase.firestore();

			const settings = {timestampsInSnapshots : true};
			this.db.settings(settings);

			this.storage = firebase.storage();
			//intiates firebase aauth and listen to auth state changes
			this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

			var data = {
				message: 'server connected!',
				timeout: 5000
			};
			console.log(this.snack.MaterialSnackbar);
			this.snack.MaterialSnackbar.showSnackbar(data);
		}

		_setupEvents(){
			this.googleBtn.addEventListener('click',this.signInWithGoogle.bind(this));
		}

		signInWithGoogle(){
			//SIg, in Firebase using popup auth and google as identity provider
			var provider = new firebase.auth.GoogleAuthProvider();
			this.auth.signInWithPopup(provider);
		}

		onAuthStateChanged(user)
		{
			console.log('user:',user);
			if (user) 
			{
				console.log("connecté");
			} else {
				console.log("déconnecté");
			}
		}

	
	_checkSetup(){
		if (!window.firebase || !(firebase.app instanceof Function)|| !firebase.app().options){
			//window.alert('ta grosse mère firebase');
			console.log(firebase);
		}
	}


}


window.onload = function(){
		window.ESDJob =  new ESDJob();
	};


